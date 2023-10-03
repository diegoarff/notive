import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { getUserById } from '../services/user.services';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await getUserById(payload.id);
    if (user != null) {
      done(null, user);
    }
    done(null, false);
  } catch (error) {
    console.log(error);
  }
});
