import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Colors } from "../../../types/baseTypes";
import useDevice, { DeviceTypes } from "../../../hooks/useDevice";
import config from "../../../utils/config";
import { RegisterFormData } from "./RegisterForm.types";
import { IApiResponseError } from "../../../types/types";
import { sendRequest } from "../../../utils/api";
import { ILoginResponse } from "../LoginForm/LoginForm.types";

const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ isMobile }) => (isMobile ? "95%" : "500px")};
  margin: 0 auto;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 700;
  margin: 5px 0;
  color: ${Colors.black};
`;

const InputContainer = styled.div<{ isMobile: boolean }>`
  margin-top: 20px;
  width: ${({ isMobile }) => (isMobile ? "100%" : "500px")};
`;

const Input = styled(Field)<{ isMobile: boolean }>`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid ${Colors.lightGray};
  border-radius: 4px;
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "16px")};
`;

const ErrorText = styled(ErrorMessage)`
  color: ${Colors.darkRed};
`;

const SubmitButton = styled.button<{ isMobile: boolean }>`
  background-color: ${Colors.primaryBackground};
  color: ${Colors.white};
  padding: 15px 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "16px")};
`;

const ErrorContainer = styled.div`
  color: ${Colors.darkRed};
  margin-top: 10px;
`;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = { email: "", password: "" };

const RegisterForm: React.FC = () => {
  const { device } = useDevice() ?? {};
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  const handleSubmit = async (values: RegisterFormData) => {
    try {
      const data = {
        email: values.email,
        password: values.password,
      };

      const registerResponse = await sendRequest<
        ILoginResponse | IApiResponseError
      >(`${config.serverUrl}/user/register`, "POST", data);

      if (registerResponse.status === 201) {
        window.location.href = "/login";
      } else {
        console.error("Registration failed");
        const errorMessage = (registerResponse.data as IApiResponseError)
          .message;
        setRegistrationError(errorMessage);
      }
    } catch (error) {
      setRegistrationError((error as IApiResponseError).message);
    }
  };

  const isMobile = device === DeviceTypes.MOBILE;

  return (
    <Container isMobile={isMobile}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <InputContainer isMobile={isMobile}>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="text" name="email" isMobile={isMobile} />
            <ErrorText name="email" component="div" />
          </InputContainer>

          <InputContainer isMobile={isMobile}>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password" isMobile={isMobile} />
            <ErrorText name="password" component="div" />
          </InputContainer>

          {registrationError && (
            <ErrorContainer>{registrationError}</ErrorContainer>
          )}

          <SubmitButton type="submit" isMobile={isMobile}>
            Register
          </SubmitButton>
        </Form>
      </Formik>
    </Container>
  );
};

export default RegisterForm;
