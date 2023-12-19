import { type FC } from "react";
import RoomItem from "./room/RoomItem";
import { type IRoom } from "@/backend/models/rooms";
import CustomPagination from "./layout/CustomPagination";
import Link from "next/link";


export type HomeProps = {
    data: {
        success: boolean;
        filteredRoomCount: number;
        resPerPage: number;
        rooms: IRoom[];
    }
}

const Home: FC<HomeProps> = ({ data }) => {
    const { success, filteredRoomCount, resPerPage, rooms } = data;
    return (
        <div>
            <section id="rooms" className="container mt-5">
                <h2 className="mb-3 ml-2 stays-heading">All Rooms</h2>
                <Link href="/search" className="ml-2 back-to-search">
                    <i className="fa fa-arrow-left"></i> Back to Search
                </Link>
                <div className="row mt-4">
                    {rooms.length === 0 ?
                        <div className="alert alert-danger mt-5 w-100">
                            <b>No Rooms</b>
                        </div> :
                        rooms?.map(room => (
                            <RoomItem key={room._id} room={room} />
                        ))

                    }
                </div>
            </section>
            <CustomPagination 
                resPerPage={resPerPage} 
                filteredRoomCount={filteredRoomCount}
            />
        </div>
    )
}

export default Home