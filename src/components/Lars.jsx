import ArcsButton from "./ArcsButton/ArcsButton.jsx";
import { useState } from "react";
import ListItemWithInfo from "./ListItemWithInfo";
import { ID } from "../util/constants";
import { randomNumber } from "../util/randomNumber.js";

const Lars = ({ nLars, state, map, handleMoveFocus }) => {
	const [playLeadCard, setPlayLeadCard] = useState(false);
	const [playFollowCard, setPlayFollowCard] = useState(false);
	const [cardSuit, setCardSuit] = useState(null);
	const [showInstructions, setShowInstructions] = useState(false);
	const [declareAmbition, setDeclareAmbition] = useState(false);
	const [copyLeadCard, setCopyLeadCard] = useState(false);
	const [seizeInitiative, setSeizeInitiative] = useState(false);
	const [moveFocus, setMoveFocus] = useState(false);

	// Functions that randomly decide if certain actions should be taken
	const fDeclareAmbition = () => {
		if (randomNumber(1, 2) === 1) {
			setDeclareAmbition(true)
		}
	}

	const fMoveFocus = () => {
		if (randomNumber(1, 3) === 1) {
			setMoveFocus(true)
		}
	}

	const fCopyLeadCard = () => {
		if (randomNumber(1, 2) === 1) {
			setCopyLeadCard(true)
		}
	}

	const fSeizeInitiative = () => {
		if (randomNumber(1, 6) === 1) {
			setSeizeInitiative(true)
		}
	}

	// Functions that handle the button clicks
	const handlePlayLeadCard = () => {
		// If the lead card is already played, do nothing
		if (playLeadCard) {
			return
		}

		setPlayLeadCard(true)
		fDeclareAmbition()
		fMoveFocus()
	}

	const handlePlayFollowCard = () => {
		// If the follow card is already played, do nothing
		if (playFollowCard) {
			return
		}

		setPlayFollowCard(true)
		fMoveFocus()
		fCopyLeadCard()
		fSeizeInitiative()
	}

	const handleSuitButton = (value) => {
		setCopyLeadCard(false)
		setCardSuit(value)
		setShowInstructions(true)
	}

	const handleDoneButton = () => {
		// If the target planet must be moved, call the handleMoveFocus function for this Lars
		if (moveFocus) {
			handleMoveFocus(nLars)
		}

		resetTurn()
	}

	const resetTurn = () => {
		setPlayLeadCard(false)
		setPlayFollowCard(false)
		setCardSuit(null)
		setDeclareAmbition(false)
		setCopyLeadCard(false)
		setMoveFocus(false)
		setShowInstructions(false)
	}

	// Helper functions that generate (randomly generated) instructions for a specific Action
	const showInfluenceInstructions = () => {
		let targetCourtCard = map.courtCards[state.targetPlanet]
		if (targetCourtCard === 5) {
			// In a 4 player game, the target court card can be 5, but there are 4 cards. Just choose a random card
			targetCourtCard = randomNumber(1, 4)
		}

		let main;
		let rival;
		switch (randomNumber(1, 6)) {
			case 1:
			case 2:
				main = `Add 1 agent to court card ${targetCourtCard}.`
				break
			case 3:
			case 4:
				main = `Add 2 agents to court card ${targetCourtCard}.`
				break
			case 5:
				main = `Add 1 agent to court card ${targetCourtCard}.`
				rival = `Add 1 agent to each court card with rival agents.`
				break
		}

		const returnDivs = []
		if (main) returnDivs.push(<ListItemWithInfo item={main} />)
		if (rival) returnDivs.push(<ListItemWithInfo item={rival} />)
		return returnDivs
	}

	const showRepairInstructions = () => {
		const main = `Repair all loyal buildings.`
		const focus = `Repair 1 loyal ship in the Gate of Cluster ${state.targetPlanet}.`
		const id = `Repair 1 loyal ship on each planet of symbol ${ID[state.targetPlanetID]}.`

		return [
			<ListItemWithInfo item={main} />,
			<ListItemWithInfo item={focus} />,
			<ListItemWithInfo item={id} />
		]
	}

	const showBuildInstructions = () => {
		const cityInfo = `Priority: Planets with symbol ${ID[state.targetPlanetID]} > Different planet resource than other cities > Most fresh loyal ships.`

		return [
			<ListItemWithInfo item="Build 1 city where Lars has control." info={cityInfo} />,
			<ListItemWithInfo item="Build 3 ships at starport." />,
			<ListItemWithInfo item="If nothing was build, repair all loyal ships and buildings." />
		]
	}

	const showMoveInstructions = () => {
		const moveInfo = `It wants to control systems in this order: Target planet (Cluster ${state.targetPlanet} - ${ID[state.targetPlanetID]}) > ${ID[state.targetPlanetID]} planets with empty building slots > ${ID[state.targetPlanetID]} planets with rival cities > ${ID[state.targetPlanetID]} planets with rival starports > ${ID[state.targetPlanetID]} planets with rival ships > The Gate of Cluster ${state.targetPlanet}. If it cannot catapult to the system, it will first move ships to systems on the way to take away control.`

		return [
			<ListItemWithInfo item="Remove fresh loyal ships from systems with no rival ships (leave 1 behind if there are buildings)." />,
			<ListItemWithInfo item="Place removed ships on planet with owned starport." />,
			<ListItemWithInfo item="Catapult move ships from starport until there are none left." info={moveInfo} />
		]
	}

	const showBattleInstructions = () => {
		return [
			<ListItemWithInfo item="In each system with rival ships. battle once with only skirmish dice." info="Defender: Rival with most power. Maximise the number of damaged ships (also for Lars)." />,
			<ListItemWithInfo item={`In the Gate of Cluster ${state.targetPlanet} and all ${ID[state.targetPlanetID]} planets, battle once. See info.`} info="Defender: Rival with most power. If defender has city and no ships: roll up to 2 raid dice per defender city, remainder skirmish dice, defender chooses what gets stolen, don't provoke outrage. Otherwise: Round half (up) assault dice, remainder skirmish dice." />
		]
	}

	const showSuitInstructions = () => {
		const returnDivs = []

		switch (cardSuit) {
			case "Aggression":
				returnDivs.push(<ListItemWithInfo item="Secure all cards in court where Lars has more agents." />)
				returnDivs.push(showMoveInstructions())
				returnDivs.push(showBattleInstructions())
				break;
			case "Administration":
				returnDivs.push(showInfluenceInstructions())
				returnDivs.push(showRepairInstructions())
		returnDivs.push(<ListItemWithInfo item="Tax all valid cities" info="Owned and controlled rival cities." />)
				break
			case "Mobilisation":
				returnDivs.push(showInfluenceInstructions())
				returnDivs.push(showMoveInstructions())
				break;
			case "Construction":
				returnDivs.push(showRepairInstructions())
				returnDivs.push(showBuildInstructions())
				break;
		}

		return returnDivs
	}

	return (
		<div className="align-vertically center-align">
			<div className="center-align bold">{`Player ${state.playerNumber}`}</div>
			<div className="center-align">{`Target planet: Cluster ${state.targetPlanet} - ${ID[state.targetPlanetID]}`}</div>
			<div className="align-horizontally center-align">
				{playFollowCard !== true && <ArcsButton value="Play lead card" size="large" onClick={handlePlayLeadCard} selected={playLeadCard} />}
				{playLeadCard !== true && <ArcsButton value="Play follow card" size="large" onClick={handlePlayFollowCard} selected={playFollowCard} />}
			</div>
			{copyLeadCard && <div className="center-align block">Copy lead card</div>}
			{(playLeadCard || playFollowCard) && (
				<div className="align-horizontally center-align">
					{(cardSuit === null || cardSuit === "Aggression") && <ArcsButton value="Aggression" size="large" onClick={() => handleSuitButton("Aggression")} selected={cardSuit === "Aggression"} />}
					{(cardSuit === null || cardSuit === "Administration") && <ArcsButton value="Administration" size="large" onClick={() => handleSuitButton("Administration")} selected={cardSuit === "Administration"} />}
					{(cardSuit === null || cardSuit === "Mobilisation") && <ArcsButton value="Mobilisation" size="large" onClick={() => handleSuitButton("Mobilisation")} selected={cardSuit === "Mobilisation"} />}
					{(cardSuit === null || cardSuit === "Construction") && <ArcsButton value="Construction" size="large" onClick={() => handleSuitButton("Construction")} selected={cardSuit === "Construction"} />}
				</div>
			)}
			{showInstructions && (
				<div className="align-vertically center-align">
					{declareAmbition && <ListItemWithInfo item="Declare ambition" info="Declare highest ambition to the corresponding card. 4 player game: If card is a 1, ignore. If the card is a 7  roll a dice to determine the ambition (reroll on 1)." />}
					{seizeInitiative && <ListItemWithInfo item="Seize initiative. Increase Resource power by 2." info="If Lars can lead next turn and initiative has not yet been seized, play an extra card and give Lars the first player marker. 4 player game: If the card is a 7, don't play the extra card and don't gain 2 Resource Power." />}
					{showSuitInstructions()}
					{moveFocus && <ListItemWithInfo item="At the end of the turn, the Target Planet will be moved automatically." />}
					<div className="center-align">
						<ArcsButton value="Cancel" size="large" onClick={resetTurn} />
						<ArcsButton value="Done" size="large" onClick={handleDoneButton} />
					</div>
				</div>
			)}
		</div>
	)
}

export default Lars