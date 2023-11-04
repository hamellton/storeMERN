import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../organisms/Layout/Layout";
import { Colors } from "../../../types/baseTypes";
import LoginForm from "../../organisms/LoginForm/LoginForm";
import RegisterForm from "../../organisms/RegisterForm/RegisterForm";

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

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  background-color: ${Colors.white};
  color: ${Colors.black};
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 10px;
  text-decoration: none;
  transition: background-color 0.3s;
  &.active {
    background-color: ${Colors.primaryBackground};
    color: ${Colors.white};
  }
  &.inactive {
    background-color: ${Colors.lightGray};
  }
`;

enum FormType {
  LOGIN,
  REGISTER,
}

const LoginPage: React.FC = () => {
  const [activeForm, setActiveForm] = useState(FormType.LOGIN);

  return (
    <Layout>
      <PageContainer>
        <Content>
          <Tabs>
            <TabButton
              className={
                activeForm === FormType.LOGIN ? "active" : "inactive"
              }
              onClick={() => setActiveForm(FormType.LOGIN)}
            >
              Login
            </TabButton>
            <TabButton
              className={
                activeForm === FormType.REGISTER ? "active" : "inactive"
              }
              onClick={() => setActiveForm(FormType.REGISTER)}
            >
              Register
            </TabButton>
          </Tabs>
          {activeForm === FormType.LOGIN ? <LoginForm /> : <RegisterForm />}
        </Content>
      </PageContainer>
    </Layout>
  );
};

export default LoginPage;
