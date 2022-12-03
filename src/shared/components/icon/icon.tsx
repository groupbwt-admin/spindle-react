import React from "react";
import {styled} from "@mui/material/styles";

const IconWrapper = styled('span')`
	display: inline-flex;
	align-items: center;
	justify-content: center;
`;

interface IconProps {
	className?: string,
	icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>
}

export const Icon: React.FC<IconProps> = ({ className, icon }) => {
	const Component = icon;

	return (
		<IconWrapper className={className} >
			<Component />
		</IconWrapper>
	);
};
