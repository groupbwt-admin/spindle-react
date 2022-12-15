import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";

const theme = createTheme({
	palette: {
		primary: {
			main: '#2F48D1',
			light: '#F3F5F7',
			contrastText: '#8192E2'
		},
		info: {
			main: '#FFFFFF',
		},
		background: {
			default: '#F3F5F7',
			paper: '#F3F5F7',
			light: '#FFFFFF',
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
		fontFamily: "'Catamaran', sans-serif",
		h1: {
			fontSize: '32px',
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
			disabled: {
				backgroundColor: '#C8CCDA',
			},
			styleOverrides: {
				root: {
					fontSize: '1rem',
					lineHeight: 1.45,
					fontWeight: 600,
				},
				startIcon: {
					marginLeft: -1,
				},
			},
		},
	},
});

const queryClient = new QueryClient();

console.log(theme)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<App />
					<ReactQueryDevtools initialIsOpen={false} />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
