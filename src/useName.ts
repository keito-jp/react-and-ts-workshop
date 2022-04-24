import { useState, useEffect } from "react";

export function useName() {
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.github.com/users/keito-jp");
      const json = await res.json();
      console.log(json);
      setName(json.name);
    })();
  }, []);
  return { name };
}
