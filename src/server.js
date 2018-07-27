import express from "express";
import { render } from "@jaredpalmer/after";
import routes from "./routes";
const session = require("express-session");

const smart = require("@twilson63/smart-express/lib/express")({
  scope: "openid profile offline_access",
  redirectUri: "/",
  clientId: "31488081-2a0f-467d-8888-ef53a3d5fe24"
});

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .use(
    session({
      secret: "my secret",
      resave: false,
      saveUninitialized: false
    })
  )
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/launch", smart.authorize, (req, res) => {
    res.send("You should not see this message");
  })
  .get("/", smart.completeAuth, async (req, res) => {
    const client = await smart.getClient(req);
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        // Anything else you add here will be made available
        // within getInitialProps(ctx)
        // e.g a redux store...
        clientState: client.state,
        customThing: "thing"
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  })
  .get("/*", async (req, res) => {
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        // Anything else you add here will be made available
        // within getInitialProps(ctx)
        // e.g a redux store...
        customThing: "thing"
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
