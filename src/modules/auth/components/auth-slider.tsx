import * as React from 'react';
import Box from '@mui/material/Box';
import {css, styled, useTheme} from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import {Avatar} from "@mui/material";
import {IconButton} from "shared/components/button/icon-button";
import {Icon} from 'shared/components/icon/icon'
import {ReactComponent as ArrowRight} from 'shared/components/icon/collection/arrow-right.svg'
import {ReactComponent as ArrowLeft} from 'shared/components/icon/collection/arrow-left.svg'
import {ReactComponent as QuoteIcon} from 'shared/components/icon/collection/quote.svg';
import {Typography} from "shared/components/typography/typography";

const steps = [
	{
		label: 'Select campaign settings',
		description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis odio eu facilisis viverra. Mauris lobortis, eros sit amet porta semper, justo odio semper eros, pulvinar varius nisi justo at erat. Curabitur non rhoncus ipsum.`,
	},
	{
		label: 'Create an ad group',
		description:
			'An ad group contains one or more ads which target a shared set of keywords.',
	},
	{
		label: 'Create an ad',
		description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
	},
];

const QuoteContainer = styled(Box)(({theme}) => css`
	max-height: 444px;
	height: 380px;
	max-width: 560px;
	padding: 32px;
	background-color: ${theme.palette.common.white};
	box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
	border-radius: 20px;
	font-size: 1.125rem;
	line-height: 1.875rem;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
`)

const AuthIconButton = styled(IconButton)`
	&.Mui-disabled {
		opacity: 0.1;
	}

	opacity: 0.5;
	transition: opacity 0.3s ease;

	&:hover {
		opacity: 1;
	}
`

const QuoteIconStyled = styled(Icon)`
	margin-right: auto;
	margin-bottom: 8px;
`

export const AuthSlider = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = steps.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const ButtonLeft = <AuthIconButton onClick={handleBack} disabled={activeStep === 0}>
		<Icon icon={ArrowLeft}/>
	</AuthIconButton>

	const ButtonRight = <AuthIconButton onClick={handleNext} disabled={activeStep === maxSteps - 1}>
		<Icon icon={ArrowRight}/>
	</AuthIconButton>

	return (
		<Box sx={{ maxWidth: '560px', flexGrow: 1 }}>
			<QuoteContainer>
				<QuoteIconStyled icon={QuoteIcon}/>
				{steps[activeStep].description}
				<Avatar
					alt="Remy Sharp"
					src="https://politeka.net/crops/c3f33f/360x0/1/0/2019/11/12/C02RGv1hy3O3PcANSkg1ENxLbLXtJoypIiQlrTmN.jpeg"
					sx={{ width: 100, height: 100, mt: 4 }}
				/>
				<Typography variant={'h1'}>
					Rebecca Philips
				</Typography>
				<Typography variant={'caption'}>
					Marketing Manager
				</Typography>
			</QuoteContainer>
			<MobileStepper
				sx={{background: 'transparent', mt: 10}}
				variant="dots"
				steps={maxSteps}
				position="static"
				activeStep={activeStep}
				nextButton={ButtonRight}
				backButton={ButtonLeft}
			/>
		</Box>
	);
}

