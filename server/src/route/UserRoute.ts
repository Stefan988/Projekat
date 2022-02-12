import * as bodyParser from 'body-parser';
import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

const userDTO = (user: User) => {
    if (!user) {
        return undefined;
    }
    return {
        category: user.category?.value || '',
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        username: user.username,
    }
}
const router = Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.get('/', (req, res) => {
    getRepository(User).find().then(value => {
        res.json(value);
    })
})
router.post('/', (req, res) => {
    if (req.body.action === 'login') {

        getRepository(User).find({
            where: {
                password: req.body.password,
                username: req.body.username
            }
        }).then(value => {
            if (value.length > 0) {
                let user = value[0];
                (req.session as any).user = user;
                req.session.save((err) => { console.log(err) });
                res.json(userDTO(user));
            } else {
                res.json(false);
            }
        })
        return;
    }
    if (req.body.action === 'register') {
        getRepository(User).findOne({
            where: {
                username: req.body.user.username
            }
        }).then(value => {
            if (value) {
                res.json({
                    error: 'user already exists'
                })
            } else {
                return getRepository(User).insert(req.body.user);
            }
        }).then(value => {
            return getRepository(User).findOne(value.identifiers[0].id);
        }).then(value => {
            res.json(value);
        }).catch(err => {
            console.log(err);
            res.status(501);
            res.json({
                error: 'something went wrong'
            });
        })

        return;
    }
    if (req.body.action === 'check') {

        res.json(userDTO((req.session as any).user));
        return;
    }
    if (req.body.action === 'logout') {
        req.session.destroy((err) => res.json(err));
        res.json(true);
    }
})

export default router;