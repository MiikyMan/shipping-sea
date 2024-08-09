import React, { useState, useEffect } from "react";
import "./styles/styles.css";
import SearchIcon from "./assets/search.svg";
import CartIcon from "./assets/cart.svg";
import Logo from "./mockuppics/ShippingSeaLogo.png";
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useAuth } from '../context/authContext';
import { motion } from "framer-motion";
import { Badge } from 'antd';
import { baseUser, baseURL } from './userIDConfig';
import axios from "axios";

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
    console.log("value", inputValue);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            if (result) {
                setData(result[0]);
            }
        };
        fetchData();
    }, []);

    const OnSubmitSearch = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${baseURL}/categories/search/${inputValue}`);
            console.log("response", response.data);
            
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    }

    return (
        <div className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-left">
                    <Link to="/home">
                        <div className="navbar-logo">
                            <img src={Logo} alt="Logo" />
                        </div>
                    </Link>
                </div>
                <div className="navbar-right">
                    <form
                        className="navbar-search"
                        onSubmit={OnSubmitSearch}
                    >
                        <input
                            type="text"
                            placeholder="Search"
                            className="navbar-search-input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Link to={`/search?name=${inputValue}`} className="navbar-search-btn">
                            <img src={SearchIcon} className="navbar-search-svg" alt="Search" />
                        </Link>
                    </form>
                    <Link to="/shoppingcart" className="navbar-cart">
                        <IconButton>
                            <img src={CartIcon} className="navbar-cart-svg" alt="Cart" />
                            <Badge count={data?.total_productID} overflowCount={99} offset={[10, 0]} className="cart-badge" />
                        </IconButton>
                    </Link>
                    <div className="example-container">
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} />
                    </div>
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
    );
}

export default Navbar;
