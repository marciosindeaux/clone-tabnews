import { Client } from "pg";
export default {
    query: executeQuery,
};

async function executeQuery(query) {
    if (process.env.DATABASE_ENABLED === "true") {
        const client = new Client({
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        });

        try {
            // return client.query(query).then(
            //     (queryResult) => {
            //         client.end();
            //         return queryResult;
            //     },
            //     (error) => {
            //         client.end();
            //         throw error;
            //     },
            // );
            await client.connect();
            const response = await client.query(query);
            await client.end();
            return response;
        } catch (error) {
            console.log("Database query error:", error);
        } finally {
            await client.end();
        }
    }
}
