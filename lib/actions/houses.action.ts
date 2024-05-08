'use server';

import House from '@/database/houses.model';
import { FilterQuery } from 'mongoose';
import { connectToDatabase } from '../mongoose';

interface GetHousesParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  category?: string;
  season?: string;
  bedrooms?: number;
  bathrooms?: number;
}

export async function getHouses(params: GetHousesParams) {
  try {
    connectToDatabase();

    const { searchQuery, category, season, bathrooms, bedrooms } = params;

    const query: FilterQuery<typeof House> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, 'i') } }];
    }
    if (category) query.category = { $regex: new RegExp(category, 'i') };
    if (season) query.season = { $regex: new RegExp(season, 'i') };
    if (bedrooms)
      query.bedrooms = Number(bedrooms) ? Number(bedrooms) : { $gte: 5 };
    if (bathrooms)
      query.bathrooms = Number(bathrooms) ? Number(bathrooms) : { $gte: 5 };

    // console.log(query);

    // let sortOptions = {};

    // switch (filter) {
    //   case :
    //     break;

    //   default:
    //     break;
    // }

    const houses = await House.find(query);
    // console.log(houses[0]);

    return { houses };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
