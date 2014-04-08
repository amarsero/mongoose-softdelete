var assert = require('assert'),
    mongoose = require('mongoose'),
    soft_delete = require('src/mongoose-softdelete.js'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/softtest');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: please check if mongodb is running on localhost'));
db.once('open', function callback () {
  console.log('Database connection made');
});

var TestSchema = new Schema({
  name: { type: String, default: 'Riyadh' },
  comment: { type: String, default: 'lalalalalalala' }
});

TestSchema.plugin(soft_delete);

var Test = mongoose.model('Test', TestSchema);
var test = new Test();

describe("Plugin Test", function() {
  it("should delete/restore data in the DB", function(done) {
    var user = {};
    user._id = '21wf232efe312212';

    test.softdelete(user, function(err, success) {
      if (err) { console.log('Error deleting data!'); }
      assert.equal(success.deleted, true);
      assert.equal(success.deletedBy, user._id);
      console.log(success.deleted);
      console.log(success.deletedBy);
    });

    test.restore(user, function(err, success) {
      if (err) { console.log('Error restoring data!'); }
      assert.equal(success.deleted, false);
      assert.equal(success.deletedBy, null);
      console.log(success.deleted);
      console.log(success.deletedBy);
    });
  });
});