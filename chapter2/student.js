var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  courses: [{ type: String, ref: 'Course' }]
});

function getName(splitname, pos){
 var resName = splitname.toString().replace(',',' ');
  if( pos === 'FIRST' ){
    resName = splitname[0];
  } else {
    if( splitname.lenght > 3 ) {
      resName = splitname[splitname.length - 2];
    } else {
      resName = splitname[splitname.length -1];
    }
  }
  return resName;
}

/* Returns the student's first name, which we will define
 * to be everything up to the first space in the student's name.
 * For instance, "William Bruce Bailey" -> "William" */
schema.virtual('firstName').get(function() {
  var splitName = this.name.split(' ');
  return getName(splitName, 'FIRST');
});

/* Returns the student's last name, which we will define
 * to be everything after the last space in the student's name.
 * For instance, "William Bruce Bailey" -> "Bailey" */
schema.virtual('lastName').get(function() {
  var splitName = this.name.split(' ');
  return getName(splitName, 'LAST');
});

module.exports = schema;
