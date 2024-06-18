import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { Breadcrumb, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Footer from "../components/footer";
import Camera from "../components/assets/camera.svg";
import SilverRank from "../components/assets/crown-silver.svg";
import GoldRank from "../components/assets/crown-gold.svg";
import PlatinumRank from "../components/assets/crown-platinum.svg";
import DiamondRank from "../components/assets/crown-diamond.svg";
import GodRank from "../components/assets/crown-god.svg";
import Next from "../components/assets/next.svg";
import ProfileIcon from "../components/assets/profile.svg";
import PurchasesIcon from "../components/assets/purchases.svg";
import HeartIcon from "../components/assets/favourite.svg";
import VouchersIcon from "../components/assets/voucher.svg";
import ClockIcon from "../components/assets/clock.svg";
import LogoutIcon from "../components/assets/logout.svg";
import Edit from "../components/assets/edit.svg";
import UserIcon from "../components/assets/user.svg";
import ProductDetails from "../components/productDetails";
import { doSignOut } from '../firebase/auth';
import { useAuth } from '../context/authContext';
import Amplify, { Storage } from '@aws-amplify/core';
import { baseUser, baseURL } from '../components/userIDConfig';

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

async function getData() {
  const res = await fetch(`${baseURL}/users/${baseUser}`);
  return res.json();
}

interface usersType {
  userID: string,
  name: string,
  email: string,
  role: string,
  profilePicUrl: string,
  rank: number,
}

function Profile() {

  const [data, setData] = useState<usersType | null>(null);
  const { userLoggedIn, displayName, photoURL } = useAuth();

  const [sidenavState, setSidenavState] = useState<number>(1);
  const [formVisible, setFormVisible] = useState<boolean>(false);
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      if (result && result.length > 0) {
        setData(result[0]);
      }
    };
    fetchData();
  }, []);

  const RankDict: { [key: number]: string } = {
    1: "Silver",
    2: "Gold",
    3: "Platinum",
    4: "Diamond",
    5: "God tier",
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return "rank-silver";
      case 2:
        return "rank-gold";
      case 3:
        return "rank-platinum";
      case 4:
        return "rank-diamond";
      case 5:
        return "rank-god";
      default:
        return "";
    }
  };

  const getRankSVGClass = (ranksvg: number) => {
    switch (ranksvg) {
      case 1:
        return SilverRank;
      case 2:
        return GoldRank;
      case 3:
        return PlatinumRank;
      case 4:
        return DiamondRank;
      case 5:
        return GodRank;
      default:
        return "";
    }
  };

  const handleProfilePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Assuming you have a function to upload the file and get the URL
      const uploadedUrl = await uploadProfilePhoto(file); // Implement this function
      // Update the user's profile photo URL in your backend and state
      setData(prevData => prevData ? { ...prevData, pfpUrl: uploadedUrl } : null);
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
              {/* {photoURL ? (
                <img src={photoURL} alt={displayName} className="profile-user-photo" />
              ) : (
                <img src={UserIcon} alt="User" className="profile-user-photo-empty" />
              )} */}
              <img src={data?.profilePicUrl || photoURL } alt={data?.name} className="profile-user-photo"/>
              <label htmlFor="file-input" className="profile-camera">
                <img src={Camera}/>
              </label>
              <input id="file-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleProfilePhotoChange} />
            </div>
            <div className="profile-bar-details">
              <div className="profile-bar-details-name">
                {data?.name || 'Username'}
              </div>
              <div className={`profile-bar-rank ${getRankClass(data?.rank || 1)}`}>
                <div className="profile-rank-text">
                  {RankDict[data?.rank || 1]} member
                </div>
                <img src={Next} alt="next" className="profile-rank-next" />
              </div>
              <div className="profile-edit">
                <img src={Edit} className="profile-edit-pen"/>
                <div className="profile-edit-text">
                 &nbsp;Edit Profile
                </div>
              </div>
            </div>
          </div>
          <div className="profile-bar-right">
            <img src={getRankSVGClass(data?.rank || 1)} alt="Rank" className="Rank" />
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
                <div className="sidenav-detail">Favorites</div>
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
              <div className="sidenav-content-logout">
                <div className="sidenav-detail-logout"><div className="sidenav-Logout">Logout</div></div>
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
