const LocalStrategy=require('passport-local').Strategy;
// const bcrypt=require('bcrypt');
const user=require("./registers");

function initialize(passport,getUserByEmail){
    const authenticateuser=async (email,password,done) =>{
        const user=getUserByEmail(email)
        if(user == null){
            return done(null,false,{message:"*Invalid login credentials!"})
        }

        try{
            if(await bcrypt.compare(password,user.password)){
                return done(null,user);
            }
            else{
                return done(null,false,{message:"*Invalid login credentials!"});
            }
        }
        catch(e){
            return done(e);
        }
    }

    passport.use(new LocalStrategy({usernameField:'email'},authenticateuser))
    passport.serializeUser((user,done)=>{ })
    passport.deserializeUser((user,done)=>{ })
}

module.exports = initialize;