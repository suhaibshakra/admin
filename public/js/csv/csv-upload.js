/**
 * Created by samir on 2/18/17.
 */

//inject directives and services.

var app = angular.module('fileUpload', ['ngFileUpload']);
var csv_loader_scope= {};
app.controller('csv_upload_controller', ['$scope', 'Upload', function ($scope, Upload) {

    csv_upload_controller= $scope;

    $scope.csv_header_items= [];
    $scope.db_columns= ["name","address"];
    $scope.csv_map= [];
    $scope.lines_count= 0;
    $scope.empty=0;




        $scope.fileSelected=false;


    $scope.onFileSelected=function(){
    console.log("fileSelected");

    $scope.csv_header_selected= function(option_item, db_index){

        var csv_header= $scope.csv_header_items[option_item.id];
        var db_column= $scope.db_columns[db_index];
        var mapped_index= $scope.csv_map.indexOf(db_column);

        /*
            Is this an override of another value?
        */


        if ($scope.csv_map[option_item.id]!= 0){
            //todo
            alert ("error please change selected");
        }

        if (mapped_index != -1  ){
            $scope.csv_map[mapped_index]= 0;

        }

        /*
        Store db_column in to csv_map
        */

        $scope.csv_map[option_item.id]= db_column;



       console.log($scope.csv_map)

    }
    $scope.fileSelected=true;

        // Check for the various File API support.
        if (window.FileReader) {
            // FileReader are supported.
            getAsText($scope.file);
        } else {
            alert('FileReader are not supported in this browser.');
        }

    }

    // upload later on form submit or something similar
    csv_loader_scope= $scope;
    $scope.submit = function() {
        if ($scope.form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
        }
    };

    $scope.ini= function(aPhoenixClient){
        console.log("phoenix client ready to get initialized for csv progress of uploading records", aPhoenixClient);
        $scope.websocket= aPhoenixClient.init({token:"", csv:true});
        $scope.websocket.connect();

    }
    $scope.socket_log= function(kind, msg, data){

    }


    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: PHOENIX_API_URL+ 'api/csvs',
                         headers: {
                'Authorization': JWT_token
            },
            data: {file: file, 'db_map': [0, 0, "name", "email"]},

        }).then(function (resp) {

          $scope.ItemsCount=0;
          $scope.inserted_count =0;
          $scope.conflictedItemsCount =0;
          $scope.conflictedItems = [];
          $scope.conflictedSubItems =[];


            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            // now, I have to connect to progress topic, and listen for feedback!
          var progress_topic= resp.data.process_name;
            console.log(progress_topic);
            var channel = $scope.websocket.channel(progress_topic);

            var join= channel.join();

            join.receive("ok", function(message){
                console.log(message, progress_topic);
                //start the stream!
                channel.push("start_stream", {"process_name":progress_topic});
            });

            join.receive("error", function(error){
                console.log(error);
                alert ("error!");
            });


            channel.on("new_progress", function(params) {
                console.log("new progress of a chunk!", params);
                if ( params.inserted_count > 0 ){

                    $scope.inserted_count +=params.inserted_count;
                }


                if ( params.conflictedItemsCount > 0 ){

                    $scope.conflictedItemsCount += params.conflictedItemsCount;
                     $scope.conflictedItems.push(params.conflictedItems);

                }

                $scope.ItemsCount =  $scope.conflictedItemsCount + $scope.inserted_count ;


                for(var i =0 ; i < params.conflictedItems.length ;i++){

                    var node = document.createElement("LI");
                    var textnode = document.createTextNode(params.conflictedItems[i]);
                    node.appendChild(textnode);
                    document.getElementById("upload-results").appendChild(node);
                    document.getElementById("progresscount").innerHTML=$scope.ItemsCount ;

                }

                console.log ($scope.ItemsCount , ($scope.lines_count-$scope.empty)-1 );
             if ($scope.ItemsCount == ($scope.lines_count-$scope.empty)-1 ){//lines.lenght

                channel.push("insertion_completed",{"process_name":progress_topic})
                    .receive('ok', function (msgID, msgData)
                  {
                       document.getElementById("progresscount").innerHTML="Done";
                       document.getElementById("progress").style.visibility="hidden";
                      console.log(msgData);
                      console.log(msgID);
                       console.log('insertion_completed: ' + msgData + msgID );
                    $scope.websocket.disconnect();
                  })
                  .receive('error', function (msgID, msgData)
                  {
                    console.log(error);
                    alert ("error!");
                  });


                 }

            });


        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };


}]);

/*

csv_colum_mapper

*/


app.directive("showconflicted", function() {
    return {
        template : '<div  ng-repeat="Item in conflictedSubItems track by $index" >{{Item }}</div>',



    };
});


app.directive("csvColumnMapper", function() {
    return {
        template : '<div class="csvColumnMapper"><p>{{db_column_name}}</p><select ng-options="item as item.label for item in csv_header_items track by item.id" ng-model="selected" ng-change="update({selectedItem:selected})"></select></div>',
        scope: {

            db_column_name: "@dbColumnName",
            csv_header_items: "=csvHeaderItems",
            selectedItem: "=",
            csv_map_index: "@csvMapIndex",
            update: "&"
        }


    };
});




function getAsText(fileToRead) {
	var reader = new FileReader();
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var csv = event.target.result;
	processData(csv);
}

function processData(csv) {
    var count=0;

    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    while (allTextLines.length ) {

        lines.push(allTextLines.shift().split(','));



    }
    csv_upload_controller.lines_count=lines.length;
	console.log(csv_upload_controller.lines_count);
    for(var empty=0 ;empty <= lines.length  ; empty ++){
        if(lines[empty] == ""){
         csv_upload_controller.empty= csv_upload_controller.empty + 1;
            console.log(csv_upload_controller.empty);
        }

    }

	drawOutput(lines[0]);
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}

function drawOutput(csv_header){

csv_upload_controller.csv_header_items=[];
csv_upload_controller.csv_map=[];
		for (var j = 0; j < csv_header.length; j++) {


			csv_upload_controller.csv_header_items.push({
                id: j,
                label: csv_header[j]

                })
            csv_upload_controller.csv_map.push(0);
		}



}
