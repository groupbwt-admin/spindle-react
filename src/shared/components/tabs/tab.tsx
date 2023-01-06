import { FormEventHandler } from "react";
import * as React from "react";
import {Tab as ExternalTab, TabProps} from "@mui/material";

interface TabProp extends TabProps{
	value?: number,
	label: string;
	badge?: TabProps['icon'];
	onChange?: FormEventHandler<HTMLDivElement>;
}

export const Tab: React.FC<React.PropsWithChildren<TabProp>> = ({badge, value, label, onChange,...props}) => {
	return <ExternalTab value={value} label={label} onChange={onChange} iconPosition="end" icon={badge} {...props} />;
}
