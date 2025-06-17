"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next/client";

export function useUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const cookie = getCookie("user");
    if (cookie) {
      try {
        setUser(JSON.parse(decodeURIComponent(cookie)));
      } catch (e) {
        console.error("Error parsing user cookie", e);
      }
    }
  }, []);

  return user;
}
