import React from "react";
import styled from "styled-components";
import Layout from "../../organisms/Layout/Layout";
import { Colors } from "../../../types/baseTypes";
import LoginForm from "../../organisms/LoginForm/LoginForm";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${Colors.white};
`;

const Content = styled.div`
  width: 100%;
  background-color: ${Colors.white};
`;

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <Content>
          <LoginForm />
        </Content>
      </PageContainer>
    </Layout>
  );
};

export default LoginPage;
