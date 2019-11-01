# VCMP
Vonage Campaign Management Portal

# Installation
Install required softwares: `nodejs`, `npm`, `git`

Clone this repo:
```
$ git clone git@github.com:nexmo-se/vcmp.git
```
Install required dependencies: 
```
npm install
```

Setup `.env` according to `.env.example` (For Local Development Use only)

Build production server (babel transpile)
```
npm run build
```

# Starting the Server
#### Production
The built production server can be started by running `npm start`.

#### Development
The development version of the server that uses `babel-node` can be started by running `npm run dev`.
This server will run with nodemon, meaning that any changes to the server code will trigger a restart automatically on save.
