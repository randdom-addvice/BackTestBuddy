import React from "react";
import { useState } from "react";
import { isApolloError } from "@apollo/client";
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
  ActionLinkButton,
  FormHeader,
  InputErrorField,
  InputGroup,
} from "./elements";
import { useForm } from "../../hooks/useForm";
import { useLoginUserHook } from "../../graphql/mutations/auth/auth.mutations";
import { AppRoutes } from "../../routes/routesDeclaration";
import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";
import useAuth from "../../hooks/auth/useAuth";

const LoginForm = ({ handleToggle }: { handleToggle: () => void }) => {
  const navigate = useNavigate();
  const { setAuthCookies } = useAuth();
  const [inAppGraphQLError, setInAppGraphQLError] = useState("");
  const { formValues, onChange, onSubmit, getFieldError } = useForm(
    handleLogInUser,
    {
      email: "",
      password: "",
    },
    {
      password: (value: string) => value.length > 0,
      email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    }
  );
  const { loginUser, data, error, loading } = useLoginUserHook(formValues, {
    errorPolicy: "none",
    fetchPolicy: "no-cache",
    onCompleted(completedData, clientOptions) {
      if (completedData) {
        console.log(completedData);
        setAuthCookies(completedData.loginUser);
        // navigate(AppRoutes.DASHBOARD);
      }
    },
  });

  async function handleLogInUser() {
    try {
      setInAppGraphQLError("");
      await loginUser();
    } catch (error) {
      console.log((error as Error).message, "error logging");
      setInAppGraphQLError((error as Error).message ?? "Something went wrong");
    }
  }

  return (
    <>
      <SignInContainer>
        <Form onSubmit={onSubmit}>
          <FormHeader>Sign in</FormHeader>
          <InputGroup>
            <Input
              type="email"
              onChange={onChange}
              name="email"
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
              type="password"
              onChange={onChange}
              name="password"
              placeholder="Password"
            />
            {getFieldError("password") && (
              <InputErrorField>Password is required</InputErrorField>
            )}
            {inAppGraphQLError && (
              <InputErrorField>{inAppGraphQLError}</InputErrorField>
            )}
          </InputGroup>
          <ActionButton isLoading={loading} displayName="Sign In" />
          {/* <Button>
            {loading ? "Authenticating, please wait..." : "Sign In"}
          </Button> */}
          <ActionLink>
            Need an account?
            <ActionLinkButton onClick={handleToggle}>Sign Up</ActionLinkButton>
          </ActionLink>
        </Form>
      </SignInContainer>
    </>
  );
};

export default LoginForm;
