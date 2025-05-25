import { EMPTY_GAME_STATE, LOCATIONS, MAPS } from "../util/constants";
import { useState } from "react";
import Lars from "./Lars";
import AppInfo from "./AppInfo";
import EndOfChapter from "./EndOfChapter";
import { randomNumber } from "../util/randomNumber.js";
import { BlueButton, GrayButton } from "./ArcsButton/BlueButton.jsx";
import { Button } from "nerdy-lib";

const Game = ({ gameState, handleGameStateChange, selectedLars, handleSelectLars }) => {
	const [infoSelected, setInfoSelected] = useState(false)
	const [endOfChapterSelected, setEndOfChapterSelected] = useState(false)

	const handleResetGame = () => {
		handleGameStateChange(JSON.parse(JSON.stringify(EMPTY_GAME_STATE)))
	}

	const handleMoveFocus = (nLars) => {
		const larsState = JSON.parse(JSON.stringify(gameState[`lars${nLars}`]))

		const nextPossibleLocations = LOCATIONS.filter(location => !MAPS[gameState.map].outOfPlay.includes(location) && !Object.values(MAPS[gameState.map].larsStarport).includes(location) && location !== larsState.targetPlanet + "-" + larsState.targetPlanetID)
		const randomPlanetNumber = randomNumber(0, nextPossibleLocations.length-1)

		larsState.targetPlanet = nextPossibleLocations[randomPlanetNumber].slice(0,1)
		larsState.targetPlanetID = nextPossibleLocations[randomPlanetNumber].slice(2,3)

		handleGameStateChange({
			[`lars${nLars}`]: larsState
		})
	}

	const handleEndOfChapterDone = () => {
		for (let i = 1; i <= gameState.nLars; i++) {
			handleMoveFocus(i)
		}

		setEndOfChapterSelected(false)
	}

	return (
		<div className="align-vertical align-center">
			{infoSelected && <AppInfo handleCloseAppInfo={() => setInfoSelected(false)} />}
			{!infoSelected && <BlueButton onClick={() => setInfoSelected(true)}>Info</BlueButton>}
			<div className="datetime align-center">Game started on {gameState.dateTimeStarted}</div>
			<div className="map-info align-center">{`Map: ${gameState.nPlayers} players, ${gameState.map.slice(1, gameState.map.length)}`}</div>
			<div className="align-horizontal align-center wrap">
				{!endOfChapterSelected && <GrayButton onClick={() => setEndOfChapterSelected(true)}>End of Chapter</GrayButton>}
				{endOfChapterSelected && <GrayButton onClick={() => setEndOfChapterSelected(false)}>Cancel</GrayButton>}
				<GrayButton value="Reset Game" onClick={handleResetGame}>Reset Game</GrayButton>
			</div>
			{endOfChapterSelected && <EndOfChapter handleConfirmEndOfChapter={handleEndOfChapterDone} handleExitEndOfChapter={() => setEndOfChapterSelected(false)} />}
			{gameState.nLars === 2 && (
				<div className="align-vertical align-center">
					<hr width="100%" />
					<div className="align-horizontal">
						<Button color={gameState.lars1.playerColor} size="size4" selected={selectedLars === 1} onClick={() => handleSelectLars(1)}>Lars 1</Button>
						<Button color={gameState.lars2.playerColor} size="size4" selected={selectedLars === 2} onClick={() => handleSelectLars(2)}>Lars 2</Button>
					</div>
				</div>
			)}
			{selectedLars === 1 && (<Lars nLars={1} state={gameState.lars1} map={MAPS[gameState.map]} handleMoveFocus={handleMoveFocus} />)}
			{selectedLars === 2 && (<Lars nLars={2} state={gameState.lars2} map={MAPS[gameState.map]} handleMoveFocus={handleMoveFocus} />)}
		</div>
	)
}

export default Game