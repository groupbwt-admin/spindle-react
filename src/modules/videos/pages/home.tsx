import React from "react";
import {MainLayout} from "shared/layout/main-layout";
import {Typography} from "shared/components/typography/typography";
import styled from "@emotion/styled/macro";
import {Button} from "shared/components/button/button";
import {ReactComponent as IconRecord} from "shared/components/icon/collection/record.svg";
import {TabsList} from "shared/components/tabs/tabs-list";
import {Tab} from "shared/components/tabs/tab";


const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

const ContentContainer = styled.div`
`

const Title = styled(Typography)`
	flex-shrink: 0;
`

const RecordButton = styled(Button)`
	max-width: 190px;
	color: #FFFFFF;
`

export const HomePage = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return <MainLayout>
		<HeaderContainer>
			<Title variant="h1">
				My videos
			</Title>
			<RecordButton label="Start Recording" startIcon={<IconRecord/>}/>
		</HeaderContainer>
		<ContentContainer>
			<TabsList value={value} handleChange={handleChange}>
				<Tab label='My videos'/>
				<Tab label='Shared videos'/>
				<Tab label='All videos'/>
			</TabsList>
		</ContentContainer>
	</MainLayout>
}
