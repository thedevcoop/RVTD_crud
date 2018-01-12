#!/bin/bash

export MYSQL_PWD='node_password'

database="rvtddb"

echo "Configuring database: $database"
export PATH=${PATH}:/usr/local/mysql/bin

mysql -unode_user -hlocalhost <<EOF
DROP DATABASE IF EXISTS rvtddb;
CREATE DATABASE rvtddb;
exit
EOF

mysql -unode_user -hlocalhost rvtddb < ./server/bin/sql/rvtddb.sql

echo "$database configured"
