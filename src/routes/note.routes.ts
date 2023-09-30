import { Router } from "express";
import passport from "passport";

const router = Router()

router.get('/note', passport.authenticate("jwt"), 
(req, res)=> {
    res.send('succes')
})

export default router