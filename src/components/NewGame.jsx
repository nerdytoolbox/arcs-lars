import { useState } from "react";
import { EMPTY_GAME_STATE, LOCATIONS, MAPS } from "../util/constants";
import { getOutOfPlayLocations } from "../util/getOutOfPlayLocations.js";
import AppInfo from "./AppInfo";
import { shuffleArray } from "../util/shuffleArray.js";
import { BlueButton, LightBlueButton, SmallGhostButton, WhiteButton } from "./ArcsButton/ArcsButtons.jsx";

const NewGame = ({ handleGameStateChange, isDarkMode }) => {
	const [nPlayers, setNPlayers] = useState(2)
	const [nLars, setNLars] = useState(1)
	const [selectedMap, setSelectedMap] = useState(null)
	const [infoSelected, setInfoSelected] = useState(false)

	const handlePlayerClick = (value) => {
		setNPlayers(value)
		setSelectedMap(null) // Reset selected map when changing number of players
	}

	const handleStartGame = () => {
		const gameState = {
			...JSON.parse(JSON.stringify(EMPTY_GAME_STATE)), // Start with an empty gameState
			dateTimeStarted: new Date().toLocaleString(),
			nPlayers,
			nLars,
			map: selectedMap,
		}

		// Determine which player number the Lars are
		const playersArray = shuffleArray(Array.from({length: nPlayers}, (_, i) => i + 1)).slice(0, nLars).sort()

		// Determine the starting Target Planet of the Lars
		const inPlayLocations = shuffleArray(LOCATIONS.filter(location => !getOutOfPlayLocations(MAPS[selectedMap]).includes(location)))

		for (let i = 0; i < nLars; i++) {
			gameState[`lars${i+1}`].playerNumber = playersArray[i]
			gameState[`lars${i+1}`].targetPlanet = inPlayLocations[i].slice(0,1) // From format <targetPlanet>-<targetPlanetID>
			gameState[`lars${i+1}`].targetPlanetID = inPlayLocations[i].slice(2,3) // From format <targetPlanet>-<targetPlanetID>
		}

		handleGameStateChange(gameState)
	}

	// Filter which maps to show based on the number of players
	const maps = Object.keys(MAPS).filter(map => map.startsWith(nPlayers.toString()))

	return (
		<div className="align-vertical align-center">
			{!infoSelected && (
				isDarkMode ?
					<BlueButton onClick={() => setInfoSelected(true)}>Info</BlueButton> :
					<LightBlueButton onClick={() => setInfoSelected(true)}>Info</LightBlueButton>
			)}
			{infoSelected && <AppInfo handleCloseAppInfo={() => setInfoSelected(false)} isDarkMode={isDarkMode} />}

			<h1>New Game</h1>
			<div className="align-horizontal align-center block">
				<span># Players</span>
				<SmallGhostButton selected={nPlayers === 2} onClick={() => handlePlayerClick(2)}>2</SmallGhostButton>
				<SmallGhostButton selected={nPlayers === 3} onClick={() => handlePlayerClick(3)}>3</SmallGhostButton>
				<SmallGhostButton selected={nPlayers === 4} onClick={() => handlePlayerClick(4)}>4</SmallGhostButton>
			</div>

			<div className="align-horizontal align-center block">
				<span># Lars</span>
				<SmallGhostButton selected={nLars === 1} onClick={() => setNLars(1)}>1</SmallGhostButton>
				<SmallGhostButton selected={nLars === 2} onClick={() => setNLars(2)}>2</SmallGhostButton>
			</div>

			<div className="align-vertical align-center block">
				<span>Map for {nPlayers} players</span>
				{maps.map((map, index) => (
					<WhiteButton key={index} selected={selectedMap === map} onClick={() => setSelectedMap(map)}>{map.slice(1, map.length)}</WhiteButton>
				))}
			</div>

			{selectedMap && (
				isDarkMode ?
					<BlueButton onClick={handleStartGame}>Start Game</BlueButton> :
					<LightBlueButton onClick={handleStartGame}>Start Game</LightBlueButton>
			)}

			{/*DEV ArcsButton to be able to change the initial state*/}
			{/*<div className="start-game">*/}
			{/*	<ToggleButton value={"Remove State"} size="large" type="primary" onClick={() => localStorage.removeItem(ARCS_STATE)} />*/}
			{/*</div>*/}
		</div>
	)
}

export default NewGame