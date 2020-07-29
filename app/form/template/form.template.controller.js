const FormTemplate = require( './form.template.model') ;
const respond      = require( '../../../response'    ) ;

module.exports.new = async ( req, res ) => {
    const template = new FormTemplate() ; 
    Object.assign( template, req.body ) ; 
    template.UserID = req.UserID ;
    await template.save();
    return respond.ok( res, { FormTemplateID : template._id } );
};

module.exports.list = async ( req, res ) => {
    const pageNo = req.params.P ;
    return respond.ok( res, await FormTemplate.find( {}, {__v:0, Data:0} ).skip( 10*pageNo ).limit( 10 ) ) ; 
};

module.exports.detail = async ( req, res ) => {
    console.log( req.body)
    return  respond.ok( res, await FormTemplate.findOne( {_id:req.body.FormTemplateID}, {_id:0,__v:0} ) ) ; 
};