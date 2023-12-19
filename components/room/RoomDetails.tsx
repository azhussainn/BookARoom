import dynamic from "next/dynamic";
import { type IRoom } from "@/backend/models/rooms";
import { type FC } from "react";
import RoomImageSlider from "./RoomImageSlider";
import RoomFeatures from "./RoomFeatures";
import BookingDate from "./BookingDate";
import NewReview from "../Review/NewReview";
import ListReviews from "../Review/ListReviews";

const Stars = dynamic(() => import("../Stars"), { ssr: false })

type RoomDetailsProps = {
    data: {
        success: boolean;
        room: IRoom
    }
}

const RoomDetails: FC<RoomDetailsProps> = ({ data }) => {
    const { room } = data;
    return (
        <div className="container container-fluid">

            <h2 className="mt-5">
                {room?.name}
            </h2>

            <p>
                {room?.address}
            </p>

            <div className="ratings mt-auto mb-3">
                <Stars
                    rating={Number(room.ratings)}
                    totalRating={5}
                    starDimensions="22px"
                />
                <span className="no-of-reviews">
                    ({Number(room?.numReviews)} reviews)
                </span>
            </div>

            <RoomImageSlider images={room?.images} />

            <div className="row my-5">
                <div className="col-12 col-md-6 col-lg-8">
                    <h3>Description</h3>
                    <p>
                        {room?.description}
                    </p>

                    <RoomFeatures room={room} />

                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <BookingDate room={room} />
                    {/* TODO:- ROOM MAP */}

                </div>
            </div>

            <NewReview />

            <ListReviews />
        </div>
    )
}

export default RoomDetails