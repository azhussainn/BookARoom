"use client";
import { type FC, } from "react";
import StarRatings from "react-star-ratings";

type StarProps = {
    rating: number;
    totalRating: number;
    starDimensions?: string;
    onChangeRating?: () => void;
}

const Stars: FC<StarProps> = ({ rating, totalRating, starDimensions, onChangeRating }) => {
    return (
        <StarRatings
            rating={rating}
            starRatedColor="#e61e4d"
            changeRating={onChangeRating}
            numberOfStars={totalRating}
            starDimension={starDimensions || "18px"}
            starSpacing="1px"
            name='rating'
        />
    )
}

export default Stars