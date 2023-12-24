"use client";

import { useLazyUpdateSessionQuery, 
    useUpdateProfileMutation } from "@/redux/api/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/slices/userSlice";
import { type ChangeEventHandler, useState, type FormEvent, useEffect } from "react"
import toast from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";
import { IUser } from "@/backend/models/user";

type NewSessionProps = {
    expires: string;
    user: IUser
} | undefined;


const UpdateProfile = () => {
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });
    const [updateProfile, 
        { isLoading, error, isSuccess }] = useUpdateProfileMutation();

    const [ updateSession, { data}  ] = useLazyUpdateSessionQuery();
    const typedData = data as NewSessionProps;

    const { name, email } = formData;

    const { user } = useAppSelector((state) => state.auth);
    const router = useRouter()

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData(prevData => ({
            ...prevData, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isLoading) return;
        updateProfile(formData);
    }

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email
            })
        }
    }, [user])

    useEffect(() => {
        let customError = Object(error);
        if(error && customError && 'data' in customError){
            toast.error(customError?.data?.message || "Something went wrong");
        }
        if(isSuccess){
            updateSession(false)
            router.refresh();
            toast.success("Profile updated!")
        }
    }, [ isSuccess, error ])

    useEffect(() => {
        if(typedData){
            dispatch(setUser(typedData?.user))
        }
    }, [ typedData ])

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-8">
                <form
                    className="shadow rounded bg-body"
                    onSubmit={handleSubmit}
                >
                    <h2 className="mb-4">Update Profile</h2>

                    <div className="mb-3">
                        <label htmlFor="name_field" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name_field"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email_field" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    <button disabled={isLoading} type="submit" className="btn form-btn w-100 py-2">
                        { isLoading ? <ButtonLoader /> : "UPDATE" }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile