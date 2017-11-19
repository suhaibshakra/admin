package com.trackware;

typedef UserObject = {
    var id:Int;
    var name:String;
    /*
    This is the solo channel, that is used to track the use and read his history back
     */
    var channel:String;
    var auth_key:String;
}