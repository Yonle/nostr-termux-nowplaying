import "websocket-polyfill";
import { readFileSync } from "fs";
import { getEventHash, getSignature, validateEvent, verifySignature, getPublicKey, SimplePool, nip19 } from "nostr-tools";
import { exec } from "child_process";

let artist = null;
let title = null;
let socks = new Set();

let privkey = readFileSync("privatekey.txt", "utf8").split("\n")[0];
if (privkey.startsWith("nsec")) privkey = nip19.decode(privkey).data;
const pubkey = getPublicKey(privkey);
const relays = readFileSync("relays.txt", "utf8").split("\n").filter(i => i?.startsWith("ws"));

const pool = new SimplePool();
function u(r) {
  let j = JSON.parse(r).filter(i => i.id == 1001)[0];
  if (!j) j = { content: "", title: "" };
  if (artist == j.content && title == j.title) return;
  artist = j.content;
  title = j.title;

  let event = {
    "pubkey": pubkey,
    "created_at": Math.floor(Date.now() / 1000),
    "kind": 30315,
    "tags": [
      [
        "d",
        "general"
      ]
    ],
    "content": title ? `🎵${artist} - ${title}` : ""
  };

  event.id = getEventHash(event);
  event.sig = getSignature(event, privkey);

  console.log(`🎵${artist} - ${title}`);
  pool.publish(relays, event);
}

function g() {
  const execT = Date.now();
  exec("termux-notification-list", (err, b) => {
    g();
    if (err) return;
    u(b);
  });
}

g();

process.on('unhandledRejection', _ => null);
