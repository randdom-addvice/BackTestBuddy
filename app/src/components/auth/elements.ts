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
export const Container = styled.div<{ active: boolean }>`
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
    props.active &&
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
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary};
    outline: none;
  }
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
export const Overlay = styled.div<{ isLogin: boolean }>`
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
export const OverlayPanel = styled.div<{ isLogin: boolean }>`
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

// import styled from "styled-components";

// export export const dynamicColor = "#4070F4"; // Set your dynamic color here

// export export const StyledLogin = styled.div`
//   display: flex;
//   height: 100%;
//   background-color: ${dynamicColor};
//   width: 100%;
//   justify-content: center;
//   align-items: center;
// `;

// export export const ColoredContainer = styled.div<{ isLogin: boolean }>`
//   /* position: absolute; */
//   background-color: #4070f4;
//   transition: all 0.5s linear;
//   width: 50%;
//   height: 100vh;
//   z-index: 1;
//   transform: ${(props) =>
//     props.isLogin ? "translateX(0)" : "translateX(100%)"};

//   &.left {
//     transform: translateX(0);
//   }

//   &.right {
//     transform: translateX(100%);
//   }
// `;
// export const ColoredContainer2 = styled(ColoredContainer)`
//   transform: ${(props) =>
//     !props.isLogin ? "translateX(0)" : "translateX(-100%)"};
// `;
// export const Header = styled.h1``;
// export const SubHeader = styled.h1``;
// export const ActionButton = styled.button``;

// export const FormContainer = styled.div<{ isLogin: boolean }>`
//   width: 24rem;
//   background: #fff;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: fit-content;
//   flex-direction: column;
//   transition: all 0.5s linear;
//   transform: ${(props) =>
//     props.isLogin ? "translateX(0)" : "translateX(-100%)"};
// `;
// export const FormContainer2 = styled(FormContainer)`
//   transform: ${(props) =>
//     !props.isLogin ? "translateX(0)" : "translateX(-200%)"};
// `;
// export const Form = styled.form``;

// export const WelcomeBack = styled.div`
//   z-index: 2;
//   transition: all 0.8s ease-in-out;
//   position: absolute;
//   transition: all 0.8s ease-in-out;
//   width: 30%;

//   &.active {
//     visibility: visible;
//     transform: translateX(0%);
//   }

//   &.inactive {
//     visibility: hidden;
//     transform: translateX(-100%);
//   }

//   &__logo-container {
//     padding: 15px;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     color: white;
//     font-weight: bold;

//     &--image {
//       width: 38px;
//       height: 38px;
//       margin-right: 4px;
//     }

//     @media (max-width: 768px) {
//       font-size: 0px;
//       justify-content: center;
//     }
//   }

//   &__main-container {
//     margin-top: 20%;
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     color: white;

//     &__text-container {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       width: 60%;
//       text-align: center;

//       &--title {
//         font-size: 30px;
//         font-weight: bold;
//       }

//       &--secondary {
//         margin-top: 12px;
//         font-size: 13px;
//         font-weight: lighter;
//       }

//       @media (max-width: 768px) {
//         display: none;
//       }
//     }

//     &__button-container {
//       margin-top: 40px;
//       border: solid 2px white;
//       width: 50%;
//       height: 40px;
//       border-radius: 30px;
//       font-size: 18px;
//       display: flex;
//       flex-direction: row;
//       align-items: center;
//       justify-content: center;
//       cursor: pointer;

//       @media (max-width: 768px) {
//         font-size: 3vw;
//       }
//     }
//   }
// `;

// export const CreateContainer = styled.div`
//   // Add styling for CreateContainer
// `;

// export const LoginContainer = styled.div`
//   // Add styling for LoginContainer
// `;

// export const HelloContainer = styled.div`
//   // Add styling for HelloContainer
// `;
