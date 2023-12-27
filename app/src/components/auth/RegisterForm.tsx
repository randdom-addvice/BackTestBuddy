import React from "react";
import { useState } from "react";
import {
  Button,
  Container,
  Form,
  ActionLink,
  Heading,
  Input,
  Overlay,
  OverlayContainer,
  OverlayPanelLeft,
  OverlayPanelRight,
  SignInContainer,
  SignUpContainer,
  StyledLogin,
  SubHeading,
  ActionLinkButton,
  FormHeader,
} from "./elements";
import { StyledFlex } from "../../styles/globalElements";
import { useForm } from "../../hooks/useForm";

const RegisterForm = ({ handleToggle }: { handleToggle: () => void }) => {
  return (
    <>
      <SignUpContainer>
        <Form>
          <FormHeader>Create Account</FormHeader>
          <StyledFlex gap="4px">
            <Input type="text" placeholder="First Name" />
            <Input type="text" placeholder="Last Name" />
          </StyledFlex>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button>Sign Up</Button>
          <ActionLink>
            Already have an account?
            <ActionLinkButton onClick={handleToggle}>Login</ActionLinkButton>
          </ActionLink>
        </Form>
      </SignUpContainer>
    </>
  );
};

export default RegisterForm;
