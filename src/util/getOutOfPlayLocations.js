export const getOutOfPlayLocations = (mapData) => {
	return [...mapData.outOfPlay, ...Object.values(mapData.larsStarport)]
}