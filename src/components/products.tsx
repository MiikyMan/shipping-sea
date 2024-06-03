import { useState } from "react"

interface props{
    name: string
    rating: number
    qty: number
    price: number
}

const initProducts = [
    {name: "Vibrator", rating: 4.5, qty: 100, price: 500},
    {name: "Vibrator", rating: 4.5, qty: 100, price: 600},
    {name: "Vibrator", rating: 4.5, qty: 100, price: 600},
    {name: "Vibrator", rating: 4.5, qty: 100, price: 600},
    {name: "Vibrator", rating: 4.5, qty: 100, price: 600},
    {name: "Vibrator", rating: 4.5, qty: 100, price: 600},
    {name: "Vibrator", rating: 4.5, qty: 100, price: 600},
    {name: "Vibrator", rating: 4.5, qty: 100, price: 600},
    {name: "Vibrator", rating: 4.5, qty: 100, price: 600},
    {name: "Vibrator", rating: 4.5, qty: 100, price: 600},
    {name: "Vibrator", rating: 4.5, qty: 100, price: 600},
    {name: "Vibrator", rating: 4.5, qty: 100, price: 700}
]

function Products(prop: props){
    const [products, setProducts] = useState(initProducts)

    return(
        <>
            <div className="products-container">
                <div className="products-title-bar">
                    <div className="products-title">Suggestion</div>
                    <div className="products-filter">Filter</div>   
                </div>
                <div className="all-products">
                    { 
                        Object.keys(products).map((item, i) => (
                            <div className="product" key={i}>
                                <div className="product-desc">
                                    <div className="product-desc-top">
                                        <div className="product-name">{ products[item].name }</div>
                                        <div className="product-rating">{ products[item].rating }</div>
                                    </div>
                                    <div className="product-desc-bottom">
                                        <div className="product-qty">{ products[item].qty }</div>
                                        <div className="product-price">{ products[item].price }</div>                                                                                                                                           
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

export default Products