import database from "../../resources/database/postgresql/config/database.js";

class HealthController {
    constructor() {}

    async applicationStatus(req, resp) {
        const response = await database.query("SELECT 1 + 1;");
        const status = {
            application: "OK",
            database: {
                status: response ? "UP" : "DOWN",
            },
        };
        resp.status(200).json(status);
    }
}

export default HealthController;
