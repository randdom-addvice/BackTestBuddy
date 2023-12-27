import React from "react";
import { useNavigate } from "react-router-dom";

const useHistory = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };
  return { navigateTo };
};

export default useHistory;
