import passport from "passport";
import { User } from "../modules/user/user.model";
import { Strategy as localStrategy } from "passport-local";
import bcryptjs  from 'bcrypt';

passport.use(
    new localStrategy({
        usernameField:"email",
        passwordField:"Password"
    }, async (email, password, done)=>{
        try {
            const isUserExist = await User.findOne({email});
             
            if(!isUserExist){
                return done (null, false, {message:"user not found"})
            }

             if (!isUserExist.IsVerified) {
          return done(null, false, {
            message: "User is not verified",
          });
        }
        
        const isGoogleAuthenticated = isUserExist.auths.some(providerObjects =>providerObjects.provider == "google" )

           if(isGoogleAuthenticated && !isUserExist.password){
         return done(null, false,{message:"you have authentic through google. so if  you want  to login with credentials then at first login with google and  set a password  for  your gmail and then you can login with email and password"})
       }

          const isPasswordMatched =  await bcryptjs.compare(password as string , isUserExist.password as string )
             if(!isPasswordMatched){
                return done (null, false, {message:"password  does  not  match"} )
             }

              return done (null, isUserExist)

        } catch (error){
            console.log(error);
             done(error)
        }
    })
)


// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user:any, done:(err:any, id?:unknown)=>void)=>{
    done(null, user._id)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser( async (id:string, done:any)=>{
      try {
        const user = await User.findById(id)
        done(null, user)
      } catch (error) {
         done(error)
      }
})