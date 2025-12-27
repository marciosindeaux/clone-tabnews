import HealthController from "src/backend/application/controller/HealthController.js";

const healthController = new HealthController();

async function healthcheck(request, response) {
    await healthController.applicationStatus(request, response);
}

export default healthcheck;
