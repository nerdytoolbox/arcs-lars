import { Button } from "nerdy-lib";

const SIZE = "size4";

export const LightBlueButton = ({ children, onClick, selected }) => {
	return (
		<Button size={SIZE} color="blue" shade1="shade3" onClick={onClick} selected={selected}>
			{children}
		</Button>
	)
}

export const BlueButton = ({ children, onClick, selected }) => {
	return (
		<Button size={SIZE} color="blue" shade1="shade8" shade2="shade16" onClick={onClick} selected={selected}>
			{children}
		</Button>
	)
}

export const WhiteButton = ({ children, onClick, selected }) => {
	return (
		<Button size={SIZE} shade1="shade0" shade2="shade14" onClick={onClick} selected={selected}>
			{children}
		</Button>
	)
}

export const SmallGhostButton = ({ children, onClick, selected }) => {
	return (
		<Button size="size0" fill="ghost" onClick={onClick} selected={selected}>
			{children}
		</Button>
	)
}