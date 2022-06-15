var song=""
leftwristX=0;
leftwristY=0;
scoreleftwrist=0;

rightwristX=0;
rightwristY=0;
scorerightwrist=0;

function preload(){
    song=loadSound("rickroll.mp3")
}

function setup(){
    canvas=createCanvas(600,450)
    canvas.center();
    video = createCapture(VIDEO);
    posenet = ml5.poseNet(video,modelloaded)
    video.hide();
    posenet.on('pose',gotposes)
}

function draw(){
    image(video,0,0,600,450)

    fill("#098357");
    stroke("#893474");

    if(scorerightwrist > 0.2){
    circle(rightwristX,rightwristY,20);

    if(rightwristY >0 && rightwristY <=100){
        document.getElementById("speed").innerHTML = "speed = 0.5";
        song.rate(0.5);
    }
    else if(rightwristY >100 && rightwristY <=200){
        document.getElementById("speed").innerHTML = "speed = 1";
        song.rate(1);
    }
    else if(rightwristY >200 && rightwristY <=300){
        document.getElementById("speed").innerHTML = "speed = 1.5";
        song.rate(1.5);
    }
    else if(rightwristY >300 && rightwristY <=400){
        document.getElementById("speed").innerHTML = "speed = 2";
        song.rate(2);
    }
    else if(rightwristY >400 && rightwristY <=500){
        document.getElementById("speed").innerHTML = "speed = 2.5";
        song.rate(2.5);
    }
}

if(scoreleftwrist > 0.2)
{
    circle(leftwristX,leftwristY,20);
    InNumberleftwristY=Number(leftwristY);
    remove_decimals = floor(InNumberleftwristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volume="+ volume;
    song.setVolume(volume);
}
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelloaded(){
    console.log("model_is_fully_activate")
}

function gotposes(results){
    if(results.length > 0)
    {
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;

        scorerightwrist=results[0].pose.keypoints[10].score
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
    }
}