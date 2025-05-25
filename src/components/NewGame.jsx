import { useState } from "react";
import { EMPTY_GAME_STATE, LOCATIONS, MAPS } from "../util/constants";
import { getOutOfPlayLocations } from "../util/getOutOfPlayLocations.js";
import AppInfo from "./AppInfo";
import { shuffleArray } from "../util/shuffleArray.js";
import { Button } from "nerdy-lib";
import { BlueButton } from "./ArcsButton/BlueButton.jsx";

const NewGame = ({ handleGameStateChange }) => {
	const [nPlayers, setNPlayers] = useState(2)
	const [nLars, setNLars] = useState(1)
	const [larsColor, setLarsColor] = useState(["red", "blue"])
	const [selectedMap, setSelectedMap] = useState(null)
	const [infoSelected, setInfoSelected] = useState(false)

	const handlePlayerClick = (value) => {
		setNPlayers(value)
		setSelectedMap(null) // Reset selected map when changing number of players
	}

	const handleLarsColor = (larsNumber, color) => {
		setLarsColor(prevState => {
			const newState = [...prevState]
			newState[larsNumber - 1] = color
			return newState
		})
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
			gameState[`lars${i+1}`].playerColor = larsColor[i]
			gameState[`lars${i+1}`].targetPlanet = inPlayLocations[i].slice(0,1) // From format <targetPlanet>-<targetPlanetID>
			gameState[`lars${i+1}`].targetPlanetID = inPlayLocations[i].slice(2,3) // From format <targetPlanet>-<targetPlanetID>
		}

		handleGameStateChange(gameState)
	}

	// Filter which maps to show based on the number of players
	const maps = Object.keys(MAPS).filter(map => map.startsWith(nPlayers.toString()))

	return (
		<div className="align-vertical align-center">
			{!infoSelected && <BlueButton onClick={() => setInfoSelected(true)}>Info</BlueButton>}
			{infoSelected && <AppInfo handleCloseAppInfo={() => setInfoSelected(false)} />}

			<h1>New Game</h1>
			<div className="align-horizontal align-center block">
				<span># Players</span>
				<Button size="size0" fill="ghost" selected={nPlayers === 2} onClick={() => handlePlayerClick(2)}>2</Button>
				<Button size="size0" fill="ghost" selected={nPlayers === 3} onClick={() => handlePlayerClick(3)}>3</Button>
				<Button size="size0" fill="ghost" selected={nPlayers === 4} onClick={() => handlePlayerClick(4)}>4</Button>
			</div>

			<div className="align-horizontal align-center block">
				<span># Lars</span>
				<Button size="size0" fill="ghost" selected={nLars === 1} onClick={() => setNLars(1)}>1</Button>
				<Button size="size0" fill="ghost" selected={nLars === 2} onClick={() => setNLars(2)}>2</Button>
			</div>

			<div className="align-horizontal align-center block">
				<span>Player color of Lars {nLars > 1 ? "1": ""}</span>
				<Button size="size1" fill="filled" color="red" selected={larsColor[0] === "red"} disabled={larsColor[1] === "red"} onClick={() => handleLarsColor(1, "red")}>Red</Button>
				<Button size="size1" fill="filled" color="blue" selected={larsColor[0] === "blue"} disabled={larsColor[1] === "blue"} onClick={() => handleLarsColor(1, "blue")}>Blue</Button>
				<Button size="size1" fill="filled" color="yellow" selected={larsColor[0] === "yellow"} disabled={larsColor[1] === "yellow"} onClick={() => handleLarsColor(1, "yellow")}>Yellow</Button>
				<Button size="size1" fill="filled" color="gray" selected={larsColor[0] === "gray"} disabled={larsColor[1] === "gray"} onClick={() => handleLarsColor(1, "gray")}>White</Button>
			</div>

			{nLars > 1 && (
				<div className="align-horizontal align-center block">
					<span>Player color of Lars {nLars > 1 ? "2": ""}</span>
					<Button size="size1" fill="filled" color="red" selected={larsColor[1] === "red"} disabled={larsColor[0] === "red"} onClick={() => handleLarsColor(2, "red")}>Red</Button>
					<Button size="size1" fill="filled" color="blue" selected={larsColor[1] === "blue"} disabled={larsColor[0] === "blue"} onClick={() => handleLarsColor(2, "blue")}>Blue</Button>
					<Button size="size1" fill="filled" color="yellow" selected={larsColor[1] === "yellow"} disabled={larsColor[0] === "yellow"} onClick={() => handleLarsColor(2, "yellow")}>Yellow</Button>
					<Button size="size1" fill="filled" color="gray" selected={larsColor[1] === "gray"} disabled={larsColor[0] === "gray"} onClick={() => handleLarsColor(2, "gray")}>White</Button>
				</div>
			)}

			<div className="align-vertical align-center block">
				<span>Map for {nPlayers} players</span>
				{maps.map((map, index) => (
					<Button key={index} size="size5" fill="filled" selected={selectedMap === map} onClick={() => setSelectedMap(map)}>{map.slice(1, map.length)}</Button>
				))}
			</div>

			{selectedMap && <BlueButton onClick={handleStartGame}>Start Game</BlueButton>}

			{/*<Button size="size4" onClick={() => localStorage.removeItem(ARCS_STATE)}>Remove State</Button>*/}
		</div>
	)
}

export default NewGame