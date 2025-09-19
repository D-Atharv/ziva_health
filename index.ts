import express from "express";
const app = express();

app.get("/", (_, resp) => {
  resp.json({
    message: "hello world",
  });
});

app.listen(3000, () => {
  console.log("port is listening 3000");
});
