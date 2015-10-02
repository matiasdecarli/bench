var time_interval = 50;
var Curl = require('node-curl');
var url = 'url';
var ok = 0;
var fail = 0;
var total = 0;

var t_ping = 0;


console.log('working...')

setInterval(function() {
    var curl = Curl.create();
    var pre = new Date();

    curl(url, { SSL_VERIFYPEER : 0 }, function(err) {
        total++;
        if(this.status && this.status===200) ok++;

               
        if(this.status!==200)fail++;

        var post = new Date();
        var time = (post.getTime()) - pre.getTime() ;

        t_ping+= time;

        
        console.log('200: ',ok,'  -   !200:', fail, ' - time: ', time);
    });
}, time_interval);


process.on('SIGINT', function() {
    console.log('-------------------------------');
    console.log('FINISHED: ');  
    console.log('total requests: ', total);
    console.log('200: ',ok,'   -   !200:', fail, ' - time average: ', t_ping/total);
    
    process.exit();
})
