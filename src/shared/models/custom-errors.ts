export class BoundaryError {
	message = 'Something went wrong';
}

export class NotFoundVideoBoundaryError extends BoundaryError {
	message = 'Video not found';
}
