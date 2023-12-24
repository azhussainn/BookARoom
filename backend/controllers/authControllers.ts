import { NextRequest, NextResponse } from "next/server";
import User from "../models/user";
import { catchAsyncError } from "@/backend/middlewares/catchAsyncErros";


//for registering a user ==> /api/auth/register
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

//for updating a user profile ==> /api/me/update
export const updateProfile = catchAsyncError(async (req: NextRequest) => {
  const body = await req.json();
  const { name, email } = body;
  const user = await User.findByIdAndUpdate(req.user._id, { name, email });
  return NextResponse.json({
    success: true,
    user
  });
});