import JwtStrategy from 'passport-jwt';
import env from './env';
import User from '../../models/User';
const { Strategy, ExtractJwt } = JwtStrategy;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = env.SECRET_KEY;
const passportFunction = (passport) => {
  passport.use(
    new Strategy(opts, async ({ email }, next) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
      } catch (error) {
        console.log(error);
      }
    }),
  );
};
export default passportFunction;
