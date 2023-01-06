import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface AuthLinkProps {
	to: LinkProps['to'];
}

export const AuthLink: React.FC<React.PropsWithChildren<AuthLinkProps>> = ({
	to,
	children,
}) => {
	return <Link to={to}>{children}</Link>;
};
