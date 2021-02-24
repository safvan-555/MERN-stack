var config = require('./config.json')
var mongoose = require("mongoose");
const express = require("express");
const PORT = config.PORT || 4000;
const app = express();

var uristring = config.db_Url
mongoose.connect(uristring, { useNewUrlParser: true }, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});

app.use(express.static('static'))
app.use(express.json({ extended: false }));

app.use("/api", require("./routes/index"));


// UI
app.get("/*", (req, res) => {
    res.sendFile('static/index.html', { root: __dirname });
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));