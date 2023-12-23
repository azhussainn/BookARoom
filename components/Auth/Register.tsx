"use client";

import { type ChangeEventHandler, useState, FormEvent, useEffect } from "react";
import { useRegisterMutation } from "@/redux/api/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ButtonLoader from "../layout/ButtonLoader";

const Register = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = formData;

    const [register, 
        { isLoading ,error, isSuccess} 
    ] = useRegisterMutation()
    
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData(prevData => ({
            ...prevData, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isLoading) return;
        register(formData)
    }

    useEffect(() => {
        let customError = Object(error);
        if(error && customError && 'data' in customError){
            toast.error(customError?.data?.message);
        }
        if(isSuccess){
            router.push('/login');
            toast.success("Account Registered, you can login now!")
        }
    }, [ isSuccess, error ])

    return (
        <div className="wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
                    <h2 className="mb-4">Join Us</h2>

                    <div className="mb-3">
                        <label htmlFor="name_field" className="form-label"> Full Name </label>
                        <input
                            type="text"
                            id="name_field"
                            className="form-control"
                            name="name"
                            required
                            disabled={isLoading}
                            value={name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="email_field"> Email </label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            required
                            disabled={isLoading}
                            value={email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="password_field"> Password </label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            name="password"
                            required
                            disabled={isLoading}
                            value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <button disabled={isLoading} type="submit" className="btn form-btn w-100 py-2">
                        { isLoading ? <ButtonLoader /> : "Register" }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register