"use client"

import { type IImage } from "@/backend/models/rooms"
import { type FC } from "react"
import { Carousel } from "react-bootstrap"
import Image from "next/image"

type RoomImageSliderProps = {
    images: IImage[]
}

const RoomImageSlider: FC<RoomImageSliderProps> = ({ images }) => {
    return (
        <Carousel>
            {images.length > 0 ? images.map(image => (
                <Carousel.Item key={`${image?.public_id}`}>
                    <div style={{ width: '100%', height: 460 }}>
                        <Image
                            src={`${image.url}`} alt={`${image.url}`}
                            className="d-block m-auto"
                            fill
                        />
                    </div>
                </Carousel.Item>
            ))

                :
                <Carousel.Item >
                    <div style={{ width: '100%', height: 460 }}>
                        <Image
                            src={"/images/default_room_image.jpg"}
                            alt={"Default Room"}
                            className="d-block m-auto"
                            fill
                        />
                    </div>
                </Carousel.Item>
            }
        </Carousel>
    )

}

export default RoomImageSlider