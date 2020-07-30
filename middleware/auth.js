const moment  = require( 'moment' ) ;
const jwt     = require( 'jsonwebtoken' ) ;
const router  = require( 'express' ).Router() ;

const respond = require( '../response' ) ;
const User    = require( '../app/user/user.model' ) ;
const errData = respond.errData ;

const { ACCESS_TOKEN_KEY , ACCESS_TOKEN_EXPIRY  } = process.env ;
const { REFRESH_TOKEN_KEY, REFRESH_TOKEN_EXPIRY } = process.env ;

const REFRESH_TOKEN_MAX_AGE = eval( process.env.REFRESH_TOKEN_MAX_AGE ) ;
const noAuthURL = new Set( [ '/user/sign-up', '/user/sign-in', '/user/sign-out', '/auth/access-token', '/auth/refresh-token', ] ) ;
let ID = 1;

const authorize = async( req, res, next ) => {
    try {
        console.log( '\n\n' ) ; // -deb
        console.log( { ID : ID, URL : req.url, Method : req.method, Body : req.body, } ) ; // -deb
        res.ID = ID++ ;    res._TS = new Date() ; // -Deb
        
        const AccessToken  = req.header( 'Authorization' ) ;
        const RefreshToken = req.cookies.RefreshToken ;  
        const { _id } = jwt.verify( AccessToken , ACCESS_TOKEN_KEY  ) ;      
                        jwt.verify( RefreshToken, REFRESH_TOKEN_KEY ) ;      //-Pop
        req.UserID = _id ;

        return next();

    } catch ( err ) {

        if ( noAuthURL.has( req.url ) )         return next() ;

        if ( err.name === 'JsonWebTokenError' ) return respond.err( res, { err : errData.invalidToken } ) ;
        if ( err.name === 'TokenExpiredError' ) return respond.err( res, { err : errData.AccessTokenExpired } ) ;

        else                                    return respond.err( res, err ) ;
    }
}

module.exports.validateRefreshToken = async ( req, res, next ) => {
    try {
        const { _id, Type, TS } = jwt.verify( req.cookies.RefreshToken , REFRESH_TOKEN_KEY ) ;     // --
        const user = await User.findOne( { _id, TS }, { TS, Type } )                // --
        if ( ! moment( TS ).isSame( moment( user.TS) ) ) throw 'err' ;
        req.user = user ;
        return next() ;
    } catch ( err ) { // Add invalid case 
        if ( err.name === 'JsonWebTokenError' ) return respond.err( res, { err : errData.invalidToken } ) ;
        if ( err.name === 'TokenExpiredError' ) return respond.err( res, { err : errData.RefreshTokenExpired } ) ;
        else                                    return respond.err( res, err ) ;
    }
}
module.exports.newAccessToken = ( user ) => {
    return jwt.sign( {_id:user._id}, ACCESS_TOKEN_KEY , { expiresIn : ACCESS_TOKEN_EXPIRY  } ) ; 
}
module.exports.newRefreshToken = async ( res, user ) => {
    user.TS = moment() ;
    const userSave = user.save() ;
    const { _id, Type, TS } = user 
    const RefreshToken = jwt.sign( {_id,Type,TS}, REFRESH_TOKEN_KEY, { expiresIn : REFRESH_TOKEN_EXPIRY } )
    res.cookie( 'RefreshToken',  RefreshToken, {
        maxAge   : REFRESH_TOKEN_MAX_AGE ,
        httpOnly : true,
    }) ;
    res.cookie( 'nextRefreshTime',  Date.now() + REFRESH_TOKEN_MAX_AGE / 2, {maxAge:REFRESH_TOKEN_MAX_AGE} ) ;
    return await userSave ;
}

router.get( '/refresh-token' , async ( req, res ) => {
    try {
        await this.newRefreshToken( res, req.user ) ;
        return respond.ok( res, { AccessToken : this.newAccessToken( req.user ) } ) ;
    } catch( err ) {
        return respond.err( res, err ) ;
    }
}) ;

router.get( '/access-token', async ( req, res ) => {
    return respond.ok( res, { AccessToken : this.newAccessToken( req.user ), Type : req.user.Type } ) ;
}) ;

module.exports.router = router ;
module.exports.authorize = authorize ;
