import * as React from 'react';
import {Tabs as ExternalTabs} from "@mui/material";

interface TabsProps{
	value: number;
	handleChange?: (event: React.SyntheticEvent, newValue: any) => void;
}

export const TabsList: React.FC<React.PropsWithChildren<TabsProps>> = ({value, handleChange, children}) => {

	return  <ExternalTabs
		value={value}
		onChange={handleChange}
		indicatorColor="primary"
		aria-label="secondary tabs example"
	 >
		{ children }
	</ExternalTabs>
}
