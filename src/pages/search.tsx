import Navbar from "../components/navbar"
import Products from "../components/products"
import Footer from "../components/footer"
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function search(){
    let query = useQuery();
    let searchName = query.get("name");
    console.log(searchName);
    return(
        <>
            <Navbar/>
            <div className="page-container">
                <Products searchName={searchName}/>
            </div>
            <Footer/>
        </>
    )
}

export default search