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

# Concepts
In order to get a full understanding of the Campaign Management Portal, there are a few concepts that we need to explain and be clear of.

### API Key and Application
API Key refers to a record of Nexmo API Key added to the portal. A CMP API Key ID will be generated upon adding the Nexmo API Key. This ID will be used for referencing in other components such as Application and Channel.

Application refers to a record of a Nexmo Application added to the portal. A CMP Application ID will be generated uponb adding the Nexmo Application. This ID will be used for referencing in other components such as Channel.

Relationship

1 API Key owns N Applications

### Channel and Template (Parameter and Media)
Channel refers to a record of a messaging channel (whatsapp, facebook, viber or sms) that is linked to an Application and/or API Key. Since there could be instances where multiple Nexmo API Key or multiple Nexmo Application are to be used in the same CMP instance, such as in the use case of having multiple Whatsapp Business Account with different LVNs.

Template refers to a predetermined message body template with paramaters that can be filled with values. A sample of the template body is as follow:

```
Thank you for shopping with {{1}}. Your purchase is completed and will be delivered to you at {{2}}.
```

`{{1}}` and `{{2}}` can be replaced with a proper value customized to your messaging needs.

On top of template body parameters, certain channels such as Whatsapp, Facebook and Viber are capable of sending media. The supported media are as follow

- None - no header, just pure body text with parameter: `SMS`, `Whatsapp`, `Facebook`, `Viber`
- Text - a line of text header (bold): `Whatsapp`
- Image: `Whatsapp`, `Facebook`, `Viber`
- Audio: `Whatsapp`, `Facebook`
- Video: `Whatsapp`. `Facebook`
- File: `Whatsapp`, `Facebook`
- Location: `Whatsapp`
- Viber Template: `Viber`

##### Viber Template
A viber template is a special type exclusive to the Viber platform. It consist of an image, body text and a button with action URL.

The display text of the button is specified by the `caption` field. See [Media](src/router/cmpmedia) for more details. Upon clicking the button, Viber will launch the browser navigating to the `actionUrl` provided.

### Campaign and Records
Campaign refers to a record of a full message blasting campaign. A campaign will be using the same Channel and the same Template for all records in the campaign.

The campaign can be configured to have active hours (e.g. 8am to 6pm) so as not to send messages after working hours. It is also capable of configuring whether to send during weekends.

Record refers to a record of a to-be recipient within the campaign. While all records share the same template and channel, each record may have different parameter values and media values so as to have a personalized message and content to the recipient.

# Uploading Campaign Records using CSV
Due to the complexity and range of features available for each of the messaging channels, the CSV format and structure will have to be different.

For example, the CSV format for a template that contains an image will need to have the url to the image as compared to the CSV format for a plaintext template.

Therefore, the uploading of CSV is split into two parts:
1. Creating metadata for the CSV
2. Uploading the actual CSV

During the metadata creation process, the structure of the CSV is made known to the portal so that when it is trying to parse the actual CSV, the columns can be parsed and inserted to the right table in the database.

See **Create CSV Metadata** of [Record](src/router/cmprecord) for more details.

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
