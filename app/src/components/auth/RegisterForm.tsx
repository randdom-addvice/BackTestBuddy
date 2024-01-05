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
  InputGroup,
  InputErrorField,
} from "./elements";
import { StyledFlex } from "../../styles/globalElements";
import { useForm } from "../../hooks/useForm";
import { useRegisterUserHook } from "@/graphql/mutations/auth/auth.mutations";
import useAuth from "@/hooks/auth/useAuth";

const array = new Uint32Array(1);
window.crypto.getRandomValues(array);

const RegisterForm = ({ handleToggle }: { handleToggle: () => void }) => {
  const { setAuthCookies } = useAuth();
  const [inAppGraphQLError, setInAppGraphQLError] = useState("");
  const { formValues, onChange, onSubmit, getFieldError } = useForm(
    handleRegisterUser,
    {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    {
      first_name: (value: string) => value.length > 0,
      last_name: (value: string) => value.length > 0,
      password: (value: string) => value.length > 0,
      email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    }
  );

  const { registerUser, data, error, loading } = useRegisterUserHook(
    {
      registerUserInput: {
        ...formValues,
        username: `${formValues.first_name}${
          formValues.last_name
        }-${array[0].toString(36)}`,
      },
    },
    {
      errorPolicy: "none",
      fetchPolicy: "no-cache",
      onCompleted(completedData) {
        if (completedData) {
          console.log(completedData);
          setAuthCookies(completedData.registerUser);
          window.location.reload();
        }
      },
    }
  );

  async function handleRegisterUser() {
    try {
      setInAppGraphQLError("");
      await registerUser();
    } catch (error) {
      console.log((error as Error).message, "error logging");
      setInAppGraphQLError((error as Error).message ?? "Something went wrong");
    }
  }
  return (
    <>
      <SignUpContainer>
        <Form onSubmit={onSubmit}>
          <FormHeader>Create Account</FormHeader>
          <StyledFlex gap="4px">
            <InputGroup>
              <Input
                onChange={onChange}
                name="first_name"
                type="text"
                placeholder="First Name"
              />
              {getFieldError("first_name") && (
                <InputErrorField>This field is required</InputErrorField>
              )}
            </InputGroup>
            <InputGroup>
              <Input
                onChange={onChange}
                name="last_name"
                type="text"
                placeholder="Last Name"
              />
              {getFieldError("last_name") && (
                <InputErrorField>This field is required</InputErrorField>
              )}
            </InputGroup>
          </StyledFlex>
          <InputGroup>
            <Input
              onChange={onChange}
              name="email"
              type="email"
              placeholder="Email"
            />
            {getFieldError("email") && (
              <InputErrorField>
                Please enter a valid email address
              </InputErrorField>
            )}
          </InputGroup>
          <InputGroup>
            <Input
              onChange={onChange}
              name="password"
              type="password"
              placeholder="Password"
            />
            {getFieldError("password") && (
              <InputErrorField>This field is required</InputErrorField>
            )}
            {inAppGraphQLError && (
              <InputErrorField>{inAppGraphQLError}</InputErrorField>
            )}
          </InputGroup>

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
