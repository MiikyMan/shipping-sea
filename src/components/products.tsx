import { useState } from "react";
import { Link } from 'react-router-dom';
import FilterIcon from "./assets/filter.svg";
import HeartIcon from "./assets/heart.svg";
import Iphone from "./mockuppics/iphone.webp";
import Camera from "./mockuppics/camera.webp";
import Console from "./mockuppics/console.webp";
import Router from "./mockuppics/router.png";
import Mornitor from "./mockuppics/monitor.webp";
import Printer from "./mockuppics/external-hard-drive.jfif";
import Externalharddrive from "./mockuppics/external-hard-drive.webp";
import Wirelessspeaker from "./mockuppics/wireless-speaker.webp";
import Fitnesstracker from "./mockuppics/fitness-tracker.webp";
import RedHeartIcon from "./assets/redheart.svg";
import Tablet from "./mockuppics/tablet.webp";
import Laptop from "./mockuppics/laptop.webp";
import Headphones from "./mockuppics/headphones.webp";
import Smartwatch from "./mockuppics/smartwatch.jfif";
import type { MenuProps } from 'antd';
import { Button, Dropdown, Menu } from 'antd';
import Rating from '@mui/material/Rating';

interface Props {
  name: string;
  rating: number;
  qty: number;
  price: number;
  like: number;
}

const initProducts = [
  { name: "Smartphone", rating: 4.3, qty: 150, price: 799, like: 0, pic: Iphone },
  { name: "Laptop", rating: 4.6, qty: 80, price: 1299, like: 0, pic: Laptop },
  { name: "Headphones", rating: 4.2, qty: 200, price: 199, like: 0, pic: Headphones },
  { name: "Smartwatch", rating: 4.4, qty: 120, price: 299, like: 0, pic: Smartwatch },
  { name: "Tablet", rating: 4.5, qty: 100, price: 499, like: 0, pic: Tablet },
  { name: "Camera", rating: 4.7, qty: 50, price: 899, like: 0, pic: Camera },
  { name: "Gaming Console", rating: 4.8, qty: 30, price: 399, like: 0, pic: Console },
  { name: "Fitness Tracker", rating: 4.1, qty: 180, price: 149, like: 0, pic: Fitnesstracker },
  { name: "Wireless Speaker", rating: 4.0, qty: 120, price: 99, like: 0, pic: Wirelessspeaker },
  { name: "External Hard Drive", rating: 4.6, qty: 90, price: 129, like: 0, pic: Externalharddrive },
  { name: "Printer", rating: 4.3, qty: 70, price: 199, like: 0, pic: Printer },
  { name: "Monitor", rating: 4.5, qty: 60, price: 299, like: 0, pic: Mornitor },
  { name: "Router", rating: 4.4, qty: 100, price: 79, like: 0, pic: Router }
];

function Products(props: Props) {
  const [products, setProducts] = useState(initProducts);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const formatProductName = (name: string) => {
    return name.length > 12 ? name.slice(0, 11) + "..." : name;
  };

  const toggleLike = (index: number) => {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        like: updatedProducts[index].like === 1 ? 0 : 1
      };
      return updatedProducts;
    });
  };

  const handleMenuClick = (e: any) => {
    const key = e.key;
    let sortedProducts = [...products];
    if (key === '2') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (key === '3') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Recent</Menu.Item>
      <Menu.Item key="2">Price: Ascending</Menu.Item>
      <Menu.Item key="3">Price: Descending</Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="products-container">
        <div className="products-title-bar">
          <div className="products-title">Suggestion</div>
          <div className="products-filter">
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button>
                Filter
                <img src={FilterIcon} alt="Filter Icon" />
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className="all-products">
          {products.map((product, i) => (
            <div
              className="product"
              key={i}
              onMouseEnter={() => setHoveredProduct(i)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Link to="/product" className="product">
                <img src={product.pic} alt={product.name} />
                <div className="product-desc">
                  <div className="product-desc-top">
                    <div className="product-name">{formatProductName(product.name)}</div>
                    <div className="product-rating">
                      <Rating name="size-small" defaultValue={1} size="small" max={1} readOnly/>
                      {product.rating}
                    </div>
                  </div>
                  <div className="product-desc-bottom">
                    <div className="product-qty">{product.qty}</div>
                    <div className="product-price">${product.price}</div>
                  </div>
                </div>
              </Link>
              {hoveredProduct === i && (
                <button className="product-heart" onClick={(e) => { e.stopPropagation(); toggleLike(i); }}>
                  <img src={product.like === 1 ? RedHeartIcon : HeartIcon} alt="Heart Icon" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
