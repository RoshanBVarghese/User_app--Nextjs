"use client";
import { useState, useEffect } from 'react'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
    const [auth, setAuth] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userCookie = Cookies.get('user');
        userCookie ? setAuth(true) : setAuth(false);
    }, []);

    const logOut = () => {
        Cookies.remove("user");
        setAuth(false);
        router.push('/');
    };

    return (
        <nav className='navbar navbar-expand-lg bg-info'>
            <div className='container-fluid'>
                <div className='navbar-collapse'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <a className='nav-link' href='/'>
                                <b>HOME</b>
                            </a>
                        </li>
                        {!auth && (
                            <li className='nav-item'>
                                <a className='nav-link' href='/register'>
                                    <b>REGISTER</b>
                                </a>
                            </li>
                        )}
                        {!auth && (
                            <li className='nav-item'>
                                <a className='nav-link' href='/login'>
                                    <b>LOGIN</b>
                                </a>
                            </li>
                        )}
                        <li className='nav-item'>
                            <a className='nav-link' href='/Dashboard'>
                                <b>DASHBOARD</b>
                            </a>
                        </li>
                        {auth && (
                            <li className='nav-item'>
                                <a className='nav-link' onClick={logOut} style={{ cursor: 'pointer' }}>
                                    <b>LOGOUT</b>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
