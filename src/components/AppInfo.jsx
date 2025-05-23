import { BlueButton } from "./ArcsButton/BlueButton.jsx";

const AppInfo = ({ handleCloseAppInfo }) => {
	return (
		<div className="align-vertical align-center info-block">
			<div className="align-vertical block left-align">
				<details>
					<summary>Source of the Lars bot</summary>
					<ul>
						<li>
							This app was created using the information of the <a
							href="https://boardgamegeek.com/thread/3378766/arcs-solo-bot-lars" target="_blank">ARCS Solo Bot Lars
							rules</a> from Shipple (Andries Lubbe).
						</li>
						<li>
							There is a difference: This app supports 2 and 4 player games, where the rules from Shipple do not
							officially describe it. I've created the rules using the information in the thread on BGG. It is still a work in progress though for now.
						</li>
					</ul>
				</details>

				<details>
					<summary>How to use this app</summary>
					<ul>
						<li>To start a new game, choose how many player there are in total and how many of them are Lars bots. Then choose the map you want to play on.</li>
						<li>After starting the game, the app shows which Lars is which player number for setup. Human players take the remaining player numbers.</li>
						<li>To play a turn of Lars, click a 'Play card' button, depending on if the Lars bot is leading the round or not. Then follow the instructions.</li>
						<li>At the end of a chapter, always click the 'End the Chapter' button, as the app takes care of some things automatically.</li>
					</ul>
				</details>

				<details>
					<summary>Basic Rules for Lars</summary>
					<ul>
						<li>Use standard rules unless explicitly instructed otherwise.</li>
						<li>Lars ignores text on court cards, except Vox cards (see below).</li>
						<li>Lars does not build additional starports and its startport cannot be damaged.</li>
						<li>Deal action cards face down to each Lars bot.</li>
						<li>Each Lars has a Target Planet at all times, which can change during the game. It is the Planet they focus on at that point in time. It is shown in the app.</li>
						<li>Each Lars has a resource called Resource Power, it is used in the End of Chapter portion of the game to gain extra points for Lars that run behind. Use items (agents or a dice for example) on their player board to keep track of this.</li>
						<li>If Lars gains a resource , it will slide resources from the left on their board, discarding overflowing resources at the end of their turn. They get 1 Resource Power per discarded resource.</li>
						<li>If you have to target a system, in tiebreakers it prioritises systems closest to the Target Planet and then the system closest to the Lars starport.</li>
						<li>If you have to target to Lead player, this is always a rival with the most power, prioritising non Lars rivals first.</li>
					</ul>
				</details>

				<details>
					<summary>Vox Cards</summary>
					<span>When securing a Vox card, there might be some conditions that need to be met before Lars can Secure that card.</span>
					<ul>
						<li>Mass uprising: Is always Secured; Is resolved in the Cluster of the Target Planet.</li>
						<li>Populist demands: Lars must win an undeclared ambition; Is resolved on the ambition Lars is winning.</li>
						<li>Outrage spreads: Is always Secured; Is resolved maximising discards for the Lead player.</li>
						<li>Song of freedom: Lars must control a rival city; Is resolved prioritising the Lead player.</li>
						<li>Guild struggle: At least 1 rival must have a guild card; Is resolved prioritising the Lead player.</li>
						<li>Call to action: Is always Secured.</li>
					</ul>
				</details>
			</div>
			<BlueButton onClick={handleCloseAppInfo}>Close info</BlueButton>
		</div>
	)
}

export default AppInfo