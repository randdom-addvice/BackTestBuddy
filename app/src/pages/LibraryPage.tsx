import React from "react";
import DashBoardLayout from "@/components/dashboard/layout/DashBoardLayout";
import LibraryNav from "@/components/library/nav/LibraryNav";
import LibraryContainer from "@/components/library/LibraryContainer";
import { StyledContainer } from "@/styles/globalElements";

const LibraryPage = () => {
  return (
    <DashBoardLayout>
      <StyledContainer margin="0">
        <LibraryNav />
        <LibraryContainer />
      </StyledContainer>
    </DashBoardLayout>
  );
};

export default LibraryPage;
