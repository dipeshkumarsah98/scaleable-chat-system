"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

export default function Page(): JSX.Element {
  const { sendMessage, message: messages } = useSocket();

  const [message, setMessage] = useState("");
  return (
    <div className={classes["container"]}>
      <div className={classes["heading"]}>
        <h1>All messages will be here</h1>
      </div>
      <div>
        {messages.map((msg) => (
          <li key={msg} className={classes["message"]}>
            {msg}
          </li>
        ))}
      </div>
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          className={classes["chat-input"]}
          placeholder="Your message.."
          type="text"
          name="message"
          id="message"
        />
        <button
          className={classes["button"]}
          onClick={() => sendMessage(message)}
        >
          Send
        </button>
      </div>
    </div>
  );
}
