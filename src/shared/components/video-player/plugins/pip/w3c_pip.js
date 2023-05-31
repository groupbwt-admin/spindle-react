export class W3CPip {
	constructor(element) {
		this._el = element;
	}

	get isActive() {
		return document.pictureInPictureElement === this._el;
	}

	get isSupported() {
		return (
			'pictureInPictureEnabled' in document &&
			this._el &&
			!this._el.disablePictureInPicture &&
			typeof this._el.requestPictureInPicture === 'function'
		);
	}

	enterPictureInPicture() {
		return new Promise((resolve, reject) => {
			this.isSupported
				? resolve(this._el.requestPictureInPicture())
				: reject('Picture in picture not supported');
		});
	}

	exitPictureInPicture() {
		return new Promise((resolve, reject) => {
			this.isSupported
				? resolve(document.exitPictureInPicture())
				: reject('Picture in picture not supported');
		});
	}

	togglePictureInPicture() {
		return this.isActive
			? this.exitPictureInPicture()
			: this.enterPictureInPicture();
	}
}
