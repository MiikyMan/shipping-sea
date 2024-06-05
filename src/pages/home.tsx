import Ads from "../components/ads"
import Categories from "../components/categories"
import Navbar from "../components/navbar"
import Products from "../components/products"
import Footer from "../components/footer"

function home(){
    return(
        <>
            <Navbar/>
            <div className="page-container">
                <Ads/>
                <Categories/>
                <Products/>
            </div>
            <Footer/>
        </>
    )
}

export default home