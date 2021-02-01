# xCMP
Campaign Management Portal

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

# Initializing Database
To initialize the database to initial state:

1. Ensure the database configuration in the `.env` is correct.

2. Migrate the database to the latest state
```
npm run migrate
```

3. Seed initial data
Warning: This step should only be run once (during initial installation). If you are doing an update, follow the update guide to manually seed the database with data previously not seeded yet, if available.
```
npm run seed
```

4. Database is now seeded and ready for use.

# System Admin User (Initial User)
On initializing the database via seeding, a user (`sysadmin`) with the following roles is created:

- `user`
- `admin`
- `superadmin`

This user is the first and root level user, and should have permission to access all APIs. 

The initial login credentials are as follow:

- username: sysadmin
- password: password123

Please change the password of this user as soon as possible.

Additional admin accounts are to be created for regular use. 

Do NOT use the `sysadmin` account for regular usage of the application.

# Starting the Server
#### Production
The built production server can be started by running `npm start`.

#### Development
The development version of the server that uses `babel-node` can be started by running `npm run dev`.
This server will run with nodemon, meaning that any changes to the server code will trigger a restart automatically on save.

# Starting the Blaster
This will start a node process that reads for pending records (as per active constraints) and blasting them according to API Key/Application TPS.

#### Production
The built production blaster can be started by running `npm run blast`. 

#### Development 
The development version of the blaster that uses `babel-node` can be started by running `npm run devBlast`.


# Starting the Picker
The picker is a process that picks up CSV files from a location on the server and inserts them into the database as a record. This is especially useful, allowing file-based record insertion. An additional process to monitor and download CSV from a remote location (such as FTP) can be used in conjunction to this process.

#### Production
The build production picker can be started by running `npm run picker`.

#### Development
The development version of the picker that uses `babel-node` can be started by running `npm run devPicker`.

# API Documentations
[Authentication](src/router/auth)
[User](src/router/user)
[Webhook](src/router/webhook)
[API Key](src/router/cmpapikey)
[Application](src/router/cmpapplication)
[Campaign](src/router/cmpcampaign)
[Channel](src/router/cmpchannel)
[Template](src/router/cmptemplate)
[Media](src/router/cmpmedia)
[Parameter](src/router/cmpparameter)
[Record](src/router/cmprecord)
[Report](src/router/cmpreport)
[Blaster](src/router/blaster)
