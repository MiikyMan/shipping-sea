import "./styles/styles.css"

function Navbar(){
    return(
        <>
            <div className="navbar-container">
                <div className="navbar-content">
                    <div className="navbar-left">Logo</div>
                    <div className="navbar-right">
                        <div className="navbar-search">search here</div>
                        <div className="navbar-cart">cart</div>
                        <div className="navbar-login">Login</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar