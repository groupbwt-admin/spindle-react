import * as React from 'react';
import {Typography} from 'shared/components/typography/typography';
import styled from '@emotion/styled/macro';
import {TabsList} from 'shared/components/tabs/tabs-list';
import {Tab} from 'shared/components/tabs/tab';


const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ContentContainer = styled.div``;

const Title = styled(Typography)`
	flex-shrink: 0;
`;

export const HomePage = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};


	return (
		<>
			<HeaderContainer>
				<Title variant="h1">My videos</Title>
			</HeaderContainer>
			<ContentContainer>
				<TabsList value={value} handleChange={handleChange}>
					<Tab label="My videos"/>
					<Tab label="Shared videos"/>
					<Tab label="All videos"/>
				</TabsList>

			</ContentContainer>
		</>
	);
};
