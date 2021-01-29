song1 = "";
song2 = "";
song1Playing = "";
song2Playing = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
rightWristScore = 0;
leftWristScore = 0;
function preload() {
  song1 = loadSound("song 1 opening 6.mp3")
  song2 = loadSound("song 2 opening 5.mp3")
}
function setup() {
  canvas = createCanvas(500, 500)
  canvas.center()
  video = createCapture(VIDEO)
  video.hide()
  poseNet = ml5.poseNet(video, modelLoaded)
  poseNet.on("pose", getPoses)
}
function draw() {
  image(video, 0, 0, 500, 500)
  fill("#f70000")
  stroke("#f70000")
  song1Playing = song1.isPlaying()
  song2Playing = song2.isPlaying()
  if (leftWristScore > 0.2) {
    circle(leftWristX, leftWristY, 20)
    song2.stop()
    document.getElementById("song_name").innerHTML = "one piece opening 6"
    if (song1Playing == false) {
      song1.play()
    }
  }
  if (rightWristScore > 0.2) {
    circle(rightWristX, rightWristY, 20)
    song1.stop()
    document.getElementById("song_name").innerHTML = "one piece opening 5"
    if (song2Playing == false) {
      song2.play()
    }
  }
}
function modelLoaded() {
  console.log("model is loaded")
}
function getPoses(results) {
  console.log(results)
  leftWristX = results[0].pose.leftWrist.x
  console.log("leftWristX = "+leftWristX)
  rightWristX = results[0].pose.rightWrist.x
  console.log("rightwristX = "+rightWristX)
  leftWristY = results[0].pose.leftWrist.y
  console.log("leftWristY = "+leftWristY)
  rightWristY = results[0].pose.rightWrist.y
  console.log("rightWristY = "+rightWristY)
  leftWristScore = results[0].pose.keypoints[9].score
  rightWristScore = results[0].pose.keypoints[10].score
}
function pause() {
  song1.stop()
  song2.stop()
}