const app = require('./index.js');

app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function(){
    console.log('App started at port: ' + app.get('port'));
});