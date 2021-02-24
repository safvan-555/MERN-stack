var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    phone: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
});
var codeSchema = new Schema({
    email: { type: String },
    code: { type: String },
    expiry: { type: Date, expires: 360 },
});

module.exports.new = (data, callback) => {
    var verification_model = mongoose.model("codes", codeSchema);
    let usr = new verification_model(data)
    usr.save((err, dat) => { callback(err, dat) })
}

module.exports.getByCode = function (code) {
    var verification_model = mongoose.model("codes", codeSchema);
    return verification_model.findOne({ code: code }).lean();
}
module.exports.getUserByPhone = (phone, callback) => {
    var users_model = mongoose.model("users", userSchema);
    return users_model.findOne({ phone: phone }, callback).lean();
};
module.exports.getUserByUsername = (username, callback) => {
    var users_model = mongoose.model("users", userSchema);
    return users_model.findOne({ username: username }, callback).lean();
};
module.exports.getUserByEmail = (email, callback) => {
    var users_model = mongoose.model("users", userSchema);
    return users_model.findOne({ email: email }, callback).lean();
};
module.exports.getUserByUpdate = (id, data, callback) => {
    var users_model = mongoose.model("users", userSchema);
    return users_model.updateOne(
        { _id: id },
        { $set: data },
        callback
    );
};
module.exports.createUser = (data, callback) => {
    var users_model = mongoose.model("users", userSchema);
    let user = new users_model(data);
    return user.save((err, dat) => {
        callback(err, dat);
    });
};
