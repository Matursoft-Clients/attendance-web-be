"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'storage'), {
        prefix: '/storage',
    });
    const optionsCors = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true
    };
    app.enableCors(optionsCors);
    await app.listen(8002);
    const options = new swagger_1.DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('API documentation for your Nest.js application')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
}
bootstrap();
//# sourceMappingURL=main.js.map