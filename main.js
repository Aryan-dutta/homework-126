song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function setup() {
    canvas = createCanvas(600, 500)    //the first number is the width and second is height.
    canvas.center();

    video = createCapture(VIDEO)
    video.hide();    //to hide extra useless components from ml5

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
  if(results.length > 0)
  {
      console.log(results);
      scoreLeftWrist = results[0].pose.keypoints[9].score;
      console.log("scoreLeftWrist = " + scoreLeftWrist);
      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;

      console.log("leftWristX - " + leftWristX + "leftWristY = " + leftWristY);

      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;

      console.log("rightWristX - " + rightWristX + "rightWristY = " + rightWristY);
  }
}
function modelLoaded() {
    console.log('PoseNet Is Initialized');
}
function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000")
if(scoreLeftWrist > 0.01)
  {
    circle(leftWristX, leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume " +volume;
    song.setVolume(volume);

   }
}
function preload()
{
song = loadSound("music.mp3")    //means loading a function that is already there
}

function play()
{
    song.play();    //to play the music
    song.setVolume(1);    //it will take 1 as the default volume(full volume)
    song.rate(1)    //to set the speed to 1(normal speed)
}

//any volume less than 0.5 will be considered as low and above 0.5 will be called as high
