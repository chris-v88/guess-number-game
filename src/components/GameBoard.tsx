import * as React from 'react';
import { useStore } from 'zustand';

import { useGameStore } from '../store';
import { msgList } from './constants';

type GameBoardProps = {
	isLoseGame: boolean;
	isGameWin: boolean;
	gameHandler: () => void;
};

const GameBoard = (props: GameBoardProps): JSX.Element => {
	const { guessedNumber, message, score, highest, setGuessedNumber } =
		useStore(useGameStore);

	const { isLoseGame, isGameWin, gameHandler } = props;

	return (
		<main className='flex flex-row items-center justify-center mx-6 space-x-7 mt-14'>
			<div className='flex flex-col items-center justify-center space-y-6'>
				<input
					className='w-40 number'
					type='number'
					value={guessedNumber ?? ''}
					onChange={(e) => setGuessedNumber(parseInt(e.target.value))}
				/>
				<button
					className='btn'
					onClick={gameHandler}
					disabled={isLoseGame || isGameWin}
				>
					Check!
				</button>
			</div>
			<div>
				<h2 className='text-xl align-top'>{message.text}</h2>
				<div className='mt-10'>
					<p>
						💯 Score: <span>{score}</span>
					</p>
					<p>
						🥇 Highest: <span>{highest}</span>
					</p>
				</div>
			</div>
		</main>
	);
};

export default GameBoard;
