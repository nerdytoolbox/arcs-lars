import './ArcsButton.scss'
import { Button } from "nerdy-lib";

export const BlueButton = ({ children, onClick, selected }) => {
	return (
		<Button size="size4" fill="filled" color="blue" onClick={onClick} selected={selected}>
			{children}
		</Button>
	)
}

export const GrayButton = ({ children, onClick, selected }) => {
	return (
		<Button size="size4" fill="filled" color="gray" onClick={onClick} selected={selected}>
			{children}
		</Button>
	)
}
