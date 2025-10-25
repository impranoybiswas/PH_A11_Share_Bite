import { useContext } from "react";
import { FirebaseContext } from "../providers/Context";

export default function useAuth() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useAuth must be used within a FirebaseAuth provider");
  }

  return context;
}
