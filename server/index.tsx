import express, { Request, Response } from "express";
import { resolve } from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "../frontend/components/App";
import { log } from "./log";

const app = express();

app.use("/", express.static(resolve(process.cwd(), "public")));
app.use("/static", express.static(resolve(process.cwd(), "dist")));

app.get("*", (req: Request, res: Response, next: any) => {
    const markup = renderToString(
        <React.StrictMode>
            <StaticRouter location={req.url}>
                <App />
            </StaticRouter>
        </React.StrictMode>
    )
  
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with React Router</title>
          <link href="/static/css/application.css" rel="stylesheet">
          <link rel="shortcut icon" href="/favicon.png">
        </head>
  
        <body>
          <div id="app">${markup}</div>
          <script src="/static/bundle.js" defer></script>
        </body>
      </html>
    `)
})

app.listen(process.env.PORT || 3000, () => {
    log.info(`Started server at http://127.0.0.1:${process.env.PORT || 3000}`);
})