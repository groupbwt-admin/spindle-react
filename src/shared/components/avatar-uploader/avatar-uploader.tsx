import {Avatar, Box} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {FileInput, FileInputProps} from "shared/components/input/file-input";

const StyledLabel = styled('label')`
	width: 100%;
	margin-bottom: 13px;
`;

interface AvatarUploaderProps extends FileInputProps {
	avatar?: string
}

export const AvatarUploader:React.FC<AvatarUploaderProps> = ({onChange, onError, avatar, errorMessage, maxSize}) => {
	return <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
		<StyledLabel>Profile Picture</StyledLabel>
		<Avatar sx={{ width: 46.5, height: 46.5, mr: 3 }} alt="user-photo" src={avatar}/>
		<FileInput onChange={onChange} onError={onError} errorMessage={errorMessage} maxSize={maxSize} />
	</Box>
}
