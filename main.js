song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide;
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded() {
    console.log('Pose Net is Initialised');
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('red');
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals / 500;
        document.getElementById('volume').innerHTML = 'Volume is ' + volume;
        song.setVolume(volume);
    }
}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('Right Wrist X is' + rightWristX + 'Right Wrist Y is' + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('Left Wrist X is' + leftWristX + 'Left Wrist Y is' + leftWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log('Left Wrist is' + scoreLeftWrist);
    }
}