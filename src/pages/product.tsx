import Navbar from "../components/navbar"
import Products from "../components/products"
import { Breadcrumb } from 'antd';
import HeartIcon from "../components/assets/heart.svg"
import Iphone from "../components/mockuppics/iphone.png"
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ProductDetails from "../components/productDetails";
import { Rating } from "@mui/material";
import Share from "../components/share";

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Product details',
      children: <ProductDetails />,
    },
    {
      key: '2',
      label: 'Rating and Reviews',
      children: '',
    },
];

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
                        {
                            title: 'iPhone16 Pro Max',
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
                        <div className="product-share">
                            {/* <img src={ShareIcon}/> */}
                            <Share/>
                        </div>
                        <div className="product-page-row1">
                            <div className="product-page-name">iPhone 16 Pro Max</div>
                            <div className="product-page-id">product code: ad342312ouuuo334</div>
                        </div>
                        <div className="product-page-row2">
                            <div className="product-page-price">$699.99</div>
                            <Rating className="rating" name="half-rating" defaultValue={4.5} precision={0.5} />
                        </div>
                        <div className="product-page-row3">
                            <div className="product-page-option">Hello</div>
                        </div>
                        <div className="product-page-row4">
                            <div className="product-page-qty"></div>
                        </div>
                        <div className="product-page-row5">
                            <button className="product-page-cart">Add to cart</button>
                            <button className="product-page-buy">Buy now</button>
                            <div className="product-page-like">
                                <button className="product-page-like-btn" onClick={(e) => { e.stopPropagation(); toggleLike(i); }}>
                                    <img src={product.like === 1 ? RedHeartIcon : HeartIcon} alt="Heart Icon" />
                                </button>
                                1.2M
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-page-detail-container">
                    <Tabs 
                        defaultActiveKey="1" 
                        items={items} 
                        onChange={onChange} 
                    />
                </div>
                <Products/>
            </div>
        </>
    )
}

export default product