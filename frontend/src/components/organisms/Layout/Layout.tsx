import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "../Header/Header";
import { Colors } from "../../../types/baseTypes";

const LayoutContainer = styled.div`
  background-color: ${Colors.primaryBackground};
  color: ${Colors.white};
`;

const Content = styled.div`
  padding: 0;
`;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Content>{children}</Content>
    </LayoutContainer>
  );
};

export default Layout;
