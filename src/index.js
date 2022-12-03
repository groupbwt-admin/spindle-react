import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: '#2F48D1',
			light: '#F3F5F7'
		},
		info: {
			main: '#FFFFFF'
		},
		background: {
			default: '#F3F5F7',
			paper: '#F3F5F7',
			light: '#FFFFFF'
		},
		text: {
			primary: '#231D2C',
			secondary: '#828CB1'
		},
		error: {
			main: '#FF5656'
		}
	},
	typography: {
		fontFamily: "'Catamaran', sans-serif",
		h1: {
			fontFamily: "'Catamaran', sans-serif",
			fontSize: '32px',
			fontWeight: 700,
			color: '#231D2C'
		},
		caption: {
			fontSize: '1.125rem',
			opacity: 0.5
		}
	},
	components: {
		MuiMobileStepper: {
			styleOverrides: {
				dot: {
					width: 8,
					height: 8,
					background: 'rgba(255, 255, 255, 0.5)',
					margin: '0 6px',
					transition: 'background 0.3s ease'
				},
				dotActive: {
					background : '#FFFFFF'
				}
			}
		},
		MuiButton: {
			disabled: {
				backgroundColor: '#C8CCDA'
			}
		}
	}
});

console.log(theme)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
