var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
    refresh_token: { type: String },
    iat: { type: Number },
    user_id: { type: Schema.Types.ObjectId },
});

var tokens_model = mongoose.model("tokens", tokenSchema);

module.exports.newToken = (data, callback) => {
    let token = new tokens_model(data);
    token.save((err, dat) => {
        callback(err, dat);
    });
};
module.exports.getTokenByRefreshtoken = (refresh_token) => {
    return tokens_model.findOne({ refresh_token: refresh_token }).lean();
};
module.exports.update = function (id, data, callback) {
    tokens_model.findByIdAndUpdate(id, data, { new: true }, callback);
};

module.exports.deleteRefreshtoken = function (refresh_token, callback) {
    tokens_model.findOneAndDelete({ refresh_token: refresh_token }, callback);
};  