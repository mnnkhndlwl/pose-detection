let video;
let poseNet;
let results;
let myPose;
let skeleton;

function setup() {
  createCanvas(1280, 720);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, onReady); // video - where we wannt to use our pose net onReady - callback function

  poseNet.on("pose", (res) => {
    // once you get the pose then result
    // console.log(res);
    if (res.length) {
      results = res;
      myPose = results[0].pose;
      skeleton = results[0].skeleton;
    }
  });
}

function onReady() {
  console.log("Model is ready");
}

function draw() {
  // ellipse(80,80,60,60);
  image(video, 0, 0);
  fill(255, 120, 0);
  if (myPose) {
    ellipse(myPose.nose.x, myPose.nose.y, 20);
    if (myPose.score > 0.3) {
      for (let i = 0; i < myPose.keypoints.length; i++) {
        let x = myPose.keypoints[i].position.x;
        let y = myPose.keypoints[i].position.y;
        fill(0, 0, 255);
        ellipse(x, y, 20);
      }
    }
    for (let i = 0; i < skeleton.length; i++) {
      let initial = skeleton[i][0];
      let final = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(
        initial.position.x,
        initial.position.y,
        final.position.x,
        final.position.y
      );
    }
  }
}
