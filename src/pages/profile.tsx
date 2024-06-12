import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { Breadcrumb, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Footer from "../components/footer";
import Rank from "../components/assets/crown-god.svg";
import Next from "../components/assets/next.svg";
import ProfileIcon from "../components/assets/profile.svg";
import PurchasesIcon from "../components/assets/purchases.svg";
import HeartIcon from "../components/assets/favourite.svg";
import VouchersIcon from "../components/assets/voucher.svg";
import ClockIcon from "../components/assets/clock.svg";
import LogoutIcon from "../components/assets/logout.svg";
import UserIcon from "../components/assets/user.svg";
import ProductDetails from "../components/productDetails";
import { doSignOut } from '../firebase/auth';
import { useAuth } from '../context/authContext';

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

  const { userLoggedIn, displayName, photoURL } = useAuth();

  const [sidenavState, setSidenavState] = useState<number>(1);
  const navigate = useNavigate();

  const handleClick = (index: number) => {
    setSidenavState(index);
  };

  const handleSignOut = async () => {
    try {
      await doSignOut();
      navigate('/signin');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

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
            <div className="profile-bar-avatar">
              {photoURL ? (
                <img src={photoURL} alt={displayName} className="profile-user-photo" />
              ) : (
                <img src={UserIcon} alt="User" className="profile-user-photo-empty" />
              )}
            </div>
            <div className="profile-bar-details">
              <div className="profile-bar-details-name">
                {displayName ? (
                  <div>{displayName}</div>
                ) : (
                  <div>Username</div>
                )}
              </div>
              <div className="profile-bar-rank">
                <div>
                  God tier member
                </div>
                <img src={Next} alt="next" className="next" />
              </div>
            </div>
          </div>
          <div className="profile-bar-right">
            <img src={Rank} alt="Rank" className="Rank" />
          </div>
        </div>
        <div className="profile-detail">
          <div className="profile-sidenav">
            <li onClick={() => handleClick(1)} className={sidenavState === 1 ? `active` : ``}>
              <img src={ProfileIcon} className="sidenav-icon" alt="Profile Icon" />
              <div className="sidenav-content">
                <div className="sidenav-detail">Profile detail</div>
              </div>
            </li>
            <li onClick={() => handleClick(2)} className={sidenavState === 2 ? `active` : ``}>
              <img src={PurchasesIcon} className="sidenav-icon" alt="Purchases Icon" />
              <div className="sidenav-content">
                <div className="sidenav-detail">Purchases</div>
              </div>
            </li>
            <li onClick={() => handleClick(3)} className={sidenavState === 3 ? `active` : ``}>
              <img src={HeartIcon} className="sidenav-icon" alt="Heart Icon" />
              <div className="sidenav-content">
                <div className="sidenav-detail">Favourites</div>
              </div>
            </li>
            <li onClick={() => handleClick(4)} className={sidenavState === 4 ? `active` : ``}>
              <img src={VouchersIcon} className="sidenav-icon" alt="Vouchers Icon" />
              <div className="sidenav-content">
                <div className="sidenav-detail">Vouchers</div>
              </div>
            </li>
            <li onClick={() => handleClick(5)} className={sidenavState === 5 ? `active` : ``}>
              <img src={ClockIcon} className="sidenav-icon" alt="Clock Icon" />
              <div className="sidenav-content">
                <div className="sidenav-detail">History</div>
              </div>
            </li>
            <li onClick={handleSignOut} className={sidenavState === 6 ? `active` : ``}>
              <img src={LogoutIcon} className="sidenav-icon" alt="Logout Icon" />
              <div className="sidenav-content">
                <div className="sidenav-detail">Logout</div>
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
