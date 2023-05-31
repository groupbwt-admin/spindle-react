import { Events, UICorePlugin } from '@clappr/core';

const icon = `
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
	>
		<path fill="none" d="M0 0h24v24H0V0z" />
		<path d="M19 11h-8v6h8v-6zm4 10V3H1v18h22zm-2-1.98H3V4.97h18v14.05z" />
	</svg>
`;

export class PipButton extends UICorePlugin {
	constructor(core) {
		super(core);
		this.bindClick();
	}

	get name() {
		return 'pip_button';
	}

	get tagName() {
		return 'button';
	}

	get pipPlugin() {
		return this.core.getPlugin('pip');
	}

	get isPipSupported() {
		return this.pipPlugin && this.pipPlugin.isPictureInPictureSupported();
	}

	get attributes() {
		return {
			class: 'media-control-button media-control-icon pip-button',
		};
	}

	bindEvents() {
		if (this.core.ready) {
			this.listenTo(
				this.core.mediaControl,
				Events.MEDIACONTROL_RENDERED,
				this.addButtonToMediaControl,
			);
		} else {
			this.listenToOnce(this.core, Events.CORE_READY, this.bindEvents);
		}
	}

	bindClick() {
		this.$el.click(() => this.togglePictureInPicture());
	}

	togglePictureInPicture() {
		this.pipPlugin && this.pipPlugin.togglePictureInPicture();
	}

	hide() {
		this.$el.hide();
	}

	show() {
		this.$el.show();
	}

	addButtonToMediaControl() {
		this.$el.remove();
		if (!this.isPipSupported) return;
		this.core.mediaControl
			.$('.media-control-button[data-fullscreen]')
			.after(this.el);
	}

	render() {
		this.$el.css({ float: 'right', height: '100%' });
		this.$el.append(icon);
		// small tweak to prevent clappr style conflict
		this.$el.find('path[fill=none]').css({ fill: 'none' });
	}
}
