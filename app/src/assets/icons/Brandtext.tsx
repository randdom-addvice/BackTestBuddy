import React from "react";
import { ReactComponent as Brand } from "./brand.svg";

const BrandText = ({ width = "214px" }: { width?: string }) => {
  return (
    <>
      <Brand style={{ width }} />
    </>
  );
};

export default BrandText;
