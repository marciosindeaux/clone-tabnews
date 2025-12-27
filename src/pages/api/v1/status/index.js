import HealthController from "src/backend/application/controller/HealthController.js";

const healthController = new HealthController();

function status(request, response) {
    healthController.applicationStatus(request, response);
}

export default status;
