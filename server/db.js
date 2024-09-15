import pg from "pg"

const db = new pg.Client({
    user:"postgres",
    password:"1234567890",
    database:"quadb",
    port:5432,
    host:"localhost"
});

export default db;