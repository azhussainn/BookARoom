import RoomDetails from "@/components/Room/RoomDetails";
import Error from "@/app/error";
import type { Metadata, ResolvingMetadata  } from 'next';

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}



const getRoom = async (id: string) => {
    const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`, {
        // next: { tags: ["Rooms"] }
        cache: "no-cache",
    });
    const data = await res.json();
    return data;
}

export async function generateMetadata({ params }: Props,
    parent: ResolvingMetadata
    ): Promise<Metadata> {
    const id = params.id
   
    // fetch data
    const data = await getRoom(id);
    return {
      title: data?.room?.name

    }
}

type RoomDetailsPageProps = {
    params: {
        id: string
    }
}

export default async function RoomDetailsPage({ params: { id }}: RoomDetailsPageProps) {
    const data = await getRoom(id);
    if (data?.message) {
        return <Error error={data} />
    }
    return <RoomDetails data={data} />;
}
