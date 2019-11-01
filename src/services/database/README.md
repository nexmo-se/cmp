# Using the Database Service
The database service is created to facilitate the use of database for each of the demos. Each demo will have its own database, so there is a need to separate out the connection to database on a per-demo basis, using the same method.

## Loading the Database Handle
To get the Database Handle/Client, simply call `container.databaseService.getClient(userNexmo, demoName);`

`userNexmo` is the instance that you have gotten from `utils.js` or `container.utils`. This will be the data inside your `nexmo.ini` if it is a local server, and real data if it is on the live server.

`demoName` is the name of your demo, case-sensitive. The database name for the demo should be in the format of `demo{demoName}`, see [Database (Schema)](./README.md#database-schema).

Once connection to the database is established, the following will be returned.
```
{
  sequelize: Sequelize Client,
  models: Array of Demo Models,
};
```

Note: Only models from the same demo will be available in the models array.

## Using the Database Handle
The database is using the Sequelize ORM. For further usage, please refer to the official Sequelize documentation: https://sequelize.org/v5/


Code example:

``` javascript

const clientDB = databaseService.getClient(userNexmo, 'WhatsApp');
const { users } = clientDB.models;
const usersList = await users.findAll({where: {firstName: 'Enrico'}});
const user = await users.findOne({where: {firstName: 'Enrico'}});
const usersCount = await users.count({where: {firstName: 'Enrico'}});

const saverUser = users.build({id: userId, active: 1});
await toSave.save();

```

# Rules on using Database
The following rule should apply when using the database within demos. Each demo should have its own database, filled with tables required for the demo.

## Database (Schema)
The naming convention for the demo databases should be demo{name}

**IMPORTANT**: each new database must have prefix demo on his name. For example, if you are working on a demo called `spaghetti`, you should call your database `demoSpaghetti`.

## Table and Fields
Tables and the Fields within the tables in the databases should follow the under_score naming convention.

For example:

Table: `phone_number`

Table Field: `currency_code`

The tables should be segregatable to show only data belongs to the current NIDS user. This means that no demo data will be shared between each NIDS user.

A simple way to do this is to include a `user : String` field in each of the table to mark with the NIDS user. Any CRUD and List done on the table **MUST** specify the current user id. 

# Using a Local Database
Add database connection credentials to `nexmo.ini`:

`dbhost`: Host of the Database, e.g. localhost:3306

`dbuser`: Username of the Database

`dbpassword`: Password of the Database


# Deploying to Real Database
Contact the Customer Solutions Engineer on the `#nids` Slack channel to request for a deployment. The CSE team will review the database structure and clone it into the Live Database which after that, it will be accessible from the live backend.

Once the backend is running on the live server, it will use the real NIDS configuration and no longer be using the `nexmo.ini` configurations

# Generating Models
### 1. Generate from Database
To generate models for database, from the root directory of the project, run the following command.
```
sequelize-auto -h {dbHost} -d demo{demoName} -u ${dbUsername} -x '{dbPassword}' -p 3306 --dialect mysql -o "src/services/database/temp/demo{demoName}"
```

Note: you will need to have sequelize-auto installed on your machine. To install (globally on your machine), run the following `npm install -g sequelize` and `npm install -g mysql`.

### 2. Move to Models Directory
Once the models are generated, copy the demo-specific models directory from `temp` into the `models` directory.

Your `models` directory structure should look similar to this:

```
models/demo{demoName}
models/demo{demoName}/table1.js
models/demo{demoName}/table2.js
```

### 3. Modify Model to include support for Association
Sequelize-auto will use a very old syntax, so modifications to the models will need to be made.

After generating the models using sequelize-auto, modify your each of your model files following the example:

[User Example](./models/example/user.js)

Take note of the `associate` method inside the `classMethods` attribute of `options`. This is where the associations should be placed. Upon initialization of the model, this method will be called to configure the association.

### 4. Add Association
In each of your table model, add the associations between the tables with reference to the Sequelize documentation for associations:

https://sequelize.org/v5/manual/associations.html

### 5. Add to your demo model root (database/models/demoExample/index.js)
Create an `index.js` file in your demo model root directory with the reference to the following:

```
export default () => {
  const getModels = (sequelizeClient) => {
    const models = {};
    models.Example = sequelizeClient.import('./user');
    return models;
  };

  return {
    getModels,
  };
};
```

Modify the content of the `models` object to reflect the models of your demo.

### 6. Add to modelGenerator (database/models/index.js)
In `database/models/index.js`, add the following lines:

1. Add an import to your models `index.js` created previously.

2. Add the models into the `modelGenerator` object by following the example.

