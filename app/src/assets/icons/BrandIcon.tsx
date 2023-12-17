import React from "react";
import { ReactComponent as Brand } from "./brand-icon.svg";

const BrandIcon = ({ width = "39px" }: { width?: string }) => {
  return (
    <>
      <Brand style={{ width }} />
    </>
  );
};

export default BrandIcon;
