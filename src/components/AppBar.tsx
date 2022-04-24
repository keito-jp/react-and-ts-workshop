import { AppBar as MuiAppBar, Button, Toolbar } from "@mui/material";
import { auth } from "../fb";

export default function AppBar() {
  async function signOut() {
    await auth.signOut();
  }
  return (
    <MuiAppBar position="sticky">
      <Toolbar sx={{ flexDirection: "row-reverse" }}>
        <Button sx={{ color: "white" }} onClick={signOut}>
          ログアウト
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
}
