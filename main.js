const quiz = [
	{ name: 'Superman', realName: 'Clark Kent' },
	{ name: 'Wonder woman', realName: 'Diana Prince' },
	{ name: 'Batman', realName: 'Bruce Wayne' }
];

const game = {
	startQuiz(quiz) {
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
		const response = prompt(question);
		this.check(response);
	},

	//checks answer
	check(response) {
		const answer = this.question.realName;
		if (response.toLowerCase() === answer.toLowerCase()) {
			alert('correct!');
			this.score++;
		} else {
			alert(`😝 wrong the corect answer was ${answer}`);
		}
	},

	//game over function

	gameOver() {
		//at the end of the game, report the player's score
		alert(
			`Game Over, you scored ${this.score} ${
				this.score !== 1 ? 'points' : 'point'
			}`
		);
	}
};

//game initializer

game.startQuiz(quiz);
