import Ads from "../components/ads/ads"
import Categories from "../components/categories"
import Navbar from "../components/navbar"
import Products from "../components/products"
import Footer from "../components/footer"

function home(){
    return(
        <>
            <Navbar/>
            <Ads/>
            <div className="page-container">
                <Categories/>
                <Products/>
            </div>
            <Footer/>
        </>
    )
}

export default home