import ArcsButton from "./ArcsButton/ArcsButton.jsx";

const EndOfChapter = ({ handleConfirmEndOfChapter }) => {
	return (
		<div className="align-vertically center-align info-block">
			<h1>End of Chapter Rules</h1>

			<ul>
				<li>Score declared ambitions as normal, also taking Lars bots into account.</li>
				<li>Then, also score the undeclared ambitions only for the Lars bots (do not take into account player resources), use the lowest ambition score token to determine points. Do not return trophies and captives and do not score city bonuses.</li>
				<li>Then, score the Resource Power of each Lars and then discard them. If Lars is first, he does not score. If
					Lars is second, he gets 1 point per Resource Power. Otherwise, Lars get's 2 points per Resource Power.
				</li>
				<li>The Target Planet will be moved automatically after clicking the "Confirm" button.</li>
			</ul>

			<ArcsButton value="Confirm End of Chapter" type="primary" onClick={handleConfirmEndOfChapter}/>
		</div>
	)
}

export default EndOfChapter