import SearchForm from "@/components/SearchForm";
import { trending_data } from "@/data/trending";

export default function Home() {
  return (
    <main className="bg-[#013B94]">

      <section className='max-w-7xl mx-auto p-6'>
        <h2 className='font-bold text-5xl text-white'>Gooooo Sweeeeee</h2>
        <h3 className='text-white text-xl py-5'>
          Take your flights, hotels, food and much moree....
        </h3>
      </section>

      <section className='m-4 mt-0 -mb-12 px-2 lg:px-4'>
        <SearchForm/>
        
      </section>

      <section className='mx-auto max-w-7xl mt-10 p-6 bg-white rounded-t-lg'>
        <div className="pt-5">
          <h3 className='text-xl font-bold'>
            Trending Destination
          </h3>
          <p className='font-light'>
            Most popular choices for travellers from around the world
          </p>
        </div>

        <div className="flex space-x-4 py-5 overflow-x-scroll">
          {trending_data.map((item)=>(
            <div className="space-y-1 shrink-0 cursor-pointer"
            key={item.id}
            
            >
              <img
              key={item.id}
              className="w-80 h-72 object-cover rounded-lg pb-2"
              src={item.src}
              alt=""
              ></img>

              <p className="font-bold">{item.title}</p>
              <p className="">{item.location}</p>
              <p className="font-light">{item.description}</p>
            </div>
          ))}

        </div>

      </section>
      
    </main>
  )
}

