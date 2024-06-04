import { useState } from "react"
import FilterIcon from "./assets/filter.svg"
import HeartIcon from "./assets/heart.svg"
import RedHeartIcon from "./assets/redheart.svg"
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

interface props{
    name: string
    rating: number
    qty: number
    price: number
    like: number
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        recent
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        price: Ascending
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        price: Descending
      </a>
    ),
  },
];

const initProducts = [
    { name: "Smartphone", rating: 4.3, qty: 150, price: 799, like: 0 },
    { name: "Laptop", rating: 4.6, qty: 80, price: 1299, like: 0 },
    { name: "Headphones", rating: 4.2, qty: 200, price: 199, like: 0 },
    { name: "Smartwatch", rating: 4.4, qty: 120, price: 299, like: 0 },
    { name: "Tablet", rating: 4.5, qty: 100, price: 499, like: 0 },
    { name: "Camera", rating: 4.7, qty: 50, price: 899, like: 0 },
    { name: "Gaming Console", rating: 4.8, qty: 30, price: 399, like: 0 },
    { name: "Fitness Tracker", rating: 4.1, qty: 180, price: 149, like: 0 },
    { name: "Wireless Speaker", rating: 4.0, qty: 120, price: 99, like: 0 },
    { name: "External Hard Drive", rating: 4.6, qty: 90, price: 129, like: 0 },
    { name: "Printer", rating: 4.3, qty: 70, price: 199, like: 0 },
    { name: "Monitor", rating: 4.5, qty: 60, price: 299, like: 0 },
    { name: "Router", rating: 4.4, qty: 100, price: 79, like: 0 }
];


function Products(prop: props){
    const [products, setProducts] = useState(initProducts)
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

    return(
        <>
            <div className="products-container">
                <div className="products-title-bar">
                    <div className="products-title">Suggestion</div>
                    <div className="products-filter">
                        <Dropdown menu={{ items }} placement="bottomLeft">
                            <Button> 
                                Filter
                                <img src={FilterIcon}/>
                            </Button>
                        </Dropdown>
                    </div>
                </div>
                <div className="all-products">
                    { 
                        products.map((product, i) => (
                            <div className="product" 
                                key={i}
                                onMouseEnter={() => setHoveredProduct(i)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                {hoveredProduct === i && ( 
                                    <button className="product-heart" onClick={() => toggleLike(i)}>
                                        <img src={product.like === 1 ? RedHeartIcon : HeartIcon} alt="Heart Icon"/>
                                    </button>
                                )}
                                <div className="product-desc">
                                    <div className="product-desc-top">
                                        <div className="product-name">{formatProductName(product.name)}</div>
                                        <div className="product-rating">{product.rating}</div>
                                    </div>
                                    <div className="product-desc-bottom">
                                        <div className="product-qty">{product.qty}</div>
                                        <div className="product-price">${product.price}</div>                                                                                                                                           
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>  
            </div>
        </>
    )
}

export default Products;