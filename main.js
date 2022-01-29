function setup()
{
canvas = createCanvas(250, 250);
canvas.center();
video = createCapture(VIDEO);
video.hide();
classifier=ml5.imageClassifier('Mobile Net',modelLoaded);
}
function modelLoaded()
{
console.log('Model is Loaded!');
}
function draw()
{
image(video,0,0,250,250);
classifier.classify(video,gotResult);
}
var presult='null';
function gotResult(error, results)
{
if(error)
{
console.error(error);
}
else
{
if((results[0].confidence>0.5)&&(presult!=results[0].label))
{console.log(results);
presult=results[0].label;
var synth=window.speechSynthesis;
speakdata='Object Detected is'+results[0].label;
var UtterThis=new SpeechSynthesisUtterance(speakdata);
synth.speak(UtterThis);
document.getElementById("result_object_name").innerHTML=results[0].label;
document.getElementById("result_object_accurancy").innerHTML=results[0].confidence.toFixed(3);
}
}
}