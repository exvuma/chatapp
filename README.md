This is a basic chat app hosted on Heroku at

Using:

- Create React App 3.4.1
- Node 8.4
- socket.io

## To run the client (react app) server

```
yarn
yarn start:client
```

Then start server

```
yarn
yarn start
```

## To build

Same as above but with `yarn build`

## To deploy:

CI is set up to deploy automatically on Heroku

TO test on your own Heroku account

- Set up a Heroku site
- Connect the Heroku site to your repo (e.g. https://github.com/exvuma/chatapp)
- Set config vars `REACT_APP_API_ENDPOINT` and `REACT_APP_API_HOST` in heroku config
