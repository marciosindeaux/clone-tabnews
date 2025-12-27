import _database from "src/backend/resources/database/postgresql/config/database.js";

class HealthStatsRepository {
    constructor() {
        this.database = _database;
    }

    isDatabaseEnabled() {
        return process.env.DATABASE_ENABLED === "true";
    }

    async isDatabaseConnected() {
        const response = await this.database.query(`SELECT 1 + 1;`);
        return response ? true : false;
    }

    async getDatabaseVersion() {
        const response = await this.database.query(`
            SELECT split_part(version(), 'on', 1);
        `);
        return response.rows[0]["split_part"];
    }

    async getMaxConnections() {
        const response = await this.database.query(`SHOW max_connections;`);
        return response.rows[0]["max_connections"];
    }

    async getCurrentConnections() {
        const response = await this.database.query({
            text: `
                SELECT
                    COUNT(*)
                FROM pg_stat_activity psa
                WHERE psa.datname = $1;
            `,
            values: [process.env.POSTGRES_DB],
        });

        return response.rows[0]["count"];
    }
}

export default HealthStatsRepository;
