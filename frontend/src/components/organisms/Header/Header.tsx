import React from "react";
import styled, { css } from "styled-components";
import { Colors } from "../../../types/baseTypes";
import useDevice, { DeviceTypes } from "../../../hooks/useDevice";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header<{ device?: DeviceTypes }>`
  background-color: ${Colors.primaryBackground};
  color: ${Colors.white};
  padding: 16px 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;

  ${(props) =>
    props.device === DeviceTypes.MOBILE &&
    css`
      padding: 10px 30px;
      text-align: center;
    `}
`;

const Logo = styled.div<{ device?: DeviceTypes }>`
  color: ${Colors.white};
  font-size: 24px;
  font-weight: bold;

  ${(props) =>
    props.device === DeviceTypes.MOBILE &&
    css`
      font-size: 18px;
    `}
`;

const MenuLoginContainer = styled.div<{ device?: DeviceTypes }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  a {
    text-decoration: none;
    color: ${Colors.white};
  }
`;

const Menu = styled.div<{ device?: DeviceTypes }>`
  font-size: 18px;

  a {
    text-decoration: none;
    color: ${Colors.black};
  }

  ${(props) =>
    props.device === DeviceTypes.MOBILE &&
    css`
      font-size: 16px;
      text-align: left;
      a {
        text-decoration: none;
        color: ${Colors.black};
      }
    `}
`;

const Login = styled.div<{ device?: DeviceTypes }>`
  font-size: 18px;
  margin-left: 20px;

  ${(props) =>
    props.device === DeviceTypes.MOBILE &&
    css`
      font-size: 16px;
      text-align: right;
      margin-left: 0;
    `}
`;

const Logout = styled.div<{ device?: DeviceTypes }>`
  font-size: 18px;
  margin-left: 20px;
  cursor: pointer;

  ${(props) =>
    props.device === DeviceTypes.MOBILE &&
    css`
      font-size: 16px;
      text-align: right;
      margin-left: 0;
    `}
`;

const Header: React.FC = () => {
  const { device } = useDevice() ?? {};
  const { logout, isAuthenticated } = useAuth();

  return (
    <HeaderContainer device={device}>
      <Logo device={device}>Logo</Logo>
      <MenuLoginContainer device={device}>
        {isAuthenticated ? (
          <Link to="/products">
            <Menu aria-label="Products" device={device}>Products</Menu>
          </Link>
        ) : (
          <Login device={device}>Login</Login>
        )}
        {isAuthenticated && (
          <Logout data-testid="logout-button" device={device} onClick={logout}>
            Logout
          </Logout>
        )}
      </MenuLoginContainer>
    </HeaderContainer>
  );
};

export default Header;
