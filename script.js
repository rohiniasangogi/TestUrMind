function page1(){
    location.href="second.html";
}
var playing = false;
var score;
var timeRemaining;
var correctAnswer;
document.getElementById("startReset").onclick = function () {
    if (playing == true) { //if playing
        location.reload(); //reload page
    } else {//if not playing
        playing = true;//set in playing mode
        score = 0;//set score to 0
        timeRemaining = 60;//set timeRemaining
        document.getElementById("scoreValue").innerHTML = score;
        show("timeRemaining");//show countdown box and reduce time by every 1 sec
        startTimer();
        reset();//change button to Reset Game
        generateQA();//generate new q & a
    }
};

function startTimer() {
    timer = setInterval(function () {
        timeRemaining--;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        if (timeRemaining == 0) {//no more time -> gameover
            show("gameOver");//show Game Over
            stopTime();//stop the timer
            endScore();//show total score
            hide("correct");//hide all boxes
            hide("wrong");
            hide("timeRemaining");
            start();//change button to start game
        }
    }, 1000);
}

function generateQA() {
    var x = Math.round(Math.random() * 24) + 1;
    var y = Math.round(Math.random() * 24) + 1;
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    //randomize the correct answer in 1 of 4 boxes
    var correctPos = Math.round(Math.random() * 3) + 1;
    document.getElementById("box" + correctPos).innerHTML = correctAnswer;
    //show wrong answers in other 3 boxes
    var answer = [correctAnswer];
    for (let i = 1; i < 5; i++) {
        var wrongAnswer;
        if (i !== correctPos) {
            do {
                wrongAnswer = (Math.round(Math.random() * 24) + 1) * (Math.round(Math.random() * 24) + 1);
            } while (answer.indexOf(wrongAnswer) > -1);
            document.getElementById("box" + i).innerHTML = wrongAnswer;
        }
    }

}

for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        if (playing == true) {//check if we are playing
            if (this.innerHTML == correctAnswer) {//correct answer
                score++;//increase score by 1
                document.getElementById("scoreValue").innerHTML = score;
                hide("wrong");//show correct box and hide the wrong box
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);
                generateQA();//generate new Q&A
            } else {//wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    }
}

function show(id) {
    document.getElementById(id).style.display = "block";
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function reset() {
    document.getElementById("startReset").innerHTML = "Reset Game";
}

function start() {
    document.getElementById("startReset").innerHTML = "Start Game";
}

function endScore() {
    let heading1=document.getElementById("heading1");
    let heading2=document.getElementById("heading2");
    let button=document.getElementById("Back");
    heading1.innerHTML="GAME OVER";
    heading2.innerHTML="YOUR SCORE IS "+score;
    button.innerHTML="HOME";
    

    // document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>";
//     let game=document.getElementById("gameover");
//     let home=document.createElement("button");
//     home.innerHTML="HOME";
//     home.classList.add('Back');
//     game.appendChild(home);
// 
}

function home(){
    location.href="index.html";


}
function stopTime() {
    clearInterval(timer);
}