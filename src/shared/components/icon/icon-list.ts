import {ReactComponent as ArrowLeft} from 'shared/components/icon/collection/arrow-left.svg';
import {ReactComponent as ArrowRightOutlined} from 'shared/components/icon/collection/arrow-right-outlined.svg';
import {ReactComponent as ArrowLeftOutlined} from 'shared/components/icon/collection/arrow-left-outlined.svg';
import {ReactComponent as QuoteIcon} from 'shared/components/icon/collection/quote.svg';
import {ReactComponent as ChevronDown} from 'shared/components/icon/collection/chevron-down.svg';
import {ReactComponent as EmptyCheckbox} from 'shared/components/icon/collection/empty-checkbox.svg';
import {ReactComponent as Logout} from 'shared/components/icon/collection/logout.svg';
import {ReactComponent as Edit} from 'shared/components/icon/collection/edit.svg';
import {ReactComponent as Close} from 'shared/components/icon/collection/close.svg';
import {ReactComponent as Stop} from 'shared/components/icon/collection/stop.svg';
import {ReactComponent as Pause} from 'shared/components/icon/collection/pause.svg';
import {ReactComponent as Reset} from 'shared/components/icon/collection/reset.svg';
import {ReactComponent as Resume} from 'shared/components/icon/collection/resume.svg';
import {ReactComponent as Microphone} from 'shared/components/icon/collection/microphone.svg';
import {ReactComponent as MicrophoneOff} from 'shared/components/icon/collection/microphone-off.svg';
import {ReactComponent as DragIndicator} from 'shared/components/icon/collection/drag-indicator.svg';

export const ICON_COLLECTION = {
	arrow_left: ArrowLeft,
	arrow_left_outlined: ArrowLeftOutlined,
	arrow_right_outlined: ArrowRightOutlined,
	quote: QuoteIcon,
	chevron_down: ChevronDown,
	empty_checkbox: EmptyCheckbox,
	logout: Logout,
	edit: Edit,
	close: Close,
	stop: Stop,
	pause: Pause,
	reset: Reset,
	resume: Resume,
	microphone: Microphone,
	microphone_off: MicrophoneOff,
	drag_indicator: DragIndicator,
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = typeof ICON_COLLECTION[Keys];
