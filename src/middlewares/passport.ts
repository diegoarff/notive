import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt'
import { getUserById } from '../services/user.services'

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}


export default new Strategy(opts, async(payload, done)=>{
  try {
   const user = await getUserById(payload.id);
  if (user) {
    return done(null, user);
  }
    return done(null, false)  
  } catch (error) {
    console.log(error)
  }
 
})

