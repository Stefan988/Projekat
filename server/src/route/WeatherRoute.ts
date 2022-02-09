import { Router } from "express";
import axios from 'axios'


const router = Router();

router.get('/', (req, res) => {
    axios.get('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civillight&output=json').then(value => {
        res.json(value.data.dataseries[0]);
    }).catch(err => {
        res.json(err);
    })
})

export default router;