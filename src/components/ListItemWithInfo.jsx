import { useState } from "react";
import { FaQuestionCircle, FaWindowClose } from "react-icons/fa";

const ListItemWithInfo = ({ item, info = "" }) => {
	const [infoVisible, setInfoVisible] = useState(false)

	const handleClick = () => {
		setInfoVisible(prevState => !prevState)
	}

	return (
		<div className="align-vertical">
			<div className="align-horizontal">
				{info.length > 0 && (
					<div className="icon">
						{!infoVisible && <FaQuestionCircle onClick={handleClick}/>}
						{infoVisible && <FaWindowClose onClick={handleClick}/>}
					</div>
				)}
				<div className="list-item">{item}</div>
			</div>
			{infoVisible && (<div className="tooltip">{info}</div>)}
		</div>
	)
}

export default ListItemWithInfo