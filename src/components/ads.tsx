import ads1 from "./mockuppics/ads1.png"

function Ads(){
    return(
        <>
            <div className="ads-container">
                <img src={ads1}/>
                <div className="ads-pagination">
                    <button className="page-one"></button>
                    <button className="page-one"></button>
                    <button className="page-one"></button>
                </div>
            </div>
        </>
    )
}

export default Ads