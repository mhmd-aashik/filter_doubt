"use server";

import House from "@/database/houses.model";
import { connectToDatabase } from "../mongoose";
import { FilterQuery } from "mongoose";

interface GetHousesParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export async function getHouses(params: GetHousesParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof House> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    // let sortOptions = {};

    // switch (filter) {
    //   case :
    //     break;

    //   default:
    //     break;
    // }

    const houses = await House.find(query)

    return { houses };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
