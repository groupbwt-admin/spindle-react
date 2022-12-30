import { forwardRef, InputHTMLAttributes, useRef } from 'react';
import * as React from 'react';
import {css, styled} from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import mergeRefs from 'shared/utils/merge-refs';

export interface FileInputProps {
	name?: InputHTMLAttributes<HTMLInputElement>['name'];
	label?: React.ReactNode;
	accept?: Array<string>;
	multiple?: boolean;
	maxSize?: number; //in bytes
	errorMessage?: React.ReactNode;
	onChange: (files: File[]) => void;
	onError: (files: FileInvalidDropzone[]) => void;
}

export enum DropzoneErrors {
	MAX_SIZE = 'MAX_SIZE',
	TYPE = 'TYPE',
}

export interface FileInvalidDropzone {
	file: File;
	errors: string[];
}

const StyledError = styled('div')(
	({ theme }) => css`
		font-size: 0.75rem;
		color: ${theme.palette.error.main};
		padding: 8px 0 0 8px;
		width: 100%;

	`,
);

const FileInputRoot: React.ForwardRefRenderFunction<
	HTMLInputElement,
	FileInputProps
> = ({ accept, maxSize, errorMessage, onChange, onError }, ref) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const checkTypeFile = (file: File) => {
		return !(accept?.indexOf(file.type) === -1);
	};

	const checkFileSize = (file: File) => {
		return !maxSize ? true : file.size <= maxSize;
	};

	const validateFiles = (files: FileList) => {
		const validFiles: File[] = [];
		const invalidFiles: FileInvalidDropzone[] = [];

		for (let i = 0; i < files.length; i++) {
			const file: FileInvalidDropzone = {
				file: files[i],
				errors: [],
			};

			if (!checkTypeFile(files[i])) {
				file.errors.push(DropzoneErrors.TYPE);
			}
			if (!checkFileSize(files[i])) {
				file.errors.push(DropzoneErrors.MAX_SIZE);
			}

			if (file.errors.length) invalidFiles.push(file);
			else validFiles.push(files[i]);
		}

		return {
			validFiles: validFiles,
			invalidFiles: invalidFiles,
		};
	};

	const filesSelected = () => {
		if (fileInputRef?.current?.files?.length) {
			handleFiles(fileInputRef.current.files);
		}
	};

	const handleFiles = (files: FileList) => {
		const { validFiles, invalidFiles } = validateFiles(files);

		if (validFiles.length) {
			onChange(validFiles);
		}
		if (invalidFiles.length) onError(invalidFiles);
		clearInput();
	};

	function clearInput() {
		if (!fileInputRef.current) return;
		fileInputRef.current.value = '';
	}

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
			<Button
				disableElevation
				variant="contained"
				component="label"
				sx={{
					padding: '8px 16px',
					borderRadius: 24,
					textTransform: 'none',
					fontSize: 12,
				}}
			>
				<span>Upload picture</span>
				<input
					hidden
					accept="image/*"
					multiple
					type="file"
					onChange={filesSelected}
					ref={mergeRefs(fileInputRef, ref)}
				/>
			</Button>
			{errorMessage && (
				<StyledError>
					{errorMessage}
				</StyledError>
			)}
		</Box>
	);
};

export const FileInput = forwardRef(FileInputRoot);
