const conn = require('../lib/db');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

function createUser(username, password, done) {
    const hash = bcrypt.hashSync(password, 10);
    const token = uuid();
    const sql = `INSERT INTO users (username, password, token)
    VALUES (?, ?, ?)`
    conn.query(sql, [username, hash, token], function (error, results, fields) {
        if (error) {
            let response = {
                status: "fail",
                message: "Credentials already exists.",
                token: ""
            }
            console.log('Error trying to create a duplicate user', error)
            done(false, response)
        }
        else if (!error) {
            let response = {
                status: "success",
                message: 'User successfully registered',
                token: token
            }
            done(true, response)
        }
    })
}

function login(username, password, done) {
    const sql = `
    SELECT password FROM users
    WHERE username = ?
  `
    conn.query(sql, [username], function (err, results, fields) {
        if (err || results.length === 0) {
            console.log("Error getting user", err)
            let temp = {
                status: "fail",
                message: "Invalid credentials.",
                token: ""
            }
            done(false,temp);
        }
        else {
            const hashedPassword = results[0].password.toString();
            bcrypt.compare(password, hashedPassword, function (error, result) {
                if (err || !result) {
                    let temp = {
                        status: "fail",
                        message: "Invalid credentials.",
                        token: ""
                    }
                    done(false,temp);
                }
                else if (result) {
                    const token = uuid();
                    const tokenUpdateSQL = `UPDATE users SET token = ? WHERE username = ?`
                    conn.query(tokenUpdateSQL, [token, username], function (err, results, fields) {
                        if (err || results.changedRows === 0) {
                            console.log('Error updating user token', err)
                            let temp = {
                                status: "fail",
                                message: "Error updating token.",
                                token: ""
                            }
                            done(false,temp);
                        } else {
                            let temp = {
                                status: "success",
                                message: "Valid credentials.",
                                token: token
                            }
                            done(true,temp)
                        }
                    })
                }
            })
        }
    })
}
function verifyToken(token, done) {
    const sql = `SELECT * FROM users WHERE token = ?`
    conn.query(sql, [token], function (err, results, fields) {
        let data = {
            message: "You are not authorized to view this information"
        }
        if (err) {
            console.log('Error verifying token', err);
            done(false, data)
        }
        if (results.length > 0) {
            done(true, results[0])
        } else {
            done(false, data)
        }
    })
}
module.exports = {
    createUser,
    login,
    verifyToken
}