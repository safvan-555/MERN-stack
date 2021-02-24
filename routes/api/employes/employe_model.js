var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var employSchema = new Schema({
    phone: { type: String },
    name: { type: String },
    email: { type: String },
    address1: { type: String },
    address2: { type: String },
});

var employ_model = mongoose.model("employees", employSchema);
module.exports.newEmploy = (data, callback) => {
    let user = new employ_model(data);
    user.save((err, dat) => {
        callback(err, dat);
    });
};



module.exports.getUserByPhone = (phone, callback) => {
    return users_model.findOne({ phone: phone }, callback).lean();
};
module.exports.getUserByUsername = (username, callback) => {
    return users_model.findOne({ username: username }, callback).lean();
};
module.exports.getUserByUpdate = (id, data, callback) => {
    return users_model.updateOne(
        { _id: id },
        { $set: data },
        callback
    );
};

