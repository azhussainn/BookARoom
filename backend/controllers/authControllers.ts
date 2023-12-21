import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import User, { IUser } from "../models/user";
import { catchAsyncError } from "@/middlewares/catchAsyncErros";
import Errorhandler from "../utils/errorHandler";
import ApiFilters from "../utils/apiFilters";


//for registering a user 
export const registerUser = catchAsyncError(async (req: NextRequest) => {
    const body = await req.json();
    const { name, email, password } = body;
    const user = await User.create({
        name, email, password
    });
    return NextResponse.json({
      success: true,
      user
    });
});