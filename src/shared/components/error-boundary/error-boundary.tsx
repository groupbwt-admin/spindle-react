import React, { ReactNode } from 'react';

interface Props {
	children?: ReactNode;
}

interface State {
	error: any;
}

export class ErrorBoundary extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	static getDerivedStateFromError(error) {
		return { error };
	}

	componentDidCatch(error, info) {}

	render() {
		if (this.state.error) {
			// You can render any custom fallback UI
			return <h1>{this.state.error?.message}</h1>;
		}

		return this.props.children;
	}
}
