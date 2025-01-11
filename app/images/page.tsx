"use client";
import React, { useEffect } from "react";
import { useAuth } from "../authContext";
function page() {
  const { userLogout } = useAuth();
  return <div></div>;
}

export default page;
