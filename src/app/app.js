import './app.scss';
import { AppRoutes } from './routes';
import { AppLayout } from '../shared/layout/app-layout';

function App() {
	return (
		<AppLayout>
			<AppRoutes />
		</AppLayout>
	);
}

export default App;
