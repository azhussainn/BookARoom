import { NextRequest, NextResponse } from "next/server";
import User from "../models/user";
import { catchAsyncError } from "@/middlewares/catchAsyncErros";


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