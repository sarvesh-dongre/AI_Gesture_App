nose_x = 0;
nose_y = 0;
difference = 0;
right_wrist_x = 0;
left_wrist_x = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550,550);
    canvas.position(550, 150);
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", getPoses);
}


function draw() {
    background("#969A97");
    fill("#F90093");
    stroke("#F90093");
    square(nose_x, nose_y, difference);
    document.getElementById("square_sides").innerHTML = "Width and Height of the square will be - " + difference + "px";
}


function getPoses(results) {
    if (results.length > 0) {
        console.log(results);
        nose_x = results[0].pose.nose.x;
        nose_y = results[0].pose.nose.y;
        left_wrist_x = results[0].pose.leftWrist.x;
        right_wrist_x = results[0].pose.rightWrist.x;
        console.log("Nose X = " + nose_x + ", Nose Y = " + nose_y);
        console.log("Left Wrist X = " + left_wrist_x + ", Right Wrist X = " + right_wrist_x);
        difference = floor(left_wrist_x - right_wrist_x);

        console.log("Left Wrist X = " + left_wrist_x + ", Right Wrist X = " + right_wrist_x + ", Difference = " + difference);
    }
}


function modelLoaded() {
    console.log("PoseNet is initialised");
}