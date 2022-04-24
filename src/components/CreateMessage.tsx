import { Box, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../fb";
import { User } from "../models/user";

interface Form {
  message: string;
}

export default function CreateMessage({ author }: { author: User }) {
  const [isLoading, setLoading] = useState(false);
  const [formState, setFormState] = useState<Form>({
    message: "",
  });
  /**
   * メッセージを作成
   */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    (async () => {
      setLoading(true);
      try {
        await addDoc(collection(db, "messages"), {
          text: formState.message,
          createdAt: serverTimestamp(),
          author,
        });
        setFormState({
          message: "",
        });
      } catch (err) {
        console.error();
      } finally {
        setLoading(false);
      }
    })();
  }
  /**
   * フォームの状態を更新する
   */
  function handleChangeText(e: ChangeEvent<HTMLInputElement>) {
    setFormState({
      message: e.currentTarget.value,
    });
  }
  // 何かが入力されている時に送信可能にする
  const canSubmit = formState.message.length > 0;
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "white",
      }}
    >
      <form
        style={{
          display: "flex",
          padding: "1rem",
          borderTop: "1px solid #ccc",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          required
          type="text"
          label="メッセージ"
          fullWidth
          value={formState.message}
          disabled={isLoading}
          onChange={handleChangeText}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isLoading}
          disabled={!canSubmit}
          sx={{ flexShrink: 0, marginLeft: "1rem" }}
        >
          メッセージを送信
        </LoadingButton>
      </form>
    </Box>
  );
}
