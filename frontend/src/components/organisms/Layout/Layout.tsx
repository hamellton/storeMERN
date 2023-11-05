import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "../Header/Header";
import { Colors } from "../../../types/baseTypes";
import Footer from "../Footer/Footer";

const LayoutContainer = styled.div`
  background-color: ${Colors.primaryBackground};
  color: ${Colors.white};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 0;
`;

interface ILayoutProps {
  children: ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
