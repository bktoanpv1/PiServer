/*API:  
        logTime();
        logTimestamp_ms();
        logTimestamp_second();
*/         

//==============================================================================//
//Getting Current Date and Time as YYYY-MM-DD hh:mm:ss                          //
//==============================================================================//
var date,month,year,hours,minutes,seconds;

// get current date
function getCurrentDate(){
    let date_ob = new Date();
    // adjust 0 before single digit date
    date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    year = date_ob.getFullYear();

    // current hours
    hours = ("0" + date_ob.getHours()).slice(-2);

    // current minutes
    minutes = ("0" + date_ob.getMinutes()).slice(-2);

    // current seconds
    seconds = ("0" + date_ob.getSeconds()).slice(-2);
}
// prints date & time in YYYY-MM-DD HH:MM:SS format
function logTime(str){
    getCurrentDate();
    console.log(date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds + " " + str);
}
//==============================================================================//
//Getting Current Timestamp                                                     //
//==============================================================================//
let ts = Date.now();

function getTimestamp(){
    ts = Date.now();
}

function logTimestamp_ms(){
    //Get timestamp
    getTimestamp();
    // timestamp in milliseconds
    console.log(ts);
}
function logTimestamp_second(){
    //Get timestamp
    getTimestamp();
    // timestamp in seconds
    console.log(Math.floor(ts/1000));
}

module.exports= {
    logTime : logTime,
    logTimestamp_ms : logTimestamp_ms,
    logTimestamp_second : logTimestamp_second,
}
//==============================================================================//
//Crerate on: 14/03/2022                                                        //
//Author: Pham Van Toan                                                         //
//==============================================================================//