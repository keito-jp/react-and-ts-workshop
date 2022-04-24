import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRequired from "./pages/AuthRequired";
import SignIn from "./pages/SignIn";

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<AuthRequired />}>
          <Route index element={<>You have logged in!</>} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
