'use strict';

module.exports.id = 'INITIAL-MIGRATION';

module.exports.up = function (done) {
  this.db.createCollection('users', (error, results) => {
    if(error) {
      console.error(error)
      done(error)
    }else{
      done()
    }
  })
};