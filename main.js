img = "";
Status = "";
objects = [];

function setup() {
    canvas = createCanvas(800, 500);
    canvas.center();
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("check").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
    objectdetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    objects = results
}

function preload() {
    img = loadImage('dog_cat.jpg');
}

function draw() {
    image(img, 0, 0, 800, 500);
    fill("red");
    noFill();
    stroke("red");
    if (Status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("check").innerHTML = "Object(s) Found";
            
            percent = Math.floor(objects[i].confidence * 100);

            text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 13);
            rect(objects[i].x , objects[i].y, objects[i].width , objects[i].height);
        }
    }
}