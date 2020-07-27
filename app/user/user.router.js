const router = require( 'express' ).Router() ;

const user = require( './user.controller'   ) ;
const validate = require( '../../validator' ) ;

router.post( '/sign-up' , validate.user.signUp , user.signUp  ) ;
router.post( '/sign-in' , validate.user.signIn , user.signIn  ) ;
router.post( '/sign-out', validate.user.signOut, user.signOut ) ;

module.exports.router = router