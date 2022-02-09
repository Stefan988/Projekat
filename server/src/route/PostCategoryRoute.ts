import { Router } from "express";
import { getRepository } from "typeorm";
import PostCategory from "../entity/PostCategory";



const router = Router();

router.get('/', (req, res) => {
    getRepository(PostCategory).find().then(value => {
        res.json(value);
    })
})

export default router;