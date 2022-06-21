import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import { Link } from 'react-router-dom';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';

import Search from '../forms/Search';

// destructuring
const { SubMenu, Item } = Menu;

// function
const Header = () => {
  // state
  const [current, setCurrent] = useState('home');

  //dispatch an action to store
  let dispatch = useDispatch();

  let history = useNavigate();

  // get user from state
  let { user, cart } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  // logout function
  const logout = () => {
    auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };

  return (
    // Navbar
    <>
      <Menu
        key="menu"
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home </Link>
        </Item>

        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop">Shop </Link>
        </Item>

        <Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart">
            <Badge count={cart.length} offset={[9, 0]}>
              Cart
            </Badge>
          </Link>
        </Item>

        <Item key="search">
          <Search />
        </Item>

        {user && (
          <SubMenu
            key="submenu"
            icon={<SettingOutlined />}
            title={user.email && user.email.split('@')[0]}
            className="ml-auto"
          >
            {user && user.role === 'subscriber' && (
              <Item>
                <Link to="/user/history">Dashboard</Link>
              </Item>
            )}

            {user && user.role === 'admin' && (
              <Item>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )}
            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}

        {!user && (
          <Item key="login" icon={<UserOutlined />} className="ml-auto">
            <Link to="/login">Login</Link>
          </Item>
        )}

        {!user && (
          <Item key="register" icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Item>
        )}
      </Menu>

      {/* {user && (
        <span
          style={{
            float: "right",
            top: "1px",
            marginRight: "160px",
            marginTop: "-45px",
          }}
        >
          <Search />
        </span>
      )}

      {!user && (
        <span
          style={{
            float: "right",
            top: "1px",
            marginRight: "210px",
            marginTop: "-45px",
          }}
        >
          <Search />
        </span>
      )} */}
    </>
  );
};

export default Header;
