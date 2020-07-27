const User    = require( './user.model'   ) ;
const respond = require( '../../response' ) ;

const { newAccessToken, newRefreshToken } = require( '../../middleware/auth' ) ;

module.exports.signUp = async ( req, res ) => {
    const userData  = req.body ;
    userData.UserID = req.UserID ;  // UserID of the person creating this account
    await User.AddNewUser( userData ) ;
    respond.ok( res ) ;
}

module.exports.signIn = async ( req, res ) => {
    const userCredential = req.body ;
    const user = await User.LookUp( userCredential ) ;
    await newRefreshToken( res, user ) ;
    return respond.ok( res, { AccessToken : newAccessToken( user ), Type : user.Type } ) ;
}

module.exports.signOut = ( req, res ) => {
    res.clearCookie('RefreshToken') ;     return respond.ok( res ) ;
}