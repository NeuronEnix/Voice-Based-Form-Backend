const db = require( 'mongoose' ) ;

//Fixes all deprecation warnings
db.set( 'useNewUrlParser'    , true  ) ;
db.set( 'useFindAndModify'   , false ) ;
db.set( 'useCreateIndex'     , true  ) ;
db.set( 'useUnifiedTopology' , true  ) ;
db.set( 'autoIndex'          , true  ) ;

// Importing schema 
require( './app/user/user.model' ) ;
require( './app/form/ans/form.ans.model') ;
require( './app/form/template/form.template.model') ;

// Connects to DB
module.exports.connect = () => {
    db.connect( process.env.DB_URL) 
        .then  ( val => { console.log('Connected to DB')     ; } )
        .catch ( err => { console.log('Not Connected to DB') ; } ) ;
}
