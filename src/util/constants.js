export const ARCS_STATE = "arcsState"

export const EMPTY_GAME_STATE = Object.freeze({
	dateTimeStarted: null,
	map: null,
	nPlayers: null,
	nLars: null,
	lars1: {
		playerNumber: null,
		targetPlanet: null,
		targetPlanetID: null,
	},
	lars2: {
		playerNumber: null,
		targetPlanet: null,
		targetPlanetID: null,
	}
})

export const ID = {
	1: "Rocket",
	2: "Moon",
	3: "Hexagon",
}

export const MAPS = {
	"2Homelands": {
		courtCards: {
			2: 1,
			3: 2,
			5: 3,
			6: 4,
		},
		outOfPlay: [
			"1-1",
			"1-2",
			"1-3",
			"4-1",
			"4-2",
			"4-3",
		],
		larsStarport: {
			1: "6-1",
			2: "3-1",
		}
	},
	"2Frontiers": {
		courtCards: {
			2: 1,
			3: 2,
			4: 3,
			5: 4,
		},
		outOfPlay: [
			"1-1",
			"1-2",
			"1-3",
			"6-1",
			"6-2",
			"6-3",
		],
		larsStarport: {
			1: "4-3",
			2: "5-1",
		}
	},
	"2Mix Up 1": {
		courtCards: {
			1: 1,
			3: 2,
			4: 3,
			6: 4,
		},
		outOfPlay: [
			"2-1",
			"2-2",
			"2-3",
			"5-1",
			"5-2",
			"5-3",
		],
		larsStarport: {
			1: "3-2",
			2: "3-3",
		}
	},
	"2Mix Up 2": {
		courtCards: {
			2: 1,
			3: 2,
			5: 3,
			6: 4,
		},
		outOfPlay: [
			"1-1",
			"1-2",
			"1-3",
			"4-1",
			"4-2",
			"4-3",
		],
		larsStarport: {
			1: "2-1",
			2: "6-1",
		}
	},
	"3Homelands": {
		courtCards: {
			1: 1,
			2: 2,
			3: 3,
			4: 4,
		},
		outOfPlay: [
			"5-1",
			"5-2",
			"5-3",
			"6-1",
			"6-2",
			"6-3",
		],
		larsStarport: {
			1: "3-2",
			2: "2-1",
			3: "4-3",
		}
	},
	"3Frontiers": {
		courtCards: {
			1: 1,
			4: 2,
			5: 3,
			6: 4,
		},
		outOfPlay: [
			"2-1",
			"2-2",
			"2-3",
			"3-1",
			"3-2",
			"3-3",
		],
		larsStarport: {
			1: "4-3",
			2: "1-2",
			3: "6-1",
		}
	},
	"3Core Conflict": {
		courtCards: {
			1: 1,
			2: 2,
			4: 3,
			5: 4,
		},
		outOfPlay: [
			"3-1",
			"3-2",
			"3-3",
			"6-1",
			"6-2",
			"6-3",
		],
		larsStarport: {
			1: "2-2",
			2: "1-2",
			3: "2-1",
		}
	},
	"3Mix Up": {
		courtCards: {
			2: 1,
			3: 2,
			5: 3,
			6: 4,
		},
		outOfPlay: [
			"1-1",
			"1-2",
			"1-3",
			"4-1",
			"4-2",
			"4-3",
		],
		larsStarport: {
			1: "5-2",
			2: "2-1",
			3: "3-1",
		}
	},
	"4Frontiers": {
		courtCards: {
			1: 1,
			2: 2,
			3: 3,
			4: 4,
			6: 5,
		},
		outOfPlay: [
			"5-1",
			"5-2",
			"5-3",
		],
		larsStarport: {
			1: "3-2",
			2: "6-3",
			3: "2-1",
			4: "6-1",
		}
	},
	"4Mix Up 1": {
		courtCards: {
			1: 1,
			2: 2,
			4: 3,
			5: 4,
			6: 5,
		},
		outOfPlay: [
			"3-1",
			"3-2",
			"3-3",
		],
		larsStarport: {
			1: "6-3",
			2: "5-3",
			3: "1-3",
			4: "1-1",
		}
	},
	"4Mix Up 2": {
		courtCards: {
			1: 1,
			2: 2,
			3: 3,
			5: 4,
			6: 5,
		},
		outOfPlay: [
			"4-1",
			"4-2",
			"4-3",
		],
		larsStarport: {
			1: "3-1",
			2: "5-2",
			3: "1-3",
			4: "2-1",
		}
	},
	"4Mix Up 3": {
		courtCards: {
			1: 1,
			2: 2,
			3: 3,
			4: 4,
			5: 5,
		},
		outOfPlay: [
			"6-1",
			"6-2",
			"6-3",
		],
		larsStarport: {
			1: "5-2",
			2: "3-1",
			3: "4-3",
			4: "2-2",
		}
	}
}

export const LOCATIONS = [
	"1-1",
	"1-2",
	"1-3",
	"2-1",
	"2-2",
	"2-3",
	"3-1",
	"3-2",
	"3-3",
	"4-1",
	"4-2",
	"4-3",
	"5-1",
	"5-2",
	"5-3",
	"6-1",
	"6-2",
	"6-3",
]
