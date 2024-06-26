import React, { useState, useEffect } from "react";
import "./styles/styles.css";
import SearchIcon from "./assets/search.svg";
import CartIcon from "./assets/cart.svg";
import Logo from "./mockuppics/ShippingSeaLogo.png";
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useAuth } from '../context/authContext';
import { SupervisedUserCircleRounded } from "@mui/icons-material";
import { baseUser, baseURL } from './userIDConfig';
import { motion } from "framer-motion"
import { Badge } from 'antd';


async function getData() {
    const res = await fetch(`${baseURL}/users/${baseUser}`);
    return res.json();
  }
  
  interface usersType {
    userID: string,
    name: string,
    email: string,
    role: string,
    profilePicUrl: string,
    rank: number,
    total_productID: number,
  }

function Navbar() {

    const { userLoggedIn, displayName, photoURL } = useAuth();

    const [data, setData] = useState<usersType | null>(null);
    useEffect(() => {
        const fetchData = async () => {
          const result = await getData();
          if (result && result.length > 0) {
            setData(result[0]);
          }
        };
        fetchData();
      }, [data]);

    return (
        <div className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-left">
                <Link to="/home">
                    <div className="navbar-logo">
                        <img src={Logo}/>
                    </div>
                </Link>
                </div>
                <div className="navbar-right">
                    {/* <Search
                        placeholder="input search text"
                        onSearch={onSearch}
                        style={{ width: 200 }}
                    /> */}
                    <form className="navbar-search">
                        <input
                            type="text"
                            placeholder="Search"
                            className="navbar-search-input"
                        />
                        <button className="navbar-search-btn">
                            <img src={SearchIcon} className="navbar-search-svg" alt="Search" />
                        </button>
                    </form>
                    <button className="navbar-cart">
                        <Link to="/shoppingcart" className="navbar-cart-icon">
                                <img src={CartIcon} className="navbar-cart-svg" alt="Cart" />
                                <Badge count={data?.total_productID} overflowCount={99} offset={[10, 0]} className="cart-badge" />
                        </Link>
                    </button>
                    <div className="example-container">
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} />
                        </div>
                        { userLoggedIn ?
                        <>
                            <Link to="/profile" >
                            <button className="navbar-login-user">
                                    <img src={ data?.profilePicUrl || photoURL } alt={data?.name} className="navbar-user-photo"/>
                            </button>
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/signin" >
                                <Button className="navbar-login" variant="contained" sx={{ 
                                    borderRadius: 3,
                                    fontSize:16,
                                    fontWeight: 'bold',
                                    bgcolor:'#5AB2FF',
                                    ':hover': {
                                        bgcolor: '#4798CC',
                                        color: 'white',
                                        },
                                    }
                                }
                                >
                                Login
                                </Button>
                            </Link>
                        </>
                        }
                    
                </div>
            </div>
        </div>
    );
}

export default Navbar;
