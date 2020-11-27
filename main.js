LeftWristX=0;
RightWristX=0;
LeftWristY=0;
RightWristY=0;
scoreRwrist=0;
scoreLwrist=0;

function setup()
{
canvas=createCanvas(700,450);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
console.log("model is loaded !");
}

function gotPoses(results)
{
if(results.length>0)
{
console.log(results);
scoreRwrist=results[0].pose.keypoints[10].score;
scoreLwrist=results[0].pose.keypoints[9].score;
console.log("scoreRwrist= "+scoreRwrist+" scoreLwrist= "+scoreLwrist);
RightWristX=results[0].pose.rightWrist.x;
RightWristY=results[0].pose.rightWrist.y;
console.log("RightWristX= "+RightWristX+" RightWristY= "+RightWristY);
LeftWristX=results[0].pose.leftWrist.x;
LeftWristY=results[0].pose.leftWrist.y;
console.log("LeftWristX= "+LeftWristX+" LeftWristY= "+LeftWristY);
}
}

 function draw()
{
image(video,0,0,700,450);
stroke('#ff0000');
fill('#ff0000');
if(scoreRwrist>0.2)
{
circle(RightWristX,RightWristY,20);
if(RightWristY>0 && RightWristY<=100)
{
song.rate(0.5);
document.getElementById("speed").innerHTML="Speed : 0.5";
}
else if(RightWristY>100 && RightWristY<=200)
{
song.rate(1);
document.getElementById("speed").innerHTML="Speed : 1";
}
else if(RightWristY>200 && RightWristY<=300)
{
song.rate(1.5);
document.getElementById("speed").innerHTML="Speed : 1.5";
}
else if(RightWristY>300 && RightWristY<=400)
{
song.rate(2);
document.getElementById("speed").innerHTML="Speed : 2";
}
else if(RightWristY>400 && RightWristY<=500)
{
song.rate(2.5);
document.getElementById("speed").innerHTML="Speed : 2.5";
}
}
if(scoreLwrist>0.2)
{
circle(LeftWristX,LeftWristY,20);
number=Number(LeftWristY);
remove=floor(number);
volume=remove/500;
document.getElementById("volume").innerHTML="Volume : "+volume;
song.setVolume(volume);
}
}
song="";

function preload()
{
song=loadSound("music.mp3");
}

function play()
{
song.play();
song.setVolume(0.5);
song.rate(1);
}
