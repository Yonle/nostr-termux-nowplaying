import "websocket-polyfill";
import { readFileSync } from "fs";
import { getEventHash, getSignature, getPublicKey, SimplePool, nip19 } from "nostr-tools";
import { exec } from "child_process";

let artist = null;
let title = null;

let privkey = readFileSync("privatekey.txt", "utf8").split("\n")[0];
if (privkey.startsWith("nsec")) privkey = nip19.decode(privkey).data;

const pubkey = getPublicKey(privkey);
const relays = readFileSync("relays.txt", "utf8").split("\n").filter(i => i?.startsWith("ws"));
const applist = readFileSync("app_names.txt", "utf8").split("\n").filter(i => !i.startsWith("#"));

const pool = new SimplePool();
function u(r) {
  let j = JSON.parse(r).filter(i => applist.includes(i.packageName))[0];
  if (!j) j = { content: "", title: "" };
  if (artist == j.content && title == j.title) return;
  if (!j.title) console.log("Waiting for player notification....");
  artist = j.content;
  title = j.title;

  let event = {
    "pubkey": pubkey,
    "created_at": Math.floor(Date.now() / 1000),
    "kind": 30315,
    "tags": [
      [
        "d",
        "music"
      ],
      [
        "r",
        "spotify:search:" + encodeURIComponent(`${title} - ${artist}`)
      ]
    ],
    "content": title ? `${title} - ${artist}` : ""
  };

  event.id = getEventHash(event);
  event.sig = getSignature(event, privkey);

  console.log(`♫ ${title} - ${artist}`);
  pool.publish(relays, event);
}

function g() {
  exec("termux-notification-list", (err, b) => {
    g();
    if (err) return;
    u(b);
  });
}

g();

process.on('unhandledRejection', _ => null);
