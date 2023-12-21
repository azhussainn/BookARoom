"use client";

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

const Header = () => {

    const { data } = useSession();
    const user = data?.user;

    const handleLogout = () => {
        signOut()
    }

    return (
        <nav className="navbar sticky-top py-2">
            <div className="container">
                <div className="col-6 col-lg-3 p-0">
                    <div className="navbar-brand">
                        <a href="/">
                            <img
                                style={{ cursor: "pointer" }}
                                src="/images/bookit_logo.png"
                                alt="BookMe"
                            />
                        </a>
                    </div>
                </div>


                <div className="col-6 col-lg-3 mt-3 mt-md-0 text-end">
                    {
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
                            <Link href="/login" className="btn btn-danger px-4 text-white login-header-btn float-right">
                                Login
                            </Link>
                    }
                </div>
            </div>
        </nav>

    )
}

export default Header