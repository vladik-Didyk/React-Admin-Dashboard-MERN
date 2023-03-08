import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "components/NavBar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";

// Define a functional component called 'Layout'
const Layout = () => {
  // Use the 'useMediaQuery' hook to detect whether the screen is non-mobile
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  // Use the 'useState' hook to manage the state of whether the sidebar is open or not
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Use the 'useSelector' hook to get the 'userId' from the global state using Redux
  const userId = useSelector((state) => state.global.userId);

  // Use the 'useGetUserQuery' hook to fetch user data from the API
  const { data } = useGetUserQuery(userId);

  // Return a 'Box' component with the display property set to "flex" if the screen is non-mobile, or "block" if it is mobile. It also has a width and height set to 100%.
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {/* Render the 'Sidebar' component with the appropriate props, depending on the screen size and the state of the sidebar */}
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Render the 'NavBar' and 'Outlet' components with the appropriate props, depending on the state of the sidebar */}
      <Box flexGrow={1}>
        <NavBar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
