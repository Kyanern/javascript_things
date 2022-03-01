var app = {};

var fa = require('./f1')(app);
var fb = require('./f2')(app);

console.log(app);
app.f1fn1();
app.f1fn2();
app.f2fn1();
app.f2fn2();
console.log(app);

//app can be extended with new properties when passed to other files.