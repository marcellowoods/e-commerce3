import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
    SearchOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";

import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

// import { Layout } from 'antd';


const { SubMenu, Item, ItemGroup } = Menu;

//https://stackoverflow.com/questions/55164824/antd-submenu-typeerror-cannot-read-property-isrootmenu-of-undefined
//https://ant.design/components/page-header/
//https://medium.com/@stroppolo.daniel/adding-a-responsive-header-to-react-ant-design-24b8e052893d

//solution
//https://stackoverflow.com/questions/49404943/ant-select-closes-dropdown
//Change Menu.Item where the select is contained to a Menu.ItemGroup, those do not trigger the onVisibleChange when clicked.



const Header = () => {
    const [current, setCurrent] = useState("home");

    let dispatch = useDispatch();
    let { user, cart } = useSelector((state) => ({ ...state }));

    let history = useHistory();

    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key);
    };

    const logout = () => {
        signOut(auth);
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push("/login");
    };

    return (


        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            <Item key="shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">Shop</Link>
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]}>
                        Cart
                    </Badge>
                </Link>
            </Item>

            {!user && (
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/register">Register</Link>
                </Item>
            )}

            {!user && (
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Login</Link>
                </Item>
            )}

            {user && (
                <SubMenu
                    icon={<SettingOutlined />}
                    title={user.email && user.email.split("@")[0]}
                    className="float-right"
                >
                    {user && user.role === "subscriber" && (
                        <Item>
                            <Link to="/user/history">Dashboard</Link>
                        </Item>
                    )}

                    {user && user.role === "admin" && (
                        <Item>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Item>
                    )}

                    <Item icon={<LogoutOutlined />} onClick={logout}>
                        Logout
                    </Item>
                </SubMenu>
            )}

            <SubMenu
                icon={<SearchOutlined />}
                className="float-right"
            >
                <ItemGroup key="search" >
                    <Search />
                </ItemGroup>
            </SubMenu>




        </Menu>


    );
};



export default Header;
