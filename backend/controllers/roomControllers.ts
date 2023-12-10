import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Room from "../models/rooms";

//get all rooms ==> /api/rooms/
export const allRooms = async (req: NextRequest) => {
  const resPerPage = 8;
  const rooms = await Room.find();
  return NextResponse.json({
    success: true,
    resPerPage,
    rooms
  });
};

//create a room ==> /api/admin/rooms/ POST
export const newRoom = async (req: NextRequest) => {
  const body = await req.json();
  const room = await Room.create(body);
  return NextResponse.json({
    success: true,
    room
  });
}

//Get room details ==> /api/rooms/:id
export const getRoomDetails = async (req: NextRequest,
  { params }: { params: { id: string } }) => {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ message: "Invalid Room ID" }, { status: 400 });
  }
  const room = await Room.findById(params.id);
  if (!room) {
    return NextResponse.json({
      message: "Room not found"
    }, { status: 404 });
  }
  return NextResponse.json({
    success: true,
    room
  });
}

//update room details ==> /api/admin/rooms/:id
export const updateRoomDetails = async (req: NextRequest,
  { params }: { params: { id: string } }) => {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ message: "Invalid Room ID" }, { status: 400 });
  }
  let room = await Room.findById(params.id);
  const body = await req.json();
  if (!room) {
    return NextResponse.json({
      message: "Room not found"
    }, { status: 404 });
  }

  room = await Room.findByIdAndUpdate(params.id, body, {
    new: true
  });
  
  return NextResponse.json({
    success: true,
    room
  });
}


//delete room ==> /api/rooms/:id
export const deleteRoom = async (req: NextRequest,
  { params }: { params: { id: string } }) => {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ message: "Invalid Room ID" }, { status: 400 });
  }
  let room = await Room.findById(params.id);
  if (!room) {
    return NextResponse.json({
      message: "Room not found"
    }, { status: 404 });
  }

  // Todo: delete all images linked to the current room
  await room.deleteOne();
  
  return NextResponse.json({
    success: true,
    room
  });
}
