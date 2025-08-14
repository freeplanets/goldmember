
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { Server } from "http";
import { AppModule } from "./app.module";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { eventContext } from "aws-serverless-express/middleware";
import { createServer, proxy, Response } from "aws-serverless-express";
import { Context, Handler } from "aws-lambda";
import { json, urlencoded } from "express";

let cachedServer:Server;

async function bootstrapServer():Promise<Server> {
    const expressApp = require('express')();
    const adapter = new ExpressAdapter(expressApp);
    console.log("check0");
    const app = await NestFactory.create(AppModule, adapter);
    console.log("check1");
    const crosOp: CorsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: false,
    }
    app.enableCors(crosOp);
    let options:any;
    if(process.env.IS_OFFLINE) {
        options = new DocumentBuilder()
        .setTitle('GoldMember')
        .setDescription('All Member Api')
        .setVersion('0.01')
        .addServer('/dev')
        .build()
    } else {
        options = new DocumentBuilder()
        .setTitle('GoldMember')
        .setDescription('All Member Api')
        .setVersion('0.01')
        .addServer('/linkougolf/ks')
        .build()
    }
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('ks_api', app, document);
    app.use(eventContext());
    app.use(json({limit: '50mb'}));
    app.use(urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
    await app.init();
    return createServer(expressApp);
}

export const handler: Handler = async (event: any, context: Context): Promise<Response> => {
    if (!cachedServer) {
        cachedServer = await bootstrapServer();
    }
    // console.log(event);
    console.log('path:',event.requestContext.path,',','resourcePath:', event.requestContext.resourcePath, 'pathParameters:', event.pathParameters);
    const path = event.requestContext.path.replace('/linkougolf/ks', '');
    event.path = path;
    event.requestContext.path = path;
    //event.pathParameters =  { proxy: path };
    return proxy(cachedServer, event, context, 'PROMISE').promise;
}