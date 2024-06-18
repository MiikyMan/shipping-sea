import Navbar from "../components/navbar"
import Products from "../components/products"
import { Breadcrumb } from 'antd';
import HeartIcon from "../components/assets/heart.svg"
import RedHeartIcon from "../components/assets/redheart.svg"
import Iphone from "../components/mockuppics/iphone.png"
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ProductDetails from "../components/productDetails";
import { Rating } from "@mui/material";
import Share from "../components/share";
import Button from '@mui/material/Button';
import Footer from "../components/footer"
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUser, baseURL } from '../components/userIDConfig';

interface productType {
    productPicUrl: string;
    name: string;
    fullPrice: number;
    price: number;
    productID: string;
    rating: number;
    stock: number;
    sales: number;
    tags: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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
    const [product, setProduct] = useState<ProductType[]>([]);
    let query = useQuery();
    let URLproductID = query.get("productID");
    console.log("pID",URLproductID)

    useEffect(() => {
        const fetchProductData = async () => {
          try {
            const response = await axios.get(`${baseURL}/products/${URLproductID}`);
            setProduct(response.data)
          } catch (error) {
            console.error("Error fetching cart data: ", error);
          }
        };
    
        if (URLproductID) {
            fetchProductData();
            window.scrollTo(0, 0);
        }
    }, [URLproductID]);

    console.log("hah",product[0]?.productPicUrl);
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
                            href: '/home',
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
                            <img src={product[0]?.productPicUrl}/>
                        </div>
                        <div className="sub-pic">
                            <img src={product[0]?.productPicUrl}/>
                            <img src={product[0]?.productPicUrl}/>
                        </div>
                    </div>
                    <div className="product-container-right">
                        <div className="product-share">
                            {/* <img src={ShareIcon}/> */}
                            <Share/>
                        </div>
                        <div className="product-page-row1">
                            <div className="product-page-name">{product[0]?.name}</div>
                            <div className="product-page-id">Product Code: {product[0]?.productID}</div>
                        </div>
                        <div className="product-page-row2">
                            <div className="product-page-price">${product[0]?.price}</div>
                            <Rating className="rating-star" name="half-rating-read" defaultValue={parseInt(product[0]?.rating)} precision={0.5} readOnly/>
 
                            {/* can't fix :( */}
                            <div className="rating">{product[0]?.rating}</div>
                        </div>
                        <div className="product-page-row3">
                            <div className="product-page-option">{product[0]?.stock}</div>
                        </div>
                        <div className="product-page-row4">
                            <div className="product-page-qty"></div>
                        </div>
                        <div className="product-page-row5">
                        <Button className="product-page-cart" variant="contained" sx={{ 
                            borderRadius: 3,
                            height:60,
                            fontSize:20,
                            fontWeight: 'bold',
                            bgcolor:'#5AB2FF',
                            ':hover': {
                                bgcolor: '#4798CC',
                                color: 'white',
                            },
                        }}
                        >
                        Add to cart
                        </Button>
                        <Button className="product-page-buy" variant="contained" sx={{ 
                            borderRadius: 3,
                            height:60,
                            fontSize:20,
                            fontWeight: 'bold',
                            bgcolor:'#0f8fff',
                            ':hover': {
                                bgcolor: '#0e65b1',
                                color: 'white',
                            },
                        }}
                        >
                        Buy now
                        </Button>
                            <div className="product-page-like">
                                <button className="product-page-like-btn" onClick={(e) => { e.stopPropagation();}}>
                                    <img src={product[0]?.like === 1 ? RedHeartIcon : HeartIcon} alt="Heart Icon" />
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
            <Footer/>
        </>
    )
}

export default product