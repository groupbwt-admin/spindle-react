import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import jwtDecode from 'jwt-decode';
import { LocalStorageService } from './shared/services/local-storage-service';
import reportWebVitals from './reportWebVitals';
import { authState } from './app/store/auth/state';
import App from './app/app';
import { IToken } from './shared/types/token';

const theme = createTheme({
	palette: {
		primary: {
			main: '#2F48D1',
			light: '#8192E2',
			contrastText: '#FFFFFF',
		},
		info: {
			main: '#FFFFFF',
		},
		background: {
			default: '#F3F5F7',
			paper: '#F3F5F7',
		},
		text: {
			primary: '#231D2C',
			secondary: '#828CB1',
		},
		error: {
			main: '#FF5656',
		},
	},
	typography: {
		fontFamily: 'Catamaran, sans-serif',
		h1: {
			fontSize: '32px',
			lineHeight: '52px',
			fontWeight: 700,
			color: '#231D2C',
		},
		h3: {
			fontSize: '18px',
			lineHeight: '24px',
			fontWeight: 700,
		},
		caption: {
			fontSize: '1.125rem',
			opacity: 0.5,
		},
		subtitle2: {
			fontSize: '12px',
		},
	},
	components: {
		MuiMobileStepper: {
			styleOverrides: {
				dot: {
					width: 8,
					height: 8,
					background: 'rgba(255, 255, 255, 0.5)',
					margin: '0 6px',
					transition: 'background 0.3s ease',
				},
				dotActive: {
					background: '#FFFFFF',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					disabled: {
						backgroundColor: '#C8CCDA',
					},
					fontSize: '1rem',
					lineHeight: 1.45,
					fontWeight: 600,
				},
				startIcon: {
					marginLeft: -1,
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					opacity: 1,
					fontSize: '18px',
					paddingLeft: 0,
					marginRight: '32px',
					color: '#828CB1',
					transition: 'color 0.3s ease',
					'&.Mui-selected': {
						fontWeight: '700',
						color: '#231D2C',
					},
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					padding: 0,
					borderRadius: 0,
				},
			},
		},
		MuiFormControlLabel: {
			styleOverrides: {
				root: {
					marginLeft: 0,
				},
			},
		},
	},
});

const queryClient = new QueryClient();

(function () {
	const savedToken = LocalStorageService.get('token');

	if (savedToken) {
		const decodedJwtToken: IToken = jwtDecode(LocalStorageService.get('token'));

		const currentTime = Date.now() / 1000;
		const isExpired = decodedJwtToken.exp <= currentTime;

		if (!isExpired) {
			authState.setUser(savedToken);
		}

		if (isExpired) {
			LocalStorageService.remove('token');
		}
	}
})();

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<App />
					<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	</StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
