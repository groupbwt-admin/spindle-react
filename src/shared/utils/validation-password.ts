export type ValidationPasswordErrors = {
	hasNotValue?: string;
	notContainDigit?: string;
	notContainSymbol?: string;
	notContainLower?: string;
	notContainUpper?: string;
	minLength?: string;
};

export const validatePassword = (value: string) => {
	const errors: ValidationPasswordErrors = {};

	const hasValue = !!value?.trim().length;
	const containDigit = RegExp('.*\\d.*').test(value);
	const containSymbol = RegExp('[@#$%^&*]').test(value);
	const containLower = RegExp('.*[a-z].*').test(value);
	const containUpper = RegExp('.*[A-Z].*').test(value);
	const minLength = value.length >= 8;

	if (!hasValue) errors.hasNotValue = 'This field is required';
	if (!containDigit)
		errors.notContainDigit = 'Field must contain at least 1 digit';
	if (!containSymbol)
		errors.notContainSymbol = 'Field must contain at least 1 symbol: @#$%^&*';
	if (!containLower)
		errors.notContainLower =
			'Field must contain characters in upper and lower case';
	if (!containUpper)
		errors.notContainUpper =
			'Field must contain characters in upper and lower case';
	if (!minLength)
		errors.minLength = 'Field must be at list 8 characters length';

	return errors;
};
