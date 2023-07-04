import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { NestjsFormDataModule } from "nestjs-form-data";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        NestjsFormDataModule
    ]
})

export class AuthModule { }
