"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { setUser, setIsAuthenticated } from "@/redux/slices/userSlice";
import { useEffect } from "react";

const Header = () => {

    const dispatch = useAppDispatch();

    const { data } = useSession();
    const { user } = useAppSelector((state) => state.auth)

    const handleLogout = () => {
        signOut()
    }
    
    useEffect(() => {
        if(data){
            dispatch(setUser(data.user));
            dispatch(setIsAuthenticated(Boolean(data.user)))
        }
    }, [ data ])

    return (
        <nav className="navbar sticky-top py-2">
            <div className="container">
                <div className="col-6 col-lg-3 p-0">
                    <div className="navbar-brand">
                        <a href="/">
                            <img
                                style={{ cursor: "pointer", minHeight: 35 }}
                                width={'auto'}
                                height={'100%'}
                                src="/images/bookit_logo.png"
                                alt="BookMe"
                            />
                        </a>
                    </div>
                </div>


                <div className="col-6 col-lg-3 mt-3 mt-md-0 text-end">
                    {
                        data === undefined ? (
                            <div className="placeholder-glow">
                                <figure className="avatar avatar-nv placeholder bg-secondary">
                                </figure>
                                <span className="placeholder w-25 bg-secondary ms-2 rounded"></span>
                            </div>
                        )

                    :
                        user ?
                            <div className="ml-4 dropdown d-line">
                                <button
                                    className="btn dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <figure className="avatar avatar-nav">
                                        <img
                                            src={user.image ? user.image : "/images/default_avatar.jpg"}
                                            alt={user.name ? user.name : "default user"}
                                            className="rounded-circle placeholder-glow"
                                            height="50"
                                            width="50"
                                        />
                                    </figure>
                                    <span className="placeholder-glow ps-1">{user.name}</span>
                                </button>

                                <div
                                    className="dropdown-menu w-100"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <Link href="/admin/dashboard" className="dropdown-item">
                                        Dashboard
                                    </Link>
                                    <Link href="/bookings/me" className="dropdown-item">
                                        My Bookings
                                    </Link>
                                    <Link href="/me/update" className="dropdown-item">
                                        Profile
                                    </Link>
                                    <Link href="/" className="dropdown-item text-danger" 
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Link>
                                </div>

                            </div>
                            :
                            <Link style={{ margin: '6px 0' }}  href="/login" className="btn btn-danger px-4 my-2 text-white login-header-btn float-right">
                                Login
                            </Link>
                    }
                </div>
            </div>
        </nav>

    )
}

export default Header