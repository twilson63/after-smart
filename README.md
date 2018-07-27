# Smart App Container Example

This example takes the auth process of launching a smart app and adds it to a SSR Container, so that the auth process can happen securely on the server and pass the access token to the client, so the client can register and make calls against the fhir server.

## Usage

```
npm run dev
```

## Docs

src/index.js - main file
src/server.js - server code
src/client.js - client side code
src/routes.js - react router routes
src/Home.js - example home page component
src/About.js - example about component

This example uses ReduxBundler for redux, but a redux implementation should work as well.

The main key is to connect to the redux store with a connector and save the access_token to the redux store so you can use it in all of the fetch calls to the fhir server.
