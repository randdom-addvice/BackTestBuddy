import styled, { css, keyframes } from "styled-components";
export const show = keyframes`
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
`;
export const StyledLogin = styled.div`
  display: flex;
  height: 100vh;
  background-color: #4070f4;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const Container = styled.div<{ active: string }>`
  /* border: 3px solid; */
  /* background-color: #fff; */
  border-radius: 10px;
  /* box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); */
  position: relative;
  overflow: hidden;
  width: 768px;
  width: 1000px;
  max-width: 100%;
  min-height: 480px;

  ${(props) =>
    props.active === "true" &&
    css`
      ${OverlayPanel} {
        transform: translateX(0);
      }
      ${OverlayPanelRight} {
        transform: translateX(20%);
      }
      ${OverlayContainer} {
        transform: translateX(-100%);
      }
      ${Overlay} {
        transform: translateX(50%);
      }
      ${SignInContainer} {
        transform: translateX(100%);
      }
      ${SignUpContainer} {
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        animation: ${show} 0.6s;
      }
    `}
`;
export const Heading = styled.h1`
  color: #fff;
  font-size: 4rem;
  margin-bottom: 1rem;
`;
export const SubHeading = styled.p`
  color: #fff;
  font-size: 1rem;
`;

export const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
`;
export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  border-radius: 10px;
`;
export const FormHeader = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;
export const Input = styled.input`
  width: 100%;
  padding: 10px;

  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;
export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;
export const InputErrorField = styled.p`
  width: 100%;
  color: ${({ theme }) => theme.colors.red};
  text-align: left;
  font-size: 0.75rem;
  margin-top: 0.2rem;
`;
export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #357ae8;
  }
`;
export const ActionLink = styled.p`
  color: ${({ theme }) => theme.colors.black};
  margin-top: 2rem;
`;
export const ActionLinkButton = styled.span`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 0 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
export const SignInContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  z-index: 2;
`;
export const SignUpContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
`;
export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
`;
export const Overlay = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transition: transform 0.6s ease-in-out;
`;
export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;
export const OverlayPanelLeft = styled(OverlayPanel)`
  transform: translateX(-20%);
`;
export const OverlayPanelRight = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
`;
