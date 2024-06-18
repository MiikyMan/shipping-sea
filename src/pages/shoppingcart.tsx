import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Products from "../components/products";
import { Breadcrumb, Table } from 'antd';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Footer from "../components/footer";
import axios from 'axios';
import { baseUser, baseURL } from '../components/userIDConfig';

const ShoppingCart = () => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [fullPrice, setFullPrice] = useState(0);
  const [vat, setVat] = useState(0);
  const [fee, setFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`${baseURL}/carts/${baseUser}`);
        const cartitems = response.data;
        const combinedData = cartitems.map(data => ({
          key: data.cartID,
          ...data
        }));
        
        setDataSource(combinedData);
        calculateTotals(selectedRowKeys, combinedData);
      } catch (error) {
        console.error("Error fetching cart data: ", error);
      }
    };

    fetchCartData();
  }, [selectedRowKeys]);

  const calculateTotals = (selectedKeys, data) => {
    const selectedRows = data.filter(item => selectedKeys.includes(item.key));
    const totalSelectedPrice = selectedRows.reduce((total, row) => total + (row.price * row.qty), 0);
    const totalSelectedFullPrice = selectedRows.reduce((total, row) => total + (row.fullprice * row.qty), 0);
    const totalVat = totalSelectedPrice * 0.07;
    const totalFee = totalSelectedPrice * 0.05;
    const totalDiscount = selectedRows.reduce((total, row) => {
      const priceDifference = row.fullprice - row.price;
      return total + (priceDifference * row.qty);
    }, 0);

    setSubTotal(totalSelectedPrice);
    setFullPrice(totalSelectedFullPrice);
    setVat(totalVat);
    setFee(totalFee);
    setDiscount(totalDiscount);
    setTotal(totalSelectedPrice + totalVat + totalFee);
    console.log('totalSelectedPrice', totalSelectedPrice)
    console.log('fullprice', fullPrice)
    console.log('subtotal',subTotal)
    console.log('total',total)
    console.log('discount',discount)
    console.log('totalVat',totalVat)
    console.log('totalFee',totalFee)
    console.log('totalSelectedFullPrice',totalSelectedFullPrice)

  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      calculateTotals(selectedRowKeys, dataSource);
    },
    selectedRowKeys,
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(`${baseURL}/carts/${baseUser}/${key}/remove`);
      const newData = dataSource.filter(item => item.key !== key);
      setDataSource(newData);
      const newSelectedRowKeys = selectedRowKeys.filter(selectedKey => selectedKey !== key);
      setSelectedRowKeys(newSelectedRowKeys);
      calculateTotals(newSelectedRowKeys, newData);
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const handleQuantityChange = async (key: any, increment: boolean) => {
    const updateQTY = increment ? 1 : -1 ;
    console.log("user",baseUser);
    console.log("key",key);
    console.log("updateQTY",updateQTY);
    const q = await axios.post(`${baseURL}/carts/${baseUser}/${key}/${updateQTY}`);
    console.log("q",q);
    const newData = dataSource.map(item =>
      item.key === key ? { ...item, qty: increment ? item.qty + 1 : item.qty - 1 } : item
    );
    setDataSource(newData);
    calculateTotals(selectedRowKeys, newData);
  };
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },  
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      render: (_, record) => (
        <div>
          <Button onClick={() => handleQuantityChange(record.key, false)} disabled={record.qty <= 1}>-</Button>
          <span style={{ margin: '0 8px' }}>{record.qty}</span>
          <Button onClick={() => handleQuantityChange(record.key, true)}>+</Button>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Tooltip title="Delete">
          <Button onClick={() => handleDelete(record.key)}>
            <DeleteIcon />
          </Button>
        </Tooltip>
      ),
    },
  ];

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
                            href: '/home',
                        },
                        {
                            title: 'Shopping Cart',
                        },
                        ]}
            />
          </div>
          <div className="page-title-bar">
            <div className="page-title">Shopping Cart</div>
            <div className="page-sub-title">({dataSource.length} items)</div>
          </div>
        </div>
      </div>
      <div className="page-container">
        <div className="shoppingcart-container">
          <div className="cart-list">
            <Table
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              scroll={{ y: 450 }}
            />
          </div>
          <div className="check-out">
            <div className="check-out-top">
              <div className="check-out-title">Summary</div>
              <div className="check-out-list">
                <div className="sub-check-out-list">
                  <div className="listname">Sub total</div>
                  <div className="listvalue">${subTotal.toFixed(2)}</div>
                </div>
                <div className="sub-check-out-list">
                  <div className="listname">Vat</div>
                  <div className="listvalue">${vat.toFixed(2)}</div>
                </div>
                <div className="sub-check-out-list">
                  <div className="listname">Shipping Fee</div>
                  <div className="listvalue">${fee.toFixed(2)}</div>
                </div>
                <div className="sub-check-out-list">
                  <div className="listname">Discount</div>
                  <div className="listdiscount">-${discount.toFixed(2)}</div>
                </div>
              </div>
            </div>
            <div className="check-out-bottom">
              <div className="check-out-total">
                <div className="totla-listname">Total</div>
                <div className="total-listvalue">${total.toFixed(2)}</div>
              </div>
              <div className="place-order">
                <Button className="check-out-btn" variant="contained">
                  Check out
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Products />
      </div>
      <Footer />
    </>
  );
};

export default ShoppingCart;
