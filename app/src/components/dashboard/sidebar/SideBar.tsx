import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FcCandleSticks } from "react-icons/fc";
import { FaRegUser } from "react-icons/fa";
import {
  ProIconText,
  SidebarCategory,
  SidebarContainer,
  SidebarItem,
  SidebarMenuIcon,
} from "./elements";

const iconSize = "30px";

const SideBar = () => {
  return (
    <SidebarContainer>
      <SidebarMenuIcon>
        <RxHamburgerMenu size={iconSize} />
      </SidebarMenuIcon>
      <SidebarCategory>
        <SidebarItem>
          <FcCandleSticks size={iconSize} />
        </SidebarItem>
      </SidebarCategory>

      <SidebarCategory>
        <SidebarItem>
          <ProIconText>pro</ProIconText>
        </SidebarItem>
      </SidebarCategory>

      <SidebarCategory>
        <SidebarItem>
          <FaRegUser size={iconSize} />
        </SidebarItem>
      </SidebarCategory>
    </SidebarContainer>
  );
};

export default SideBar;
