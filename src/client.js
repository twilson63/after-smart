import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ensureReady, After } from "@jaredpalmer/after";
import routes from "./routes";
import { Provider } from "redux-bundler-react";
import getStore from "./bundles";

ensureReady(routes).then(data =>
  hydrate(
    <Provider store={getStore()}>
      <BrowserRouter>
        <After data={data} routes={routes} />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  )
);

if (module.hot) {
  module.hot.accept();
}
