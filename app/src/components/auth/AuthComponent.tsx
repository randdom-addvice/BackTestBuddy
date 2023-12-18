//@ts-nocheck
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

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  function handleToggle() {
    setIsLogin(!isLogin);
  }
  return (
    <StyledLogin>
      <Container active={isLogin}>
        <SignUpContainer id="SignUpContainer">
          <Form id="Form">
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

        <SignInContainer id="SignInContainer">
          <Form id="Form">
            <FormHeader>Sign in</FormHeader>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button>Sign In</Button>
            <ActionLink>
              Need an account?
              <ActionLinkButton onClick={handleToggle}>
                Sign Up
              </ActionLinkButton>
            </ActionLink>
          </Form>
        </SignInContainer>

        <OverlayContainer id="OverlayContainer">
          <Overlay>
            <OverlayPanelLeft left>
              <Heading>Hi There 👋</Heading>
              <SubHeading>
                Begin your experience with us – enter your personal details.
              </SubHeading>
            </OverlayPanelLeft>

            <OverlayPanelRight>
              <Heading>Welcome Back!</Heading>
              <SubHeading>
                Stay connected with us by logging in with your personal details.
              </SubHeading>
            </OverlayPanelRight>
          </Overlay>
        </OverlayContainer>
      </Container>
    </StyledLogin>
  );
};

export default AuthComponent;
