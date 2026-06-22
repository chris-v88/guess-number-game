import { useStore } from 'zustand';
import { useGameStore } from './store';
import { msgList } from './components/constants';

import './App.css';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';

const App = () => {
	const {
		score,
		guessedNumber,
		correctNumber,
		setCorrectNumber,
		setGuessedNumber,
		setMessage,
		setScore,
		setScoreList,
		resetScores,
	} = useStore(useGameStore);

	const [isGameLose, setIsGameLose] = useState(score <= 1);
	const [isGameWin, setIsGameWin] = useState(false);

	const resetHandler = () => {
		setCorrectNumber();
		setMessage({
			text: 'Start guessing...',
		});
		setGuessedNumber(null);
		setScore(20);
		if (isGameLose) {
			resetScores();
			setIsGameLose(false);
		}
		setIsGameWin(false);
	};

	const gameHandler = () => {
		if (score <= 1) {
			setMessage(msgList.loseGame);
			setIsGameLose(true);
		} else {
			checkNumber();
		}
	};

	const checkNumber = () => {
		if (!guessedNumber) {
			setMessage(msgList.noInput);
		} else if (guessedNumber > correctNumber) {
			setScore(score - 1);
			setMessage(msgList.inputHigher);
		} else if (guessedNumber < correctNumber) {
			setScore(score - 1);
			setMessage(msgList.inputLower);
		} else {
			setScoreList(score);
			gameWin();
		}
	};

	const gameWin = () => {
		setIsGameWin(true);
		setMessage(msgList.correctInput);
	};

	// useEffect for changing background color based on game state
	useEffect(() => {
		const body = document.body;
		body.classList.remove('bg-red-900', 'bg-green-900', 'bg-gray-800');

		if (isGameWin) {
			body.classList.add('bg-green-900');
		} else if (isGameLose) {
			body.classList.add('bg-red-900');
		} else {
			body.classList.add('bg-gray-800');
		}
	}, [isGameWin, isGameLose]);

	// TODO: fix style so that footer is at bottom
	return (
		<div className='flex flex-col min-h-screen'>
			<Header
				isLoseGame={isGameLose}
				isGameWin={isGameWin}
				resetHandler={resetHandler}
			/>
			<GameBoard
				gameHandler={gameHandler}
				isLoseGame={isGameLose}
				isGameWin={isGameWin}
			/>
			<Footer />
		</div>
	);
};

export default App;
