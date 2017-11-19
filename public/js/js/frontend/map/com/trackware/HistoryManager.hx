package com.trackware;
import Std;
import com.trackware.Types.UserObject;
import js.Promise;
import google.maps.Polyline;
import haxe.Json;
import com.trackware.User;
import js.Browser;
import js.html.XMLHttpRequest;
import js.html.FormData;
@:expose
class HistoryManager {
    public static var instance(get, null):HistoryManager;
    var mesagesGot:Array<Dynamic>;
    var messagesReadCount:Int = 0;
    var channel:Topic;
    var isLoading:Bool;

    function new() {

    }

    static function get_instance():HistoryManager {
        if (instance == null) {
            instance = new HistoryManager();
        }
        return instance;
    }


    // explanation example to call getUserRouteHistory function with all parameters
    // getUserRouteHistory("192.168.1.26",1,"31.9566,35.9457","2016-4-17","2016-4-17","9:27:0","9:29:0",1)'])
    function getUserRouteHistory(aIP:String, aUserID:Int, aUserSourecLatLong, aStartDateSTR:String, aEndDateSTR:String, aStartTimeSTR:String, aEndTimeSTR:String, aDayLightSavingTime:Int):Void {

        // first promise to get user channel
        // channel used to get history
        var user_info_promise:Promise<Int> = getUserInfo(aUserID);
        user_info_promise.then(function(aChannel){

            // second promise to get timeoffset from google map api
            //var timeoffset:Int= 3 * (60 * 60);
            var time_offset_promise:Promise<Int> = getTimeOffset(aUserSourecLatLong);
            time_offset_promise.then(function (aTimeOffset){

                //Browser.alert(result);
                //var dayLightSavingTime = 1;
                var timeoffset:Int = aTimeOffset;

                var dateDelimiter = "-";
                var timeDelimiter = ":";
                var startDateArray = aStartDateSTR.split(dateDelimiter);
                var endDateArray = aStartDateSTR.split(dateDelimiter);
                var startTimeArray = aStartTimeSTR.split(timeDelimiter);
                var endTimeArray = aEndTimeSTR.split(timeDelimiter);

                var startYear= Std.parseInt(startDateArray[0]);
                var endYear= Std.parseInt(endDateArray[0]);
                var startMonth= Std.parseInt(startDateArray[1]);
                var endMonth= Std.parseInt(endDateArray[1]);
                var startDay= Std.parseInt(startDateArray[2]);
                var endDay= Std.parseInt(endDateArray[2]);
                var startHoure= Std.parseInt(startTimeArray[0]);
                var endHoure= Std.parseInt(endTimeArray[0]);
                var startMinute= Std.parseInt(startTimeArray[1]);
                var endMinute= Std.parseInt(endTimeArray[1]);
                var startSecond= Std.parseInt(startTimeArray[2]);
                var endSecond= Std.parseInt(endTimeArray[2]);

                var strStartDate = Std.string(DateTools.makeUtc (startYear, startMonth-1, startDay, startHoure-aDayLightSavingTime, startMinute, startSecond-timeoffset)).substr(0, 10);
                var strEndDate = Std.string(DateTools.makeUtc (endYear, endMonth-1, endDay, endHoure-aDayLightSavingTime, endMinute, endSecond-timeoffset)).substr(0, 10);

                var aStartDate= Std.parseFloat(strStartDate);
                var aEndDate= Std.parseFloat(strEndDate);

                mesagesGot = new Array<Dynamic>();
                messagesReadCount = 0;
                var user:User = Topic.getUser(aUserID);
                getHistory(aUserID, aStartDate, aEndDate, aChannel);
            },
            function(reason){
                Browser.console.log("time_offset_promise rejected");
            });

        });

    }
    public function getUserInfo(aUserID:Int):Promise<Int>
    {
        var infoRequest:XMLHttpRequest = new XMLHttpRequest();
        infoRequest.open("POST", "/apis/user-info");
        infoRequest.setRequestHeader("Authorization", Main.token);

        var formData:FormData = new FormData();
        formData.append("user_id", Std.string(aUserID));
        infoRequest.send(formData);

        var user_info_promise:Promise<Int>= new Promise<Int>(function(resolve, reject){

            infoRequest.onload = function(aData:Dynamic) {

                if (infoRequest.status == 200) {
                    var data:Dynamic = haxe.Json.parse(infoRequest.response);
                    //Browser.console.log("data.channel", data.channel);
                    resolve(data.channel);
                }
                else if (infoRequest.status == 400){
                    Browser.alert("Session expired, try to refresh your page");
                    reject("Session expired, try to refresh your page");
                }
                else{
                    Browser.alert("Error " + Std.string(infoRequest.status) + ", Try to refresh your page");
                    reject(infoRequest.status);
                }

            }

            infoRequest.onerror = function(msg) {

                // TODO
                // Add a flash message about the error
                // the token might be expired
                // Browser.alert ("Session expired, try to refresh your page");
                // hideSpinner();
                reject(msg);
            }
        });

        return user_info_promise;


    }
    public function getTimeOffset(aUserSourecLatLong):Promise<Int>{

        var infoRequest:XMLHttpRequest = new XMLHttpRequest();
        infoRequest.open("GET", "https://maps.googleapis.com/maps/api/timezone/json?"+"location="+aUserSourecLatLong+"&timestamp="+0+"&key="+Main.google_maps_api_key);

        var time_offset_promise:Promise<Int> = new Promise<Int>(function(resolve, reject){
            infoRequest.onload = function(aData:Dynamic) {
                var data:Dynamic = haxe.Json.parse(infoRequest.response);
                //hideSpinner();
                if (infoRequest.status== 200)
                {
                    Browser.console.log("getTimeOffset data", data.rawOffset);
                    resolve(data.rawOffset);
                }
                else if (infoRequest.status== 400){
                    Browser.alert ("Session expired, try to refresh your page");
                    reject("Session expired, try to refresh your page");
                }
                else{
                    Browser.alert ("Error "+Std.string(infoRequest.status)+", Try to refresh your page");
                    reject(infoRequest.status);
                }


                isLoading= true;
            }

            infoRequest.onerror = function(msg) {

                // TODO
                // Add a flash message about the error
                // the token might be expired
                // Browser.alert ("Session expired, try to refresh your page");
                // hideSpinner();
                reject(msg);
            }

        });

        infoRequest.send();
        isLoading= true;

        return time_offset_promise;
    }


    public function getHistory(aUserID:Int, aStart:Float, aEnd:Float, aChannel:Int):Void {


        messagesReadCount++;
        aUserID = 0;
        //var user:User = Topic.getUser(aUserID);

        Browser.console.log(aStart, aEnd);
        Browser.console.log("channel is: ", aChannel);

        Map.instance.pubnub.history({
            channel: aChannel,
            count: 100,
            start: aStart * Math.pow(10, 7),
            end: aEnd * Math.pow(10, 7),
            callback: function(m) {
                messageGotter(m, aUserID, aStart, aEnd, aChannel);
            }
        });
    }

    public function messageGotter(m, aUserID, aStart:Float, aEnd:Float, aChannel:Int) {
        var lastGotMessageTime = Std.int(Std.parseInt(m[2]) / Math.pow(10, 7));
        var messagesCount = m[0].length;

        var subMessages:Array<Dynamic> = cast(m[0], Array<Dynamic>);
        var flightPlanCoordinates:Array<Dynamic> = cast(m[0], Array<Dynamic>);

        var config = {
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        };

        var flightPath:Polyline = new Polyline(config);

        if (messagesCount > 1) {//&& lastGotMessageTime < aEnd ) {
            /*
             * There is still more messages to get
             * fill got message into mesagesGot
             */
            for (ii in 0...subMessages.length) {
                mesagesGot.push(subMessages[ii]);
            }
            flightPath.setMap(Map.instance.map);
            //Browser.console.log("Another round", messagesCount, mesagesGot.length, m, aEnd);
            //Browser.console.log("mesagesGot", mesagesGot.length, messagesCount);
            getHistory(aUserID, lastGotMessageTime, aEnd, aChannel);

        }
        else {
            /*
             * We have read all the messages at the specific time
             */
            Browser.console.log("mesagesGot!", mesagesGot);
            Json.stringify(m);
            allMessagesGot(mesagesGot);
        }
    }

    function allMessagesGot(messagesGot:Array<Dynamic>):Void {

        Browser.console.log("All messagesGot!");
        Browser.console.log(messagesGot);
    }
}
