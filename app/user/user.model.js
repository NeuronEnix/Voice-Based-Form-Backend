const bcrypt   = require( 'bcryptjs' ) ;
const mongoose = require( 'mongoose' ) ;

const errData  = require( '../../response' ).errData ;
const bcryptRounds = parseInt( process.env.BCRYPT_ROUNDS ) ;

var userSchema = new mongoose.Schema ({
    Name     : { type : new mongoose.Schema({ F: String, L: String,}, {_id:false} ) },
    Email    : { type : String, index: { unique: true } },
    Password : String,
    TS       : Date, // RefreshToken creation timestamp
    Type     : { type : String, default: 'u' },     // 'a' -> admin  ; 'u' -> user
    Status   : { type : String, default :'a' },     // 'a' -> active ; 'd' -> disabled
});

userSchema.statics.AddNewUser = async ( userData ) => {
    try {
        const user = new User() ;
        userData.Password = await bcrypt.hash( userData.Password, bcryptRounds ) ;
        Object.assign( user, userData ) ;
        return await user.save() ;
    } catch ( err ) {
        if ( err.code === 11000 )
            throw { err : errData.duplicateErr, info : 'Email Already Exist' };
        throw err ;
    }
}

userSchema.statics.LookUp = async ( { Email, Password } ) => {
    const user = await User.findOne( { Email } , { Password:1, Type:1 } ) ;
    if ( user ) {
        const passMatched = await bcrypt.compare( Password, user.Password ) ;
        if ( passMatched ) return user ;
    }
    throw { err : errData.invalidCredential, info : 'Email or Password is Incorrect!' } ;
}

const User = mongoose.model( 'users', userSchema ) ;
module.exports = User;
