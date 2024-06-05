import "./styles/styles.css";
import SearchIcon from "./assets/search.svg";
import CartIcon from "./assets/cart.svg";
import Logo from "./mockuppics/logo.png";
import { Link } from 'react-router-dom'
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

function Navbar() {
    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 13,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }));

    return (
        <div className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-left">
                <Link to="/">
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
                        <Link to="/shoppingcart">
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={2} color="error">
                                    <img src={CartIcon} className="navbar-cart-svg" alt="Cart" />
                                </StyledBadge>
                            </IconButton>
                        </Link>
                    </button>
                    <Link to="/signin" >
                        <Button className="navbar-login" variant="contained" sx={{ 
                            borderRadius: 3,
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
                    
                </div>
            </div>
        </div>
    );
}

export default Navbar;
