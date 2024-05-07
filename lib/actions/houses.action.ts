"use server"

import House from "@/database/houses.model"
import { FilterQuery } from "mongoose"
import { connectToDatabase } from "../mongoose"

interface GetHousesParams {
  page?: number
  pageSize?: number
  searchQuery?: string
  filter?: {
    season?: string
    category?: string
    minBedrooms?: string
    minBathrooms?: string
  }
}

export async function getHouses(params: GetHousesParams) {
  try {
    connectToDatabase()

    const { searchQuery, filter } = params

    const query: FilterQuery<typeof House> = {}

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }]
    }
    if (filter) {
      if (filter.category) {
        query.category = filter.category.toLowerCase()
      }

      if (filter.season) {
        query.season = filter.season.toLowerCase()
      }

      if (filter.minBedrooms) {
        if (filter.minBedrooms.includes("gte")) {
          query.bedrooms = { $gte: filter.minBedrooms.replace("gte", "") }
        } else {
          query.bedrooms = filter.minBedrooms
        }
      }

      if (filter.minBathrooms) {
        if (filter.minBathrooms.includes("gte")) {
          query.bathrooms = { $gte: filter.minBathrooms.replace("gte", "") }
        } else {
          query.bathrooms = filter.minBathrooms
        }
      }
    }

    console.log(query)

    const houses = await House.find(query).exec()

    return { houses }
  } catch (error) {
    console.log(error)
    throw error
  }
}
