import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";

const ListItemWithInfo = ({ item, info = "" }) => {
	const [infoVisible, setInfoVisible] = useState(false)

	const handleClick = () => {
		setInfoVisible(prevState => !prevState)
	}

	return (
		<div className="align-vertically">
			<div className="align-horizontally">
				<div className="icon">
					{!infoVisible && info.length > 0 && <FaQuestionCircle onClick={handleClick}/>}
					{infoVisible && <FaWindowClose onClick={handleClick}/>}
				</div>
				<div className="list-item">{item}</div>
			</div>
			{infoVisible && (<div className="tooltip">{info}</div>)}
		</div>
	)
}

export default ListItemWithInfo