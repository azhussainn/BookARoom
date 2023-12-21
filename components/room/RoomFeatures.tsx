import { type IRoom } from "@/backend/models/rooms";
import { type FC } from "react";


type RoomFeaturesProps = {
    room: IRoom
}

const RoomFeatures: FC<RoomFeaturesProps> = ({ room }) => {
    return (
        <div className="features mt-5">
            <h3 className="mb-4">Features:</h3>
            <div className="room-feature">
                <i className="fa fa-cog fa-fw fa-users" aria-hidden></i>
                <p>{Number(room?.guestCapacity)}</p>
            </div>
            <div className="room-feature">
                <i className="fa fa-cog fa-fw fa-bed" aria-hidden></i>
                <p>{Number(room?.totalBeds)} Beds</p>
            </div>
            <div className="room-feature">
                <i
                    className={room.isBreakfastAvailable ? "fa fa-check text-success" :
                        "fa fa-times text-danger"}
                    aria-hidden
                ></i>
                <p>Breakfast</p>
            </div>
            <div className="room-feature">
                <i
                    className={room.internet ? "fa fa-check text-success" :
                        "fa fa-times text-danger"}
                    aria-hidden></i>
                <p>Internet</p>
            </div>
            <div className="room-feature">
                <i
                    className={room.isAirConditioned ? "fa fa-check text-success" :
                        "fa fa-times text-danger"}
                    aria-hidden></i>
                <p>Air Conditioned</p>
            </div>
            <div className="room-feature">
                <i
                    className={room.arePetsAllowed ? "fa fa-check text-success" :
                        "fa fa-times text-danger"}
                    aria-hidden></i>
                <p>Pets Allowed</p>
            </div>
            <div className="room-feature">
                <i
                    className={room.hasRoomCleaning ? "fa fa-check text-success" :
                        "fa fa-times text-danger"}
                    aria-hidden></i>
                <p>Room Cleaning</p>
            </div>
        </div>
    )
}

export default RoomFeatures