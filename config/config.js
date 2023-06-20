import "dotenv/config";

const serverPort = process.env.SERVER_PORT;
const database = process.env.DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dialect = process.env.DB_DIALECT;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const secret = process.env.SECRET_KEY;

export { serverPort, database, username, password, dialect, host, port, secret };