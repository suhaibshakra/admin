package com.trackware;

import js.html.FormData;
import js.html.FormData;
import js.html.XMLHttpRequest;
import js.Browser;
import haxe.Http;
class Loader{
    var channel:Topic;
    var isLoading:Bool;
    public function new(aChannel:Topic) {
        channel= aChannel;
    }

    public function askForUsers(aTeamID:Int):Void{


        var infoRequest:XMLHttpRequest = new XMLHttpRequest();
        infoRequest.open("POST", "/apis/team/"+Std.string(aTeamID)+"/users");

        /*
        Add the JWT token to header
         */
        infoRequest.setRequestHeader("Authorization", Main.token);

        infoRequest.onerror = function(msg) {
            // TODO
            // Add a flash message about the error


            // TODO
            // Add a flash message about the error
            // the token might be expired
            // Browser.alert ("Session expired, try to refresh your page");
            // hideSpinner();

        }

        infoRequest.onload = function(aData:Dynamic) {
            //hideSpinner();
            if (infoRequest.status== 200)
            {
                var data:Dynamic = haxe.Json.parse(infoRequest.response);
                Main.token= infoRequest.getResponseHeader("Authorization");
                channel.setUsers(data);
            }
            else
            if (infoRequest.status== 400)
                Browser.alert ("Session expired, try to refresh your page");
            else
                Browser.alert ("Error "+Std.string(infoRequest.status)+", Try to refresh your page");


            isLoading= true;
        }



        infoRequest.send();
        isLoading= true;
    }
}
