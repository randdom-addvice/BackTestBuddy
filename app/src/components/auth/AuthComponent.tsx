import { useState } from "react";
import {
  Container,
  Heading,
  Overlay,
  OverlayContainer,
  OverlayPanelLeft,
  OverlayPanelRight,
  StyledLogin,
  SubHeading,
} from "./elements";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  function handleToggle() {
    setIsLogin(!isLogin);
  }
  return (
    <StyledLogin>
      <Container active={isLogin.toString()}>
        <RegisterForm handleToggle={handleToggle} />
        <LoginForm handleToggle={handleToggle} />

        <OverlayContainer id="OverlayContainer">
          <Overlay>
            <OverlayPanelLeft>
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
