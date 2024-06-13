import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import FilterIcon from "./assets/filter.svg";
import HeartIcon from "./assets/heart.svg";
import RedHeartIcon from "./assets/redheart.svg";
import { Button, Dropdown, Menu } from 'antd';
import Rating from '@mui/material/Rating';
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
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await doFetchAllProducts();
        setProducts(fetchedProducts);
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
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        like: updatedProducts[index].like === 1 ? 0 : 1
      };
      return updatedProducts;
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
                <img src={product.productPicUrl} alt={product.name} />
                <div className="product-desc">
                  <div className="product-desc-top">
                    <div className="product-name">{formatProductName(product.name)}</div>
                    <div className="product-rating">
                      <Rating name="size-small" defaultValue={1} size="small" max={1} readOnly />
                      {product.rating}
                    </div>
                  </div>
                  <div className="product-desc-bottom">
                    <div className="product-qty">{product.stock}</div>
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
