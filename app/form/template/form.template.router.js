const router = require( 'express' ).Router() ;

const validate = require( '../../../validator' ) ;
const formTemplate  = require( './form.template.controller'   ) ;

router.get( "/list/:PageNo", formTemplate.list );
router.get( "/detail/:FormTemplateID", formTemplate.detail );

router.post( '/new' , validate.form.template.new , formTemplate.new  ) ;

module.exports.router = router
