const options=document.querySelector(".option").children;
const answerTrackerContainer=document.querySelector(".answers-tracker");
const question = document.querySelector(".question");
const questionsNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-question");
const correctAnswerSpan = document.querySelector(".correct-answer");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");
const op1= document.querySelector(".option1");
const op2= document.querySelector(".option2");
const op3= document.querySelector(".option3");
const op4= document.querySelector(".option4");
//const over = document.querySelector(".quiz-over");
let questionIndex;
let index=0;
let myArray =[];
let myArr=[];
let score = 0;

// questions , option and answer

const questions = [
{
	q: 'What is 6 + 10?',
	options: ['16', '17', '20', '15'],
	answer: 0
},
{
	q: 'In programming what is 10 % 2?',
	options: ['2', '1', '4', '0'],
	answer: 3
},
{
	q: 'What is 50 / 5?',
	options: ['15', '10', '8', '12'],
	answer: 1
},

{
	q: 'What is (3 * 3) + 4?',
	options: ['10', '15', '12', '13'],
	answer: 3
},
{
	q: 'In programming what is (5 ^ 5) % 5 ?',
	options: ['0', '4', '2', '1'],
	answer: 0
},

]

// set questions, option amnd question number
totalQuestionSpan.innerHTML = questions.length;
function load(){
	questionsNumberSpan.innerHTML=index+1;
	question.innerHTML=questions[questionIndex].q;
	op1.innerHTML=questions[questionIndex].options[0];
	op2.innerHTML=questions[questionIndex].options[1];
	op3.innerHTML=questions[questionIndex].options[2];
	op4.innerHTML=questions[questionIndex].options[3];
	index++;


}
function check(element){
	if(element.id==questions[questionIndex].answer){
		element.classList.add("correct");
		updateAnswerTracker("correct")
		score++;
		console.log("score:"+score);
	}
	else{
		element.classList.add("wrong");
		updateAnswerTracker("wrong")
	}

	disabledOptions()
}
function disabledOptions(){
	for (let i = 0; i < options.length; i++) {
		options[i].classList.add("disabled");
		if(options[i].id==questions[questionIndex].answer) {
			options[i].classList.add("correct");
		}
	}

}
function enableOption(){
	for (let i = 0; i < options.length; i++){
		options[i].classList.remove("disabled", "correct", "wrong");
	}

}
function validate(){
	if (!options[0].classList.contains("disabled")) {
		alert("please select answer")
	}
	else{
		enableOption();
		randomQuestion();
	}
}
function next(){
	validate();
}

function randomQuestion(){
	let randomNumber=Math.floor(Math.random()*questions.length);
	let hiDuplicate=0;
	if (index==questions.length) {
		quizOver();
		console.log("over")

	}
	else{
		if (myArray.length>0) {
			for (let i = 0; i < myArray.length; i++) {
				if (myArray[i]==randomNumber) {
					hiDuplicate=1;
					break;
				}
			}
			if (hiDuplicate==1) {
				randomQuestion();

			}
			else{
				questionIndex=randomNumber;
     	        load();
     	        myArr.push(questionIndex);
			}
		}
		 if (myArray.length==0) {
     	questionIndex=randomNumber;
     	load();
     	myArr.push(questionIndex);
	}
    myArray.push(randomNumber);

     }

	
	
	
}


function answerTracker(){
	for (let i = 0; i < questions.length; i++) {
		const div=document.createElement("div")
		answerTrackerContainer.appendChild(div);
	}

}
function updateAnswerTracker(classNam){
	answerTrackerContainer.children[index-1].classList.add(classNam);

}
function quizOver(){
	document.querySelector(".quiz-over").classList.add("show");
	correctAnswerSpan.innerHTML=score;
	totalQuestionSpan2.innerHTML=questions.length;
	percentage.innerHTML=(score/questions.length) * 100 + "%";
	console.log(percentage)
	console.log(correctAnswerSpan)
	console.log(totalQuestionSpan2)

}
function tryAgain(){
	window.location.reload();
}
window.onload=function(){
	randomQuestion()
	answerTracker();

}
