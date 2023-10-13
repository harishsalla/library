const mysql=require("mysql2")

let db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Harish@9959",
    database:"library"
}).promise()

module.exports=db;