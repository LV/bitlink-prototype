#!/bin/bash
psql postgres<<EOF
DROP DATABASE bitlinkdb;
CREATE DATABASE bitlinkdb;
\q
EOF
psql dbadmin -h 127.0.0.1 -d bitlinkdb -f schema.sql
npm install
node index.js
# type `sudo chmod 755 resetAndRunDb.sh` in terminal before launching this script
