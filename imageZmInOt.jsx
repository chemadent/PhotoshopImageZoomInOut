// enable double clicking from the Macintosh Finder
// or the Windows Explorer
#target photoshop

var BUFFER_SIZE = 1;
var TCP_HOST = "YOUR_HOST_NAME";
var TCP_PORT = "YOUR_PORT_NUMBER";
var TCP_HOST_PORT = TCP_HOST+":"+TCP_PORT;

var connection = new Socket;

if(connection.open(TCP_HOST_PORT)){
    // show the hostname
    $.writeln("host: "+connection.host);
    var prev_command = 0;
    while(connection.connected){
        var command = prev_command;
        var command2 = connection.read (BUFFER_SIZE);
        prev_command = command2;
        if(command == 1 && command2 == 1){
            zoomIn();
            prev_command = 0;
            $.writeln("zoom in");
        }
        else if(command == 2 && command2 == 2){
            zoomOut();
            prev_command = 0;
            $.writeln("zoom out");
        }
        else{
            $.writeln("no two consecutive same commands, rotate left, rotate right, neutral or undefined");
        }
    }
    connection.close();
    delete connection;
}
else{
    $.writeln(connection.error);
}

function cTID(s){
     return app.charIDToTypeID(s);
}

function zoomIn(){
    runMenuItem (cTID ("ZmIn"));
}

function zoomOut(){
    runMenuItem (cTID ("ZmOt"));
}

function runMenuItem(item){
    if(app.activeDocument == null){
        alert("No active document");
        return "no active document";
    }
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated( cTID( "Mn  " ), cTID( "MnIt" ), item );
    desc.putReference( cTID( "null" ), ref );
    executeAction( cTID( "slct" ), desc, DialogModes.NO );
}