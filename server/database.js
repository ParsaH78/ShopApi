import mysql from "mysql"

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password: "7812",
  database:"ecommerce"
});