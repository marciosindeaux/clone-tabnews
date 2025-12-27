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
        const isDatabaseEnabled = this.healthRepository.isDatabaseEnabled();
        if (!isDatabaseEnabled) {
            return {
                enabled: false,
            };
        }

        return {
            enabled: isDatabaseEnabled,
            connected: await this.healthRepository.isDatabaseConnected(),
            version: await this.healthRepository.getDatabaseVersion(),
            max_connections: await this.healthRepository.getMaxConnections(),
            current_connections:
                await this.healthRepository.getCurrentConnections(),
        };
    }
}

export default HealthcheckService;
