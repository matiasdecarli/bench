var Curl = require( 'node-libcurl' ).Curl;
var time_interval = 100;
var colors = require('colors');

var url = 'www.google.com';
var ok = 0;
var fail = 0;
var total = 0;
var t_ping = 0;

console.log('working...')

setInterval(function() {
    var curl = new Curl();

    curl.setOpt( 'URL', url);

    curl.on( 'error', curl.close.bind( curl ) );

    curl.on( 'end', function( statusCode, body, headers ) {        
        total++;
        if(statusCode && ((statusCode===200) || (statusCode===301))) ok++;
               
        if((statusCode!==200) && (statusCode!=301))fail++;

        var post = new Date();
        var time = (post.getTime()) - pre.getTime() ;

        t_ping+= time;
        var payload = '200 or 301: ' + ok + '  -   !200:' + fail + ' - time: ' + time; 
        

        if (time>2000) return console.log(payload.red);
        if (time>1000) return console.log(payload.yellow);

        console.log(payload.grey);
        
        this.close();
    });

    var pre = new Date();
    curl.perform();
}, time_interval);

process.on('SIGINT', function() {
    console.log('-------------------------------');
    console.log('FINISHED: ');  
    console.log('total requests: ', total);
    console.log('200: ',ok,'   -   !200:', fail, ' - time average: ', t_ping/total);
    
    process.exit();
})
