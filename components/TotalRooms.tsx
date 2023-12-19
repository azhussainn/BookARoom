'use client';

import { useSearchParams } from "next/navigation";

type TotalRoomsProps = {
    filteredRoomCount: number;
}

const TotalRooms = ({ filteredRoomCount }: TotalRoomsProps) => {
    const searchParams = useSearchParams();
    const location = searchParams.get('location')
    return (
        <h2 className="mb-3 ml-2 stays-heading">
            {location ? `${filteredRoomCount} ${filteredRoomCount > 1 ? "rooms" : "room"} found in "${location}"` :
                "All Rooms"
            }
        </h2>
    )
}

export default TotalRooms