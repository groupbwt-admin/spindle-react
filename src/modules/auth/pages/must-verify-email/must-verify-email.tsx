import { styled } from '@mui/material/styles';
import { Typography } from 'shared/components/typography/typography';
import { useMutation } from 'react-query';
import { AuthApi } from 'app/api/auth-api/auth-api';
import { Button } from 'shared/components/button/button';
import { ButtonList } from 'shared/components/button-list/button-list';
import { useLogout } from 'shared/hooks/use-logout';
import {selectUserData} from "app/store/user/selects";

const Title = styled(Typography)`
	margin-top: 20px;
	text-align: center;
`;

const Description = styled(Typography)`
	max-width: 424px;
	text-align: center;
	padding: 20px 0;
`;

const Container = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

const StyledButtonList = styled(ButtonList)`
	flex-direction: column;
`;

export const MustVerifyEmailPage = () => {
	const userData = selectUserData();
	const useLogoutHook = useLogout();
	const resendRegisterMutation = useMutation(AuthApi.resendConfirmationLink);

	const handleResendEmail = () => {
		resendRegisterMutation.mutate();
	};

	const handleLogout = () => {
		useLogoutHook.logout();
	};

	return (
		<Container>
			<Title variant="h1">Verify your email address</Title>
			<Description variant="body1">
				Almost there! We’ve sent an email to {userData?.email} to verify
				your email address and activate your account. The link in the email will
				expire in 24 hours.
			</Description>
			<Description variant="body1">Didn&apos;t receive the email?</Description>
			<StyledButtonList>
				<Button
					label="Resend Email"
					isLoading={resendRegisterMutation.isLoading}
					fullWidth
					onClick={handleResendEmail}
				/>
				<Button label="Sign Out" variant='outlined' fullWidth onClick={handleLogout} />
			</StyledButtonList>
		</Container>
	);
};
