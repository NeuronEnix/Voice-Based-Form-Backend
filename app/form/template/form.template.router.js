const router = require( 'express' ).Router() ;

const validate = require( '../../../validator' ) ;
const formTemplate  = require( './form.template.controller'   ) ;

router.get( "/list", formTemplate.list );
router.post( "/detail", formTemplate.detail );

router.post( '/new' , validate.form.template.new , formTemplate.new  ) ;

module.exports.router = router
