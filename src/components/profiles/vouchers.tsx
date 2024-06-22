import React, { useState } from "react";
import { Tabs } from 'antd'; // Importing Tabs component from antd
import './profile.scss'

const initDetails = [
    { title: "Page", detail: "Vouchers" },
];

function VouchersAll() {
    const [details, setDetails] = useState(initDetails);
    return (
        <>
            {
                details.map((detail) => (
                    <div className="profile-purchases-component">
                        <div className="product-details-component-title">{detail.title}</div>
                        <div className="product-details-component-detail">{detail.detail}</div>
                    </div>
                ))
            }
        </>
    );
}

const items = [
    {
        key: '1',
        label: 'All',
        children: <VouchersAll />,
    },
    {
        key: '2',
        label: 'To Pay',
        children: '',
    },
    {
        key: '3',
        label: 'To Ship',
        children: '',
    },
    {
        key: '4',
        label: 'To Receive',
        children: '',
    },
    {
        key: '5',
        label: 'Completed',
        children: '',
    },
    {
        key: '6',
        label: 'Cancelled',
        children: '',
    },
    {
        key: '7',
        label: 'Return/Refund',
        children: '',
    },
];

function Vouchers() {
    const onChange = (key) => {
        console.log('Tab changed to:', key);
    };

    return (
        <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
        />
    );
}

export default Vouchers;
