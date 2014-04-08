var exports;

exports = module.exports = function(schema) {
  schema.add({ deleted: Boolean, deletedBy: String });

  schema.methods.softdelete = function(data, callback) {
    this.deleted = true;
    this.deletedBy = data._id;
    this.save(callback);
  };

  schema.methods.restore = function(data, callback) {
    this.deleted = false;
    this.deletedBy = null;
    this.save(callback);
  };
};
