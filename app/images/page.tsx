"use client";
import React, { useEffect } from "react";
import { useAuth } from "../authContext";
function page() {
  const { userLogout } = useAuth();
  return (
    <div>
      <button onClick={async () => await userLogout()}>Logout</button>
    </div>
  );
}

export default page;
