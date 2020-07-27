const router = require( 'express' ).Router() ;

const user = require( './user/user.router' ) ;
router.use( '/user', user.router ) ;

const auth = require( '../middleware/auth' ) ;
router.use( '/auth' , auth.validateRefreshToken, auth.router ) ;

module.exports.router = router ;
