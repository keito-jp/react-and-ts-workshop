import { CircularProgress } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import { auth } from "../fb";
import { User } from "../models/user";

export default function RequiredLogin() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // ログイン状態を監視
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser({
          uid: user.uid,
          displayName: user.displayName!,
          photoURL: user.photoURL,
        });
      } else {
        // ログインしていなかったらログインページにリダイレクト
        navigate("/sign-in", { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  return (
    <>
      <AppBar />
      {user == null ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
