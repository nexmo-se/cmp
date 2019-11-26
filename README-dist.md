# xCMP
Campaign Management Portal

# Installation
Install required softwares: `nodejs`, `npm`

Unzip
```
unzip xcmp.zip
```

Get into the directory
```
cd xcmp
```

Install required dependencies: 
```
npm install
```

Setup `.env` according to `.env.example`


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

# Seeding the System Admin User (Initial User)
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

# Starting the Application
#### Web Server
The server can be started by running `./server`.

#### Blaster Process
The blaster process can be started by running `./blaster`

Note: You may want to run both the server and the blaster in the background using `pm2`.