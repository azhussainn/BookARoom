import Home from "@/components/Home";
import Error from "./error";

const getRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();
  const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`, {
    // next: { tags: ["Rooms"] }
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

type HomePageProps = {
  searchParams: string
}


export default async function HomePage({ searchParams }: HomePageProps) {
  const data = await getRooms(searchParams);
  if(data?.message){
    return <Error error={data} />
  }
  return <Home data={data} />;
}
