import { AppLayout } from '../shared/layout/app-layout';

import { AppRoutes } from './routes';

import './app.scss';

function App() {
	return (
		<AppLayout>
			<AppRoutes />
		</AppLayout>
	);
}

export default App;
