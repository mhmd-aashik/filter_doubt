import Filter from '@/components/Filter';
import LocalSearchbar from '@/components/LocalSearchbar';
import Profile from '@/components/Profile';
import {
  bathroomsOptions,
  bedroomsOptions,
  categoryOptions,
  seasonOptions,
} from '@/constant';
import { getHouses } from '@/lib/actions/houses.action';

export default async function Home({ searchParams }: any) {
  // console.log(searchParams);
  const result = await getHouses({
    searchQuery: searchParams.q,
    category: searchParams.category,
    season: searchParams.season,
    bedrooms: searchParams.bedrooms,
    bathrooms: searchParams.bathrooms,
  });

  return (
    <main className="min-h-screen w-full p-24">
      <LocalSearchbar
        route="/"
        iconPosition="left"
        placeholder="Search for questions"
      />

      <div className=" flex justify-center items-center p-1 gap-2 flex-wrap">
        <Filter
          filters={categoryOptions}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          placeHolder="Category"
          keyData="category"
        />

        <Filter
          filters={seasonOptions}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          placeHolder="Season"
          keyData="season"
        />

        <Filter
          filters={bedroomsOptions}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          placeHolder="Bedrooms"
          keyData="bedrooms"
        />

        <Filter
          filters={bathroomsOptions}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          placeHolder="Bathrooms"
          keyData="bathrooms"
        />
      </div>

      <div className="flex flex-wrap max-w-7xl gap-5 mx-auto">
        {result.houses?.length > 0 ? (
          result.houses.map((house) => (
            <Profile
              key={house._id}
              _id={house._id}
              name={house.name}
              image={house.image}
              address={house.address}
              price={house.price}
              description={house.description}
              location={house.location}
              bedrooms={house.bedrooms}
              bathrooms={house.bathrooms}
              available={house.available}
              category={house.category}
              season={house.season}
            />
          ))
        ) : (
          <div>no house</div>
        )}
      </div>
    </main>
  );
}
