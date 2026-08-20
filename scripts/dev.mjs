import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = 3847;

const files = {
  "/": path.join(root, "skin.css"),
  "/skin.css": path.join(root, "skin.css"),
  "/overlay.js": path.join(root, "scripts", "overlay-client.js"),
};

const mime = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

http
  .createServer((req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    const file = files[url.pathname];
    if (!file) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, {
      "Content-Type": mime[path.extname(file)] ?? "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Dev overlay http://127.0.0.1:${port}/skin.css`);
    console.log(
      "Jellyfin tab: fetch('http://127.0.0.1:3847/overlay.js').then(r=>r.text()).then(eval)",
    );
  });
