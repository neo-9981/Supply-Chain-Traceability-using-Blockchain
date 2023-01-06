const timestamp = require('time-stamp');
console.log(timestamp('YYYY/MM/DD:HH:mm:ss'));


var currentdate = new Date();
var datetime = "Now: " + currentdate.getDate() + "/"
+ (currentdate.getMonth()+1)  + "/" 
+ currentdate.getFullYear() + " @ "  
+ currentdate.getHours() + ":"  
+ currentdate.getMinutes() + ":" 
+ currentdate.getSeconds();
console.log(datetime);