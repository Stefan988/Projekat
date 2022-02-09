import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from 'express';
import * as session from 'express-session'
import UserRoute from './route/UserRoute'
import PostRoute from './route/PostRoute'
import PostCategoryRoute from './route/PostCategoryRoute'
import WeatherRoute from './route/WeatherRoute'
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path'
import * as https from 'https'
import * as fs from 'fs'
createConnection().then(async connection => {


    const app = express();
    const key = fs.readFileSync('./.ssh/key.pem', 'utf8');
    const cert = fs.readFileSync('./.ssh/cert.pem', 'utf8');

    app.use(cors({
        credentials: true,//protiv xss napada

        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        origin: 'http://localhost:3000'

    }));
    app.use(bodyParser.json());

    app.use(session({
        secret: 'keyboard cat',
        resave: false,

        saveUninitialized: false,
        cookie: {
            secure: true,
            maxAge: 1000 * 60 * 10,//10min
            httpOnly: true,
        }

    }))
    app.use('/weather', WeatherRoute);
    app.use('/user', UserRoute);
    app.use('/post', PostRoute);
    app.use('/postCategory', PostCategoryRoute);

    const server = https.createServer({
        key: key,
        cert: cert,
    }, app)
    server.listen(process.env.PORT || 5000, () => console.log('app is listening'))

}).catch(error => console.log(error));
