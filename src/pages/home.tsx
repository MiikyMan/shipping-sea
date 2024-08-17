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
            <div className="page-container max-md:hidden">
                <Categories/>
                <Products/>
            </div>
            <div className="bg-white/75 rounded-3xl px-5 mt-1 py-1 md:hidden max-md:pb-10">
                <div className="">
                    <Categories/>
                </div>
                <Products/>
            </div>
            <Footer/>
        </>
    )
}

export default home