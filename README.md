## Online Library Management

This is an Online Library management application.

### Tech stack used in this project are:

1. [Next.js](https://nextjs.org/)
2. React Js
3. SCSS
4. SQLite
5. Jest
6. React Testing Library
7. Yarn

### Steps for project setup in local:

1. Navigate to the 'hexad' dir.
2. Inside the 'hexad' folder run the following commands to install the package dependencies or node_modules.

```bash
yarn install
```

3. Then to run the project on a local server execute the following command

```bash
yarn dev
```

> NOTE: Whenever the dev setup is started a fresh copy of data overwrites previous copy in the db using the migration script.

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

5. Run the following command to execute all the tests written in the project.

```bash
yarn test
```

Incase want to update the tests run following command

```bash
yarn test -u
```

## About the project structure:

```
1. Among the directories inside 'hexad' folder there are 3 main directories where the code resides:
   1.1. 'Backend' dir where all the backend related codes are present like Repositories, Db and common configs.
        1.1.1. Inside 'Backend/configs/database' The main DAO or db connection file is present.
        1.1.2. 'Backend/pagesTests' dir contains the test files for API routes present in 'Pages/api' dir. Its placed seperately as in NextJs project its not recommended to keep the test folders inside the 'Pages' dir coz it'll act as a route in the application.
        1.1.3. 'Backend/configs/repositories' dir contains different repository files which helps to fetch data from db.
   1.2. 'Client' dir where all the front-end React components are present.
        1.2.1. 'Client/components' dir has the reusable component like button, slider, bookCard etc along with their snapshots and tests within the folders.
        1.2.2. 'Client/modules' dir has folders like Home and Listing. These modules are made up of the components from the Component dir. And these individual modules gets imported in the 'Page' routes present in 'Page' dir which gets served as standalone pages on client.
   1.3. 'Migrations' dir contains the sql migration file that on execution dumps the initial set of data in DB which is required to run the application.
   1.4. 'Pages' dir is the main dir which is the entry point for both client and server api requests.
        1.4.1 'Pages/api' dir has all the dirs for each backend API endpoints like getBookList, borrowbooks etc.
        1.4.2 The files inside 'Pages' dir like index and listing are the routes served when client requests for a page.
```

### Other related infos:

1. To validate the No book available case in the library, please comment out and save the line nos. (16-23) in 'migrations/001-initialDb.sql' and then start/restart the local server (yarn dev). This process dumps no Book related data in DB and the story could be validated.
   > `Remember to uncomment it back and re-run the server (yarn dev) to proceed futher with validating other cases.`
2. BEM conventions used for writing scss/css.
3. Application is Desktop, Tablet and Mobile compatible also.
