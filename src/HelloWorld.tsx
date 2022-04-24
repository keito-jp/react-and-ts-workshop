import { useState } from "react";
import { useName } from "./useName";

export default function HelloWorld({ message }: { message: string; }) {
  const [counter, count] = useState(0);
  const { name } = useName();
  return (
    <div>
      <div>Hello, {message} x {counter} by {name}</div>
      <button onClick={() => count((prev) => ++prev)}>Click!</button>
    </div>
  );
}
