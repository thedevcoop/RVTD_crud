# RVTD
## Getting started

### What is used

* Node JS
* React JS
* MySQL 5.7
* Bootstrap
* CLI (command line interface)
* Sequel Pro (GUI)
* Atom IDE (no major package dependencies)
* npm

### Git the code
* open your CLI (command line interface)
* `git clone <repo>`
  - `git clone git@github.com:joegreen2/RVTD_app.git`
  
### Good to know
* all server-side files are in the _**server**_ directory folder
* all client-side files are in the _**client**_ directory folder
* _**.gitignore**_ file is setup to ignore the _node_modules_ and _secrets_ directory from github
* when cloning this repo you will need to create your own _secrets directory with a `db_configuration.js`_ file inside and `npm install` node_modules on both Node server & React server, these step-by-step instructions are below

* **_to avoid issues, following these steps are imperative._**


# Node

### Create your 'secrets' directory and config file

* For the database you will need to add a secrets directory on the root level and inside that directory a `db_configuration.js` file

_**note:**_ **you should NOT be able to see the 'secrets' directory or the `db_configuration.js` file (it holds access to your database, and should be 'hidden' by the .gitignore file by default of this repo)**

* `cd <ToYourRootProjectDirectory>/`
* `mkdir secrets`
* `cd secrets/`
* `touch db_configuration.js`
* Open this file to add database credentials. (for atom IDE in CLI type `atom db_configuration.js`)

```javascript
module.exports = {
  user: 'user',
  host: 'localhost',
  database: 'database',
  password: 'password',
  port: 3306
};
```

* let's jump back into our project root
  - `cd ../` should get us back
  - go ahead and open this project in your IDE (code editor) `atom .` for atom IDE
  
## npm installs

#### Important! 
* _**BOTH**_ Node sever `package.json` file & React server `package.json` file need their own seperate `npm install` command

* **_run_** `cd client/` **_to get into the 'client' directory which contains the React server files, this directory requires a seperate npm install for its `package.json` file_**

* **_In the client directory folder_**
  - run `npm install` to get packages for this application
  
* **_run_** `cd ../` **_to get back to the root directory which contains the Node `package.json` file that also requires a seperate npm install_**
  
* **_In the project root_**
  - run `npm install` to get packages for this application

* **dependencies** 
  - _*express*_
  - _*body-parser*_
  - _*mysql*_
  - _*axios*_
  - _*react*_
  - _*react-dom*_
  - _*react-bootstrap*_
  - _*concurrently*_

  
* **dev dependencies** 
  - _*nodemon*_

### Node scripts (package.json)

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node ./server/bin/www",
    "server": "nodemon ./server/bin/www",
    "configure": "./server/bin/configuredb.sh",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
    },
```
#### what's happening in this script?

* Scripts are keywords used to reference a pre-written script of code, this allows you to run a longer script of code with one keyword ( you may be familiar with `npm start` or `npm run dev` )

#### Scripts to take note of:

 - **configure**: builds a seeded database for testing
 - **client**: is running the client server. _note*_ _*`--prefix client`*_ is telling this to run the _*`start`*_ script from within the client folder's `package.json` file 
 - **dev**: is using the npm _*concurrently*_ package to run the node server and then the react server both in one CLI tab


### Build database

* `server/bin/configuredb.sh` will contain a bash script to login and create database automatically
* `server/bin/sql/[file].sql` will contain table creation & insert into seed data
* **_in CLI window run_** `npm run configure`
* you should get 

```shell 
Configuring database: <databasename>
<databasename> configured
```
## Enough tutorial just let me see it!

#### I understand you've been patient enough...

* from the project root in the CLI run `npm run dev` this will start up the Node back-end server followed by the React front-end server which will launch your browser window and route it to `http://localhost:3000/` you will then have the full working application.
* **To see and understand more about this application I encourage you to keep scrolling down and read the "mysteries" of [cross-origin and proxy](https://github.com/joegreen2/RVTD_app#understanding-cross-origin--proxy-setting).**

## The Server (API)

* Starting the Node server 
  - `npm run server` in the CLI will start the server
  - `control + c` in the CLI will shutdown the server
  - If you want you can test out the back-end Node api by starting the server and using the api url calls below, once you're done go ahead and shutdown the server and start using the API built with Node using React.js

* General URL structure for Node.js

  - `http://localhost:5000/people/[YourRequestHere]`

* for all data you may choose

  - `http://localhost:5000/people/json`

* or select a specific user data with proper 'id # such as:

  - `http://localhost:5000/people/36`

## understanding cross-origin & proxy setting

* we are using a Node server `port: 5000` & a React server `port: 3000`...
* In order to get these two servers to work seamlessly together we will create a _*proxy*_ inside the _*client `package.json` file*_ 


```
	"proxy": {
	    "/people/*": {
	      "target": "http://localhost:5000"
	    }
	  },
```
 - This basically pre-appends `http://localhost:5000` to every route that has `/people/` in it, so `http://localhost:3000/people` will call `http://localhost:5000/people` behind the scenes


## The Client (Browser)
 
### using the browser application

* open browser and see all data at
 - client view: `http://localhost:3000` 
 
* In the browser you will have full CRUD (create, read, update, delete) functionality.
 - **CREATE:** clicking on _**create new user**_ button  will open a modal dialog window with a form field to enter values, then click _**save changes**_ to add data to database.
 
 - **READ:** by default `http://localhost3000` will display all data in database. for more specific details such as data `id` you can hit the API directly by typing the following in URL field `http://localhost3000/people/json` if you want to retrieve a specific `id` use `http://localhost3000/people/id`
 
 - **UPDATE:** to update an existing record of data, select the _**update**_ button that corresponds with the data you would like to edit, a modal dialog window will then appear with the current data populated in the fields by default. Change what needs to be updated then submit the changes.
 
 - **DELETE:** to delete an existing record of data, select the _**delete**_ button that corresponds with the data you would like to remove, a prompt window will appear and require you to respond with typing: _"*delete*"_ in the prompt field to ensure you would like to permanently remove data from the database. If _"*delete*"_ is not typed into the prompt field, the data will not be removed.
 
 
#### [léeme el archivo en español](https://github.com/joegreen2/RVTD_app/blob/master/README_Spanish.md)
