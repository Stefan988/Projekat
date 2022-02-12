import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import * as fs from 'fs';
import * as https from 'https';
import "reflect-metadata";
import { createConnection } from "typeorm";
import PostCategoryRoute from './route/PostCategoryRoute';
import PostRoute from './route/PostRoute';
import UserRoute from './route/UserRoute';
import WeatherRoute from './route/WeatherRoute';
createConnection().then(async connection => {


    const app = express();
    const key = fs.readFileSync('./.ssh/key.pem', 'utf8');
    const cert = fs.readFileSync('./.ssh/cert.pem', 'utf8');

    app.use(cors({
        credentials: true,//protiv xss napada

        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        origin: 'http://localhost:3000'

    }));
    app.use(express.json());

    app.use(session({
        secret: 'keyboard cat',
        resave: false,

        saveUninitialized: false,
        cookie: {
            sameSite: 'none',
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
