import React from "react";
import styled, { css } from "styled-components";
import { Colors } from "../../../types/baseTypes";
import useDevice, { DeviceTypes } from "../../../hooks/useDevice";

const HeaderContainer = styled.header<{ device?: DeviceTypes }>`
  background-color: ${Colors.primaryBackground};
  color: ${Colors.white};
  padding: 16px 100px;
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  gap: 100px;
  ${(props) =>
    props.device === DeviceTypes.MOBILE &&
    css`
      text-align: center;
      padding: 10px 30px;
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
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${(props) =>
    props.device === DeviceTypes.MOBILE &&
    css`
      font-size: 16px;
    `}
`;

const Menu = styled.div<{ device?: DeviceTypes }>`
  font-size: 18px;

  ${(props) =>
    props.device === DeviceTypes.MOBILE &&
    css`
      font-size: 16px;
      text-align: left;
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

const Header: React.FC = () => {
  const { device } = useDevice() ?? {};

  return (
    <HeaderContainer device={device}>
      <Logo device={device}>Logo</Logo>
      <MenuLoginContainer device={device}>
        <Menu device={device}>Products</Menu>
        <Login device={device}>Login</Login>
      </MenuLoginContainer>
    </HeaderContainer>
  );
};

export default Header;
