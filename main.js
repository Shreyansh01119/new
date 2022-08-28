status = "";
input_text = "";

function preload(){
    
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}
function modelloaded(){
    console.log("Model Loaded");
    status = true;
}
function draw(){
    image(video, 0, 0, 600, 500);
    if(status != ""){
        object_Detecter.detect(video, gotResults);
        for(i = 0;i < ojects.lenght;i++){
            document.getElementById("status").innerHTML = "Status : Object Dectected";
            console.log(objects.length);
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent + "%",objects[i].x +15, objects[i].y+15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == input_text){
                video.stop();
                object_Detecter.detect(gotResults);
                document.getElementById("object_found").innerHTML = input_text+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text+ "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_name").innerHTML = input_text+ " Not Found";
            }
        }
    }
}
