const { authenticate } = require("passport")
const passport = require("passport")

const LocalStrategy = require('passport-local'.Strategy)
const brcypt = require('brcypt')

function initialize(){
    const authenticateUser = (name, email, done) => {
        const user = getUserByEmail(email)
        if(user == null){
            return done(null, false,{ message: 'No user with that email' })
        }

        try {
            if(await bcrypt.compare(password, user.password)){
                
            } else{
                return done(null, false, { message: 'Password Incorrect'})
            }
        } catch(e){
            return done(e)
        }
    }
    
    passport.use(new LocalStrategy({usernameField: 'email' }),authenticateUser)
    passport.serializeUser((user,done)=>{  })
    passport.deserializeUser((id,done)=>{  })
}