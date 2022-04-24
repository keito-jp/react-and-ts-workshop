import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { authUI } from "../fb";

export default function SignIn() {
  useEffect(() => {
    authUI.start("#firebaseui-auth-sign-in-container", {
      signInOptions: [
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true,
        },
        GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: "/",
    });
  }, []);
  return <div id="firebaseui-auth-sign-in-container" />;
}
