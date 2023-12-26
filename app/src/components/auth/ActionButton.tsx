import React from "react";
import { FaSpinner } from "react-icons/fa";

import { Button } from "./elements";

const ActionButton = ({
  isLoading,
  displayName,
}: {
  isLoading: boolean;
  displayName: string;
}) => {
  return (
    <Button disabled={isLoading}>
      {isLoading ? "Authenticating, please wait..." : displayName}
    </Button>
  );
};

export default ActionButton;
