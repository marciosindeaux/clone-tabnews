import HealthcheckService from "../../domain/services/healthcheck/HealthcheckService";

class HealthController {
    constructor() {
        this.healthcheckService = new HealthcheckService();
    }

    async applicationStatus(req, resp) {
        const healthResponse =
            await this.healthcheckService.generateHealthStatus();
        resp.status(200).json(healthResponse);
    }
}

export default HealthController;
