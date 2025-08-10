import React, { useEffect } from 'react'
import { useLocation } from 'react-router';

export default function usePageTitle() {
    const location = useLocation();

    useEffect(() => {
      const path = location.pathname;
  
      let site = "Share Bite";
  
      let title = "Page Not Found | " + site;
  
      if (path === "/") title = site;
      else if (path === "/about") title = "About | " + site;
      else if (path === "/dashboard/my-profile") title = "Profile | " + site;
      else if (path === "/signin") title = "Sign In | " + site;
      else if (path === "/register") title = "Register | " + site;
      else if (path === "/terms") title = "Terms | " + site;
      else if (path === "/available-foods") title = "Available Foods | " + site;
      else if (path === "/dashboard") title = "Dashboard | " + site;
      else if (path === "/dashboard/add-food") title = "Add Food | " + site;
      else if (path === "/dashboard/my-foods") title = "My Foods | " + site;
      else if (path === "/dashboard/my-requests") title = "My Requests | " + site;
      else if (path.startsWith("/food/")) title = "Food Details | " + site;
  
      document.title = title;
    }, [location]);
}
