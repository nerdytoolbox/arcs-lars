import { useEffect, useState } from "react"
import NewGame from "./components/NewGame"
import Game from "./components/Game";
import { ARCS_STATE, EMPTY_GAME_STATE } from "./util/constants";
import './Arcs.scss'
import { Hub, Title } from "nerdy-lib";

const Arcs = () => {
	// Checks if there is a game state in local storage and sets it to the gameState state variable. If not, it sets the gameState to the empty game state.
	const [gameState, setGameState] = useState(localStorage.getItem(ARCS_STATE) ? JSON.parse(localStorage.getItem(ARCS_STATE)) : JSON.parse(JSON.stringify(EMPTY_GAME_STATE)))
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		setIsDarkMode(mediaQuery.matches);

		const handleChange = (e) => setIsDarkMode(e.matches);
		mediaQuery.addEventListener('change', handleChange);

		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	// Sets the game state in local storage and updates the gameState state variable.
	const handleGameStateChange = (object) => {
		setGameState(prevState => {
			const newState = { ...prevState, ...object }
			localStorage.setItem(ARCS_STATE, JSON.stringify(newState))
			return newState
		})
	}

	const getFooter = () => {
		return (
			<div>
				<a href="https://github.com/nerdytoolbox/arcs-lars/issues/new?template=ISSUE_TEMPLATE.md">Report issues / Feature requests</a>
				<span> | </span>
				<a href="https://boardgamegeek.com/thread/3378766/arcs-solo-bot-lars">Rules from Shipple (Andries Lubbe)</a>
				<span> | </span>
				<span>v1.0.0</span>
			</div>
		)
	}

	return (
		<Hub footer={getFooter()}>
			<Title icon="arcsThumbnail.png" text="Arcs - Lars bots" />
			{!gameState.dateTimeStarted && <NewGame handleGameStateChange={handleGameStateChange} isDarkMode={isDarkMode} />}
			{gameState.dateTimeStarted && <Game gameState={gameState} handleGameStateChange={handleGameStateChange} isDarkMode={isDarkMode} />}
		</Hub>
	)
}

export default Arcs