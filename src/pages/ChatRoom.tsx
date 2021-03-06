import { Stack, List, ListItem, ListItemText, Avatar, ListItemAvatar, Typography } from "@mui/material";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import CreateMessage from "../components/CreateMessage";
import { useUser } from "../contexts/UserContext";
import { db } from "../fb";
import { Message } from "../models/message";

interface MessageDict {
  [id: string]: Message | null;
}

export default function ChatRoom() {
  // IDをキーとしたメッセージの辞書
  const [messageDict, setMessageDict] = useState<MessageDict>({});
  // メッセージの順序を保存しておくための配列
  const [ids, setIds] = useState<string[]>([]);
  // messageDictが新しくなったら一番下までスクロール
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (endRef.current == null) {
      return;
    }
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messageDict]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, `messages`), orderBy("createdAt", "asc")),
      (querySnapshot) => {
        const newEntities: MessageDict = {};
        const newIds: string[] = [];
        querySnapshot.docChanges().forEach((change) => {
          switch(change.type) {
            case "added": {
              const data = change.doc.data();
              newEntities[change.doc.id] = {
                id: change.doc.id,
                text: data.text,
                createdAt: data.createdAt?.toDate() ?? new Date(),
                author: data.author,
              };
              newIds.push(change.doc.id);
              break;
            }
            case "modified": {
              const data = change.doc.data();
              newEntities[change.doc.id] = {
                id: change.doc.id,
                text: data.text,
                createdAt: data.createdAt?.toDate() ?? new Date(),
                author: data.author,
              };
              break;
            }
            default:
              throw new Error(`unexpected change type: ${change.type}`);
          }
        });
        setMessageDict((prev) => ({
          ...prev,
          ...newEntities,
        }));
        setIds((prev) => [...prev, ...newIds]);
      }
    );
    return () => unsubscribe();
  }, []);
  const user = useUser();
  if (user == null) {
    return null;
  }
  return (
    <Stack>
      <List sx={{ paddingBottom: "100px" }}>
        {ids.map((id) => {
          const message = messageDict[id];
          if (message == null) {
            return null;
          }
          return (
            <ListItem key={message.id} divider>
              <ListItemAvatar>
                <Avatar
                  alt={message.author.displayName}
                  src={message.author.photoURL ?? undefined}
                />
              </ListItemAvatar>
              <ListItemText
                primary={message.text}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {message.author.displayName}
                    </Typography>
                    <span> {message.createdAt.toLocaleString()}</span>
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
      <div ref={endRef} />
      <CreateMessage author={user} />
    </Stack>
  );
}
