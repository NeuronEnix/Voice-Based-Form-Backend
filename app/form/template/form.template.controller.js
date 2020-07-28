const FormTemplate = require( './form.template.model') ;
const respond      = require( '../../../response'    ) ;

module.exports.new = async ( req, res ) => {
    const template = new FormTemplate() ; 
    Object.assign( template, req.body ) ; 
    template.UserID = req.UserID ;
    await template.save();
    return respond.ok( res, { FormTemplateID : template._id } );
};
