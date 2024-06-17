import Navbar from "../components/navbar"
import Products from "../components/products"
import Footer from "../components/footer"
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function category(){
    let query = useQuery();
    let categoryName = query.get("name");
    console.log(categoryName);
    return(
        <>
            <Navbar/>
            <div className="page-container">
                <Products categoryName={categoryName}/>
            </div>
            <Footer/>
        </>
    )
}

export default category