import HealthStatsRepository from "src/backend/resources/database/postgresql/repositories/HealthStatsRepository.js";

class HealthcheckService {
    constructor() {
        this.healthRepository = new HealthStatsRepository();
    }

    async generateHealthStatus() {
        const response = {
            application: "OK",
            updated_at: new Date().toISOString(),
            dependencies: {
                database: await this._getDatabaseHealthData(),
            },
        };
        return response;
    }

    async _getDatabaseHealthData() {
        const response = {};
        const isDatabaseEnabled = this.healthRepository.isDatabaseEnabled();

        response.enabled = isDatabaseEnabled;
        if (!isDatabaseEnabled) {
            return response;
        }

        const isDatabaseConnected =
            await this.healthRepository.isDatabaseConnected();

        response.connected = isDatabaseConnected;
        if (!isDatabaseConnected) {
            return response;
        }

        return {
            ...response,
            version: await this.healthRepository.getDatabaseVersion(),
            max_connections: await this.healthRepository.getMaxConnections(),
            current_connections:
                await this.healthRepository.getCurrentConnections(),
        };
    }
}

export default HealthcheckService;
