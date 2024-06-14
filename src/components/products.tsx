import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import FilterIcon from "./assets/filter.svg";
import HeartIcon from "./assets/heart.svg";
import RedHeartIcon from "./assets/redheart.svg";
import { Button, Dropdown, Menu } from 'antd';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import { doFetchAllProducts } from "../firebase/crud";
import type { MenuProps } from 'antd';

interface Props {
  fullPrice: number;
  like: number;
  name: string;
  price: number;
  productPicUrl: string;
  rating: number;
  stock: number;
}

function Products() {
  const [products, setProducts] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await doFetchAllProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const formatProductName = (name: string) => {
    return name.length > 12 ? name.slice(0, 11) + "..." : name;
  };

  const toggleLike = (index: number) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product, i) => 
        i === index ? { ...product, like: product.like === 1 ? 0 : 1 } : product
      );
    });
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const key = e.key;
    let sortedProducts = [...products];
    if (key === '2') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (key === '3') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };

  const calculateDiscountPercentage = (price: number, fullPrice: number) => {
    if (fullPrice <= 0) return 0;
    if (fullPrice - price === 0) return 0;
    return ((fullPrice - price) / fullPrice * 100).toFixed(0);
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
          {loading ? (
            Array.from(new Array(10)).map((_, index) => (
              <div className="product" key={`skeleton-${index}`}>
                <Skeleton animation="wave" variant="rectangular" width={228} height={228} sx={{borderRadius:'16px 16px 0px 0px'}}/>
                <div className="product-desc">
                  <Skeleton animation="wave" variant="text" width="200px" height="30px" />
                  <Skeleton animation="wave" variant="text" width="70px" height="30px" />
                </div>
              </div>
            ))
          ) : (
            products.map((product, i) => (
              <div
                className="product"
                key={i}
                onMouseEnter={() => setHoveredProduct(i)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link to="/product" className="product">
                  <img className="product-img" src={product.productPicUrl} alt={product.name} />
                  {/* <div className="product-discount">{calculateDiscountPercentage(product.price, product.fullPrice)}% off</div> */}
                  {calculateDiscountPercentage(product.price, product.fullPrice) !== 0 && (
                    <div className="product-discount">
                      -{calculateDiscountPercentage(product.price, product.fullPrice)}%
                    </div>
                  )}
                  <div className="product-desc">
                    <div className="product-desc-top">
                      <div className="product-name-container">
                        <span className="product-name">
                          {hoveredProduct === i ? product.name : formatProductName(product.name)}
                        </span>
                      </div>
                      <div className="product-rating">
                        <Rating name="size-small" className="star" defaultValue={1} size="small" max={1} readOnly />
                        <div className="rating">{product.rating}</div>
                      </div>
                    </div>
                    <div className="product-desc-bottom">
                      <div className="prices">
                        <div className="product-price">${product.price}</div>
                        {
                          calculateDiscountPercentage(product.price, product.fullPrice) !== 0 &&
                          <div className="product-fullprice"><del>${product.fullPrice}</del></div>
                        }
                        
                        
                      </div>
                      <div className="product-stock">{product.stock}</div>
                    </div>
                  </div>
                </Link>
                {hoveredProduct === i && (
                  <button className="product-heart" onClick={(e) => { e.preventDefault(); toggleLike(i); }}>
                    <img src={product.like === 1 ? RedHeartIcon : HeartIcon} alt="Heart Icon" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
