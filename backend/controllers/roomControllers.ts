import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "../models/rooms";
import { catchAsyncError } from "@/middlewares/catchAsyncErros";
import Errorhandler from "../utils/errorHandler";
import ApiFilters from "../utils/apiFilters";


//get all rooms ==> /api/rooms/
export const allRooms = catchAsyncError(async (req: NextRequest) => {
  const resPerPage: number = 4;
  // const rooms = await Room.find();

  const { searchParams } = new URL(req.url);
  const queryStr: any = {};

  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });

  let apiFilters = new ApiFilters(Room, queryStr).search().filter();
  let rooms: IRoom[] = await apiFilters.query;
  const filteredRoomCount: number = rooms.length;

  //for pagination we need to clone the query
  rooms = await apiFilters.query.clone();
  apiFilters = apiFilters.pagination(resPerPage);

  return NextResponse.json({
    success: true,
    filteredRoomCount,
    resPerPage,
    rooms
  });
});

//create a room ==> /api/admin/rooms/ POST
export const newRoom = catchAsyncError(async (req: NextRequest) => {
  const body = await req.json();
  const room = await Room.create(body);
  return NextResponse.json({
    success: true,
    room
  });
});

//Get room details ==> /api/rooms/:id
export const getRoomDetails = catchAsyncError(async (req: NextRequest,
  { params }: { params: { id: string } }) => {
  if (!mongoose.isValidObjectId(params.id)) {
    throw new Errorhandler("Invalid Room ID", 400);
  }
  const room = await Room.findById(params.id);
  if (!room) {
    throw new Errorhandler("Room not found", 404);
  }
  return NextResponse.json({
    success: true,
    room
  });
});

//update room details ==> /api/admin/rooms/:id
export const updateRoomDetails = catchAsyncError(async (req: NextRequest,
  { params }: { params: { id: string } }) => {
  if (!mongoose.isValidObjectId(params.id)) {
    throw new Errorhandler("Invalid Room ID", 400);
  }
  let room = await Room.findById(params.id);
  const body = await req.json();
  if (!room) {
    throw new Errorhandler("Room not found", 404);
  }

  room = await Room.findByIdAndUpdate(params.id, body, {
    new: true
  });
  
  return NextResponse.json({
    success: true,
    room
  });
});


//delete room ==> /api/rooms/:id
export const deleteRoom = catchAsyncError(async (req: NextRequest,
  { params }: { params: { id: string } }) => {
  if (!mongoose.isValidObjectId(params.id)) {
    throw new Errorhandler("Invalid Room ID", 400);
  }
  let room = await Room.findById(params.id);
  if (!room) {
    throw new Errorhandler("Room not found", 404);
  }

  // Todo: delete all images linked to the current room
  await room.deleteOne();
  
  return NextResponse.json({
    success: true,
    room
  });
});
