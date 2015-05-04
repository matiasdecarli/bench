var time_interval = 50;
var Curl = require('node-curl');
var url = ''; //test url

var requests = 0;
var response_ok = 0;

setInterval(function() {
	var curl = Curl.create();
    curl(url, function(err) {
        requests++;

        if (this.status && this.status === 200) response_ok++;
        
        var percentage = response_ok / requests;
        console.log(this.status, ' : ', (percentage.toFixed(2) * 100) + ' %');
        this.close();
    });
}, time_interval);


process.on('SIGINT', function() {
	console.log('-------------------------------');
    console.log('FINISHED: ');
    console.log('requests: ', requests);
    console.log('requests w/200: ', response_ok);

    var percentage = response_ok / requests;
    console.log('percentage: ', (percentage.toFixed(2) * 100));
    process.exit();
})