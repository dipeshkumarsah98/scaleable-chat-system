import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
  host: "redis-12bb13f6-lasthacker692-d9d7.a.aivencloud.com",
  name: "default",
  port: 23316,
  password: "AVNS_e3RcZmeiunDjNo5EedG",
});
const sub = new Redis({
  host: "redis-12bb13f6-lasthacker692-d9d7.a.aivencloud.com",
  name: "default",
  port: 23316,
  password: "AVNS_e3RcZmeiunDjNo5EedG",
});

class SocketService {
  private _io: Server;
  constructor() {
    console.log("Init Socket Service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGE");
  }

  public initListeners() {
    const io = this.io;
    console.log("Init Socket Listeners...");
    io.on("connect", (socket) => {
      console.log(`New Socket Connection:: `, socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New Message Rec.", message);
        // publish this message
        await pub.publish("MESSAGE", JSON.stringify(message));
      });
    });
    sub.on("message", (channel, msg) => {
      if (channel === "MESSAGE") {
        io.emit("message", msg);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
