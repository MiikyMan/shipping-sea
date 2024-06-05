import Navbar from "../components/navbar";
import Products from "../components/products";
import { Breadcrumb } from 'antd';
import HeartIcon from "../components/assets/heart.svg";
import type { TabsProps } from 'antd';
import ProductDetails from "../components/productDetails";
import { Divider, Radio, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import type { GetRef, InputRef } from 'antd';
import { Form, Input } from 'antd';
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  qty: number;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    price: 32,
    qty: 1,
  },
  {
    key: '2',
    name: 'Jim Green',
    price: 42,
    qty: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    price: 32,
    qty: 1,
  },
  {
    key: '4',
    name: 'Disabled User',
    price: 99,
    qty: 1,
  },
  {
    key: '5',
    name: 'Disabled User',
    price: 99,
    qty: 1,
  },
  {
    key: '7',
    name: 'Disabled User',
    price: 99,
    qty: 1,
  },
  {
    key: '8',
    name: 'Disabled User',
    price: 99,
    qty: 1,
  },
  {
    key: '9',
    name: 'Disabled User',
    price: 99,
    qty: 1,
  },
  {
    key: '10',
    name: 'Disabled User',
    price: 99,
    qty: 1,
  },
  {
    key: '11',
    name: 'Disabled User',
    price: 99,
    qty: 1,
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

function ShoppingCart() {
  const [dataSource, setDataSource] = useState<DataType[]>(data);
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleQuantityChange = (key: React.Key, increment: boolean) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key
          ? { ...item, qty: increment ? item.qty + 1 : item.qty - 1 }
          : item
      )
    );
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '15%',
      align:'center',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      width: '30%',
      align:'center',
      render: (_, record) => (
        <div>
          <Button onClick={() => handleQuantityChange(record.key, false)} disabled={record.qty <= 1}>-</Button>
          <span style={{ margin: '0 8px' }}>{record.qty}</span>
          <Button onClick={() => handleQuantityChange(record.key, true)}>+</Button>
        </div>
      ),
    },
    {
      title: '',
      dataIndex: 'operation',
      width:'15%',
      align:'center',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Tooltip title="Remove" placement="right">
          <div className="delete-icon-wrapper" onClick={() => handleDelete(record.key)}>
            <DeleteIcon />
          </div>
          </Tooltip>
        ) : null,
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
                  href: '/',
                },
                {
                  title: 'Shopping Cart',
                },
              ]}
            />
          </div>
          <div className="page-title-bar">
            <div className="page-title">Shopping Cart</div>
            <div className="page-sub-title">(3 items)</div>
          </div>
        </div>
      </div>
      <div className="page-container">
        
        
        <div className="shoppingcart-container">
          <div className="cart-list">
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={defaultColumns}
              dataSource={dataSource}
              pagination={false}
              scroll={{y: 300 }}
            />
          </div>
          <div className="check-out">
            <div className="check-out-top">
              <div className="check-out-title">Summary</div>
              <div className="check-out-list">
                <div className="sub-check-out-list">
                  <div className="listname">Sub total</div>
                  <div className="listvalue">$79.99</div>
                </div>
                <div className="sub-check-out-list">
                  <div className="listname">Vat</div>
                  <div className="listvalue">$7.99</div>
                </div>
                <div className="sub-check-out-list">
                  <div className="listname">Shipping Fee</div>
                  <div className="listvalue">$0.99</div>
                </div>
              </div>
            </div>
            <div className="check-out-bottom">
              <div className="check-out-total">
                <div className="totla-listname">Total</div>
                <div className="total-listvalue">$10.99</div>
              </div>
              <div className="place-order">
                  <Button className="check-out-btn" variant="contained" sx={{ 
                      borderRadius: 3,
                      height:60,
                      fontSize:20,
                      fontWeight: 'bold',
                      bgcolor:'#5AB2FF',
                      ':hover': {
                        bgcolor: '#4798CC',
                        color: 'white',
                      },
                    }
                  }
                  >
                  Check out
                  </Button>
                {/* <button className="check-out-btn">Place Order</button> */}
              </div>
            </div>
          </div>
        </div>
        <Products />
      </div>
    </>
  );
}

export default ShoppingCart;
