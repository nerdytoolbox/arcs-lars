export const getOutOfPlayLocations = (mapData, currentPlayerNumber, activeLarsPlayerNumbers) => {
	const rivalStarports = activeLarsPlayerNumbers
		.filter(playerNumber => playerNumber !== currentPlayerNumber)
		.map(playerNumber => mapData.larsStarport[playerNumber])

	return [...mapData.outOfPlay, ...rivalStarports]
}