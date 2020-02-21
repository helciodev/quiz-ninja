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
	response: document.querySelector('#response'),
	timer: document.querySelector('#timer strong'),
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
	},

	setUp() {
		this.show(this.question);
		this.show(this.response);
		this.show(this.result);
		this.hide(this.start);
		this.render(this.score, game.score);
		this.render(this.result, '');
		this.render(this.info, '');
		this.resetForm();
	},

	resetForm() {
		this.response.answer.value = '';
		this.response.answer.focus();
	},

	tearDown() {
		this.hide(this.response);
		this.hide(this.question);
		this.show(this.info);
		this.show(this.start);
	}
};

const game = {
	startQuiz(quiz) {
		this.score = 0; // score iniatilizer
		this.questions = quiz;
		this.secondsRemaining = 20;
		this.timer = setInterval(this.cowntDown, 1000);
		view.setUp();
		this.askQuestion();
	},

	//functions declations
	askQuestion() {
		if (this.questions.length > 0) {
			this.question = this.questions.shift();

			const question = `what is ${this.question.name}'s real name?`;
			view.render(view.question, question);
		} else {
			this.gameOver();
		}
	},

	//checks answer
	check(event) {
		event.preventDefault();
		const response = view.response.answer.value;
		const answer = this.question.realName;
		if (response.toLowerCase() === answer.toLowerCase()) {
			view.render(view.result, 'correct', { class: 'correct' });
			this.score++;
			view.render(view.score, this.score);
		} else {
			view.render(view.result, `wrong the correct answer is ${answer}`, {
				class: 'wrong'
			});
		}
		view.resetForm();

		this.askQuestion();
	},
	//cowntdown method
	cowntDown() {
		game.secondsRemaining--;
		view.render(view.timer, game.secondsRemaining);
		if (game.secondsRemaining < 0) {
			game.gameOver();
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

		view.tearDown();

		clearInterval(this.timer);
	}
};

//game initializer

view.start.addEventListener('click', () => {
	game.startQuiz(quiz);
});

view.response.addEventListener('submit', event => {
	game.check(event);
});

view.response.style.display = 'none';
