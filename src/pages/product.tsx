import Ads from "../components/ads"
import Categories from "../components/categories"
import Navbar from "../components/navbar"
import Products from "../components/products"
import { Breadcrumb } from 'antd';
import HeartIcon from "../components/assets/heart.svg"
import Iphone from "../components/mockuppics/iphone.png"

function product(){
    return(
        <>
            <Navbar/>
            <div className="page-container">
                <div className="bread-nav">
                    <Breadcrumb
                        separator=">"
                        items={[
                        {
                            title: 'Home',
                            href: '/',
                        },
                        // {
                        //     title: 'Application Center',
                        //     href: '',
                        // },
                        // {
                        //     title: 'Application List',
                        //     href: '',
                        // },
                        {
                            title: 'An Application',
                        },
                        ]}
                    />
                </div>
                <div className="product-container">
                    <div className="product-container-left">
                        <div className="main-pic">
                            <img src={Iphone}/>
                        </div>
                        <div className="sub-pic">
                            <img src={Iphone}/>
                            <img src={Iphone}/>
                        </div>
                    </div>
                    <div className="product-container-right">
                        <div className="product-page-row1">
                            <div className="product-page-name">Nigga Balls</div>
                            <div className="product-page-id">product code: ad342312ouuuo334</div>
                        </div>
                        <div className="product-page-row2">
                            <div className="product-page-price">$0.69</div>
                            <div className="product-page-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                        <div className="product-page-row3">
                            <div className="product-page-option">Hello</div>
                        </div>
                        <div className="product-page-row4">
                            <div className="product-page-qty"></div>
                        </div>
                        <div className="product-page-row5">
                            <div className="product-page-like">
                                <button className="product-page-like-btn" onClick={(e) => { e.stopPropagation(); toggleLike(i); }}>
                                    <img src={product.like === 1 ? RedHeartIcon : HeartIcon} alt="Heart Icon" />
                                </button>
                                1.2m
                            </div>
                            <button className="product-page-cart">Add to cart</button>
                            <button className="product-page-buy">Buy now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default product