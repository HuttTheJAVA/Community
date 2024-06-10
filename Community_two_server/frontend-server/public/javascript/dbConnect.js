import mysql from 'mysql2';

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '025044',
    database: 'community'
};

const connection = mysql.createConnection(options);

function sendQuery(sql, values = []) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export default {connection,sendQuery};