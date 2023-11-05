import React from "react";
import styled, { css } from "styled-components";
import { Colors } from "../../../types/baseTypes";
import useDevice, { DeviceTypes } from "../../../hooks/useDevice";

const FooterContainer = styled.footer<{ device?: DeviceTypes }>`
  background-color: ${Colors.primaryBackground};
  color: ${Colors.white};
  padding: 16px 100px;
  display: flex;
  align-items: center;
  gap: 100px;
  min-height: 70px;

  ${(props) =>
    props.device === DeviceTypes.MOBILE &&
    css`
      text-align: center;
      padding: 10px 30px;
    `}
`;

const Footer: React.FC = () => {
  const { device } = useDevice() ?? {};

  return (
    <div>
      <FooterContainer device={device}>
      </FooterContainer>
    </div>
  );
};

export default Footer;
