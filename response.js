module.exports.ok = ( resObj, data ) => {
    let res = {
        code : 0,
        data : data
    };
    console.log( { ID : resObj.ID, time : (Date.now() - resObj._TS) + "ms", res : res, } ) ; //-dev
    resObj.status( 200 ).send( res ) ;
}

module.exports.err = ( resObj, err ) => {
    let res ;
    try {
        if ( err.err.err ) res = { code : err.err.code, err : err.err.err, info : err.info } ;
        else               throw err ;
    } catch( error ) {
        if( err.type === 'entity.parse.failed' ) res = this.errData.jsonParseErr ;
        else res = this.errData.unknownErr ;
        console.log( err ) ; //Actual error
    } finally {
        console.log( { ID : resObj.ID, time : (new Date() - resObj._TS) + "ms", res : res, } ) ; //-dev
        resObj.status( 400 ).send( res ) ;
    }
}

module.exports.errHandler = ( err, req, res, next ) => { console.log('LOL Happened');return this.err( res, err ) ; } ;

module.exports.errData = {

    unknownErr          : { code : -1 , err : 'Unknown Error!',           info : 'Unknown Error - Inform Developer Immediately!' },
    jsonParseErr        : { code : -2 , err : 'Incorrect JSON Structure', info : "Incorrect JSON Structure"                      },

    unAuthorized        : { code : 1 , err : 'Not Authorized'                  },
    invalidToken        : { code : 2  , err : 'Invalid Token'                   },
    AccessTokenExpired  : { code : 3  , err : 'Access Token Expired'            },
    RefreshTokenExpired : { code : 4  , err : 'Refresh Token Expired'           },
    invalidCredential   : { code : 5  , err : 'Incorrect Credential'            },
    resNotFound         : { code : 6  , err : 'Resource Not Found'              },
    dbCommitErr         : { code : 7  , err : 'Error While Saving To Database'  },
    duplicateErr        : { code : 8  , err : 'Value Already Exist (Duplicate)' },
    validationErr       : { code : 9  , err : 'Validation Error'                },
    
} ;
