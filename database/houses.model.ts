import { model, Schema, models, Document } from "mongoose";

export interface IHouse extends Document {
  _id: string;
  name: string;
  location: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  available: boolean;
  image: string;
  category: string;
  season: string;
}

const HouseSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  description: { type: String, required: true },
  available: { type: Boolean, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  season: { type: String, required: true },
});

const House = models.House || model("House", HouseSchema);

export default House;
