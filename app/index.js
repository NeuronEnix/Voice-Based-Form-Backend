const router = require( 'express' ).Router() ;

const user = require( './user/user.router' ) ;
router.use( '/user', user.router ) ;

const form = require( './form/form.router' ) ;
router.use( '/form', form.router ) ;

const auth = require( '../middleware/auth' ) ;
router.use( '/auth' , auth.validateRefreshToken, auth.router ) ;

module.exports.router = router ;
