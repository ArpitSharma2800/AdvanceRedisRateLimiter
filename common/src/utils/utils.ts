import { INestApplication } from "@nestjs/common";

export const applyCors = (app: INestApplication) => {
    app.enableCors();
};
