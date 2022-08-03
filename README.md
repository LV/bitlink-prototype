<p align="center">
  <img width="300" height="300" src="https://user-images.githubusercontent.com/12447718/172276783-9249f234-2e5d-4874-aab6-42b86078e324.png">
  <p align="center"><em>Bitlink - A payments processor that allows consumers to pay with Bitcoin while vendors receive USD.</em></p>
</p>

# Getting Started with Frontend

1. `cd frontend`
2. `npm install`
3. `npm start`


# Getting Started with Backend
1. `brew install postgresql`
2. `brew services start postgresql`
3. `psql postgres`
4. `CREATE ROLE dbadmin WITH LOGIN PASSWORD 'bitlink304';`
5. `ALTER ROLE dbadmin WITH SUPERUSER;`
6. `CREATE DATABASE bitlinkdb;`
7. `\q`
8. `cd backend`
9. `psql dbadmin -h 127.0.0.1 -d bitlinkdb -f schema.sql`
10. `npm install`
11. `node index.js`
