"use client";
import { useEffect } from "react";

export default function ErrorSuppressor() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const originalError = console.error;
      console.error = (...args) => {
        if (
          typeof args[0] === "string" &&
          args[0].includes("Realtime got disconnected")
        ) {
          // Suppress harmless Appwrite realtime reconnect logs
          return;
        }
        originalError(...args);
      };
    }
  }, []);

  return null;
}
