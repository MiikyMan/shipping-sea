import Navbar from "../components/navbar";
import Products from "../components/products";
import { Breadcrumb, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import Avatar from "../components/mockuppics/avatar.png"
import Rank from "../components/mockuppics/rank.png"
import ProfileIcon from "../components/assets/profile.svg"
import PurchasesIcon from "../components/assets/purchases.svg"
import HeartIcon from "../components/assets/favourite.svg"
import VouchersIcon from "../components/assets/voucher.svg"
import ClockIcon from "../components/assets/clock.svg"
import LogoutIcon from "../components/assets/logout.svg"
import ProductDetails from "../components/productDetails";

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  qty: number;
  fullprice: number;
}

const onChange = (key: string) => {
    console.log(key);
};


const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Product details',
      children: <ProductDetails />,
    },
    {
      key: '2',
      label: 'Rating and Reviews',
      children: '',
    },
];

function Profile() {
    const [sidenavState, setSidenavState] = useState<number>(1)
    function handleClick(index:number){
        setSidenavState(index);
    }
  return (
    <>
      <Navbar />
      <div className="title-bar-container">
        <div className="title-bar-content">
          <div className="bread-nav">
            <Breadcrumb
              separator=">"
              items={[
                {
                  title: 'Home',
                  href: '/',
                },
                {
                  title: 'Profile',
                },
              ]}
            />
          </div>
          <div className="page-title-bar">
            <div className="page-title">Profile</div>
          </div>
        </div>
      </div>
      <div className="page-container">
        <div className="profile-bar">
            <div className="profile-bar-left">
                <img src={Avatar}/>
                <div className="profile-bar-details">
                    <div className="profile-bar-details-name">inahee123</div>
                    <div className="profile-bar-rank">God tier member</div>
                </div>
            </div>
            <div className="profile-bar-right">
                <img src={Rank} />
            </div>
        </div>
        <div className="profile-detail">
            <div className="profile-sidenav">
                <li onClick={() => handleClick(1)} className={sidenavState === 1 ? `active`: ``}>
                    <img src={ProfileIcon} className="sidenav-icon"/>
                    <div className="sidenav-content" >
                        <div className="sidenav-detail">
                            Profile detail
                        </div>
                    </div>
                    
                </li>
                <li onClick={() => handleClick(2)} className={sidenavState === 2 ? `active`: ``}>
                    <img src={PurchasesIcon} className="sidenav-icon"/>
                    <div className="sidenav-content">
                        <div className="sidenav-detail">
                            Profile detail
                        </div>
                    </div>
                    
                </li>
                <li onClick={() => handleClick(3)} className={sidenavState === 3 ? `active`: ``}>
                    <img src={HeartIcon} className="sidenav-icon"/>
                    <div className="sidenav-content">
                        <div className="sidenav-detail">
                            Profile detail
                        </div>
                    </div>
                    
                </li>
                <li onClick={() => handleClick(4)} className={sidenavState === 4 ? `active`: ``}>
                    <img src={VouchersIcon} className="sidenav-icon"/>
                    <div className="sidenav-content">
                        <div className="sidenav-detail">
                            Profile detail
                        </div>
                    </div>
                    
                </li>
                <li onClick={() => handleClick(5)} className={sidenavState === 5 ? `active`: ``}>
                    <img src={ClockIcon} className="sidenav-icon"/>
                    <div className="sidenav-content">
                        <div className="sidenav-detail">
                            Profile detail
                        </div>
                    </div>
                    
                </li>
                <li onClick={() => handleClick(6)} className={sidenavState === 6 ? `active`: ``}>
                    <img src={LogoutIcon} className="sidenav-icon"/>
                    <div className="sidenav-content">
                        <div className="sidenav-detail">
                            Profile detail
                        </div>
                    </div>
                    
                </li>
            </div>
            <div className="profile-content">
                <div className="profile-content-navbar">
                    <div className="product-page-detail-container">
                        <Tabs 
                            defaultActiveKey="1" 
                            items={items} 
                            onChange={onChange} 
                        />
                </div>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
