import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FcCandleSticks } from "react-icons/fc";
import { FaRegUser } from "react-icons/fa";
import { LuLibrary } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";

import {
  IconText,
  ProIconText,
  SidebarCategory,
  SidebarContainer,
  SidebarFooterContainer,
  SidebarFooterFullName,
  SidebarFooterLogoutButton,
  SidebarFooterName,
  SidebarItem,
  SidebarMenuIcon,
} from "./elements";
import { StyledFlex } from "@/styles/globalElements";
import { useAppSelector } from "@/redux/hooks";
import CookieUtility from "@/utils/cookieUtils";

const iconSize = "30px";

const SideBar = () => {
  const [expandSidebar, setExpandSidebar] = useState(false);
  const userData = useAppSelector((state) => state.auth.user);

  function logoutUser() {
    CookieUtility.deleteCookie("authToken");
    window.location.reload();
  }

  return (
    <SidebarContainer expanded={expandSidebar}>
      <SidebarMenuIcon onClick={() => setExpandSidebar(!expandSidebar)}>
        <RxHamburgerMenu size={iconSize} />
      </SidebarMenuIcon>

      <SidebarCategory active={true}>
        <SidebarItem>
          <FcCandleSticks size={iconSize} />
          <IconText visible={expandSidebar}>Dashboard</IconText>
        </SidebarItem>
      </SidebarCategory>
      <SidebarCategory active={false}>
        <SidebarItem expanded={expandSidebar}>
          <LuLibrary size={iconSize} />
          <IconText visible={expandSidebar}>Library</IconText>
        </SidebarItem>
      </SidebarCategory>
      <SidebarCategory active={false}>
        <SidebarItem expanded={expandSidebar}>
          <ProIconText>pro</ProIconText>
          <IconText visible={expandSidebar}>Plans</IconText>
        </SidebarItem>
      </SidebarCategory>
      <SidebarCategory active={false}>
        <SidebarItem expanded={expandSidebar}>
          <FaRegUser size={iconSize} />
          <IconText visible={expandSidebar}>Profile</IconText>
        </SidebarItem>
      </SidebarCategory>

      <SidebarFooterContainer>
        <StyledFlex justify={expandSidebar ? "flex-start" : "center"}>
          <SidebarFooterName>
            {userData?.first_name[0]}
            {userData?.last_name[0]}
          </SidebarFooterName>
          {expandSidebar && (
            <SidebarFooterFullName>
              {userData?.first_name} {userData?.last_name}
            </SidebarFooterFullName>
          )}
        </StyledFlex>
        <SidebarFooterLogoutButton title="logout" onClick={logoutUser}>
          <StyledFlex justify="space-around">
            {expandSidebar && <span>Logout</span>}
            <IoIosLogOut fill="white" />
          </StyledFlex>
        </SidebarFooterLogoutButton>
      </SidebarFooterContainer>
    </SidebarContainer>
  );
};

export default SideBar;
