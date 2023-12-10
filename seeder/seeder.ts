import mongoose from "mongoose";
import Room from "../backend/models/rooms";
import { rooms } from "./data"

const seedRooms = async() => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookit-v1")
    await Room.deleteMany();
    console.log("All rooms deleted");
    await Room.insertMany(rooms);
    process.exit(); 
  } catch (error) {
    console.log(error)
    process.exit();
  }
}

seedRooms();