import "./styles/styles.css";
import SearchIcon from "./assets/search.svg";
import CartIcon from "./assets/cart.svg";
// import { Input } from 'antd';
// import type { SearchProps } from 'antd/es/input/Search';

// const { Search } = Input;

// const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-left">
                    <div className="navbar-logo">
                        Logo img
                    </div>
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
                        <img src={CartIcon} className="navbar-cart-svg" alt="Cart" />
                    </button>
                    <button className="navbar-login">Login</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
