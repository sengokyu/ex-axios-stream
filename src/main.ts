import axios from "axios";
import { randomUUID } from "crypto";
import { createWriteStream } from "fs";
import path from "path";
import { from } from "rxjs";
import { Stream } from "stream";

const url =
  "https://raw.githubusercontent.com/sengokyu/ex-axios-stream/main/bigfile/japanese-constitution.pdf";
const dstPath = path.join(__dirname, randomUUID()) + ".pdf";

from(axios.get<Stream>(url, { responseType: "stream" })).subscribe((resp) => {
  const dst = createWriteStream(dstPath, "binary");
  resp.data.pipe(dst);
  console.log(`${dstPath} downloaded.`);
});
