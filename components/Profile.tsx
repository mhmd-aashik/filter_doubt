import Image from "next/image";
import React from "react";

interface HousesProps {
  _id?: string;
  name: string;
  image: string;
  address: string;
  price: number;
  description: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  available: boolean;
  category: string;
  season: string;
}

const Profile = ({
  name,
  image,
  address,
  price,
  description,
  location,
  bedrooms,
  bathrooms,
  available,
  category,
  season,
}: HousesProps) => {
  
  return (
    <>
      <div className="max-w-[300px] bg-slate-400 relative  border border-gray-200 rounded-lg shadow p-2">
        <Image
          src={image}
          alt={name}
          width={350}
          height={250}
          className="w-[350px] h-[200px] object-cover rounded"
        />
        <div className="absolute top-4 right-5">
          {available && (
            <p className="bg-black text-sm text-white py-1 px-2 rounded-full font-bold ">
              Available
            </p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center mt-2">
          <h1 className="font-bold text-2xl">{name}</h1>
        </div>
        <div className="flex mt-2 px-3 justify-between">
          <p className="text-sm font-bold">* {location}</p>
          <p className="text-sm bg-orange-500 px-1 rounded-full font-bold">
            Rs {price}
          </p>
        </div>

        <div className="flex items-center justify-between mx-2 mt-2">
          <p className="font-bold bg-yellow-700 px-1 rounded-full text-white">Category - {category}</p>
          <p className="font-bold px-1 bg-green-600 rounded-full text-white">Season - {season}</p>
        </div>
        <div className="">
          <p className="text-sm line-clamp-2 p-2 font-bold">* {description}</p>
        </div>
        <div className="">
          <p className="text-sm font-bold p-2">Location - {address}</p>
        </div>
        <div className="px-2 flex justify-between">
          <p className="text-sm font-bold">bedrooms - {bedrooms}</p>
          <p className="text-sm font-bold">bathrooms - {bathrooms}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
