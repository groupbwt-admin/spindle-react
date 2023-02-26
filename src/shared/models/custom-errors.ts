export class BoundaryError {
	message = 'Something went wrong';
}

export class NotFoundVideoBoundaryError extends BoundaryError {
	message = 'Video not found';
}

export class UnauthorisedVideoBoundaryError extends BoundaryError {
	message = 'To watch this video you must log in';
}

export class ForbiddenVideoBoundaryError extends BoundaryError {
	message = 'You do not have permission to access this video';
}
