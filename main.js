const quiz = [
	{ name: 'Superman', realName: 'Clark Kent' },
	{ name: 'Wonder woman', realName: 'Diana Prince' },
	{ name: 'Batman', realName: 'Bruce Wayne' }
];

const view = {
	score: document.querySelector('#score strong'),
	question: document.getElementById('question'),
	result: document.getElementById('result'),
	info: document.getElementById('info'),
	render(target, content, attributes) {
		for (const key in attributes) {
			target.setAttribute(key, attributes[key]);
		}
		target.innerHTML = content;
	},
	start: document.getElementById('start'),

	show(element) {
		element.style.display = 'block';
	},
	hide(element) {
		element.style.display = 'none';
	}
};

const game = {
	startQuiz(quiz) {
		view.hide(view.start);
		this.questions = quiz;
		this.score = 0; // score iniatilizer

		// loop over questions
		for (const question of this.questions) {
			this.question = question;
			this.askQuestion();
		}
		this.gameOver();
	},

	//functions declations
	askQuestion() {
		const question = `what is ${this.question.name}'s real name`;
		view.render(view.question, question);
		const response = prompt(question);
		this.check(response);
	},

	//checks answer
	check(response) {
		const answer = this.question.realName;
		if (response.toLowerCase() === answer.toLowerCase()) {
			view.render(view.result, 'correct', { class: 'correct' });
			alert('correct!');
			this.score++;

			view.render(view.score, this.score);
		} else {
			view.render(view.result, 'wrong!', { class: 'wrong' });
			alert(`😝 wrong the corect answer was ${answer}`);
		}
	},

	//game over function

	gameOver() {
		//at the end of the game, report the player's score
		view.render(
			view.info,
			`game over
			you scored ${this.score} point${this.score !== 1 ? 's' : ''}`
		);

		view.show(view.start);
	}
};

//game initializer

view.start.addEventListener('click', () => {
	game.startQuiz(quiz), false;
});
