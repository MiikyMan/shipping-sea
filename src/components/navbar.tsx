import React, { useState, useEffect } from "react";
import "./styles/styles.css"; // Corrected CSS import
import SearchIcon from "./assets/search.svg";
import CartIcon from "./assets/cart.svg";
import Hamburger from "./assets/Hamburger.svg";
import Magnify from "./assets/hehe.svg";
import Logo from "./mockuppics/ShippingSeaLogo.png";
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useAuth } from '../context/authContext';
import { motion } from "framer-motion";
import { Badge } from 'antd';
import axios from "axios";
import { baseUser, baseURL } from './userIDConfig';

async function getData() {
    const res = await fetch(`${baseURL}/users/${baseUser}`);
    return res.json();
}

interface usersType {
    userID: string;
    name: string;
    email: string;
    role: string;
    profilePicUrl: string;
    rank: number;
    total_productID: number;
}

function Navbar() {
    const { userLoggedIn, displayName, photoURL } = useAuth();
    const [inputValue, setInputValue] = useState<string>('');
    const [data, setData] = useState<usersType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData();
                if (result) {
                    setData(result[0]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const OnSubmitSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${baseURL}/categories/search/${inputValue}`);
            console.log("response", response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }

    console.log("bro",data?.total_productID);

    return (
        <>
            {/* {window.innerWidth > 375 ? ( */}
            <div className="navbar-container max-md:hidden justify-between max-h-11 md:max-h-20 lg:max-h-32">
                <div className="navbar-content ">
                    <div className="navbar-left">
                        <Link to="/home">
                            <div className="navbar-logo">
                                <img src={Logo} alt="Logo" />
                            </div>
                        </Link>
                    </div>
                    <div className="navbar-right">
                            <form className="navbar-search" onSubmit={OnSubmitSearch}>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="navbar-search-input"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <Link to={`/search?name=${inputValue}`} className="navbar-search-btn">
                                    <IconButton>
                                        <img src={SearchIcon} className="navbar-search-svg" alt="Search" />
                                    </IconButton>
                                </Link>
                            </form>
                        <Link to="/shoppingcart" className="navbar-cart">
                            <IconButton>
                                <img src={CartIcon} className="navbar-cart-svg" alt="Cart" />
                                <Badge count={data?.total_productID} overflowCount={99} offset={[10, 0]} className="cart-badge" />
                            </IconButton>
                        </Link>
                        {userLoggedIn ? (
                            <Link to="/profile">
                                <IconButton className="navbar-login-user">
                                    <img
                                        src={data?.profilePicUrl || photoURL}
                                        alt={data?.name || displayName}
                                        className="navbar-user-photo"
                                    />
                                </IconButton>
                            </Link>
                        ) : (
                            <Link to="/signin">
                                <Button
                                    className="navbar-login"
                                    variant="contained"
                                    sx={{
                                        borderRadius: 3,
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        bgcolor: '#5AB2FF',
                                        ':hover': {
                                            bgcolor: '#4798CC',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {/* ) : ( */}
                <div className="flex md:hidden bg-gradient-to-b from-blue-300/60 to-blue-200/25 h-20 w-full items-center justify-between px-3">
                    <div className=" h-full flex items-center justify-between opacity-60">
                        <img src={Hamburger} className="w-6"/>
                    </div>
                    <Link to="/home" className=" h-full flex items-center justify-between">
                        <img src={Logo} alt="Logo" className="w-32"/>
                    </Link>
                    {/* <div className="navbar-mobile-icons">
                        <Link to="/shoppingcart" className="navbar-cart-mobile">
                            <IconButton>
                                <img src={CartIcon} className="navbar-cart-svg" alt="Cart" />
                                <Badge count={data?.total_productID} overflowCount={99} offset={[10, 0]} className="cart-badge" />
                            </IconButton>
                        </Link>
                        <Link to={userLoggedIn ? "/profile" : "/signin"}>
                            <IconButton className="navbar-login-user-mobile">
                                <img
                                    src={data?.profilePicUrl || photoURL}
                                    alt={data?.name || displayName}
                                    className="navbar-user-photo"
                                />
                            </IconButton>
                        </Link>
                    </div> */}
                    <div>
                        <img src={Magnify} className="w-6 flex items-center justify-between opacity-60" />
                    </div>
                </div>
            {/* )} */}
        
        </>
    );
}

export default Navbar;
