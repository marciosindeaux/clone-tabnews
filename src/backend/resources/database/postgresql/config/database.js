import { Client } from "pg";

export default {
    query: executeQuery,
};

async function executeQuery(query) {
    if (process.env.DATABASE_ENABLED === "true") {
        const client = await generateConnection();
        try {
            const response = await client.query(query);
            await client.end();
            return response;
        } catch (error) {
            console.log("Database query error:", error);
            throw error;
        } finally {
            await client.end();
        }
    }
}

async function generateConnection() {
    try {
        const client = new Client({
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            ssl: process.env.POSTGRES_SSL === "true",
        });
        await client.connect();
        return client;
    } catch (error) {
        console.log("Database connection error:", error);
        throw error;
    }
}
