import mysql from 'mysql2';

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '025044',
    database: 'community',
};

const connection = mysql.createConnection(options);

async function sendQuery(sql, values = []) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}

export {connection,sendQuery};