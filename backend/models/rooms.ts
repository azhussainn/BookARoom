import mongoose, { Schema, Document } from "mongoose";

export type User = mongoose.Schema.Types.ObjectId;

export interface IReview extends Document {
    user: User,
    rating: number,
    comment: string,
}

export interface Ilocation {
    type: string,
    coordinates: number[],
    formattedAddress: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,

}

export interface IImage extends Document {
    public_id: string,
    url: string,
}

export interface IRoom extends Document {
    name: string,
    description: string,
    pricePerNight: number,
    address: string,
    location: Ilocation,
    guestCapacity: number,
    totalBeds: number,
    internet: Boolean,
    isBreakfastAvailable: Boolean,
    isAirConditioned: Boolean,
    arePetsAllowed: Boolean,
    hasRoomCleaning: Boolean,
    ratings: number,
    numReviews: number,
    images: IImage[],
    category: string,
    reviews: IReview[],
    user: User,
    createdAt: Date,
}


const roomSchema: Schema<IRoom> = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a room name"],
        trim: true,
        maxLength: [200, "Room name cant exceed 200 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter a description name"],
    },
    pricePerNight: {
        type: Number,
        required: [true, "Please enter a room price per night"],
        default: 0.0
    },
    address: {
        type: String,
        required: [true, "Please enter a room address"]
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
        },
        formattedAddress: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    guestCapacity: {
        type: Number,
        required: [true, "Please enter guest capacity"],
    },
    totalBeds: {
        type: Number,
        required: [true, "Please enter total beds in the room"],
    },
    internet: {
        type: Boolean,
        default: false,
    },
    isBreakfastAvailable: {
        type: Boolean,
        default: false,
    },
    isAirConditioned: {
        type: Boolean,
        default: false,
    },
    arePetsAllowed: {
        type: Boolean,
        default: false,
    },
    hasRoomCleaning: {
        type: Boolean,
        default: false,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter the room category"],
        enum: {
            values: ["King", "Single", "Twins"],
            message: "Category not available"
        }
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.models.Room || 
    mongoose.model<IRoom>("Room", roomSchema);