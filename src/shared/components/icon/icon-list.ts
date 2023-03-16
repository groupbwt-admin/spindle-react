import { ReactComponent as ActionMenu } from 'shared/components/icon/collection/action-menu.svg';
import { ReactComponent as ArrowLeft } from 'shared/components/icon/collection/arrow-left.svg';
import { ReactComponent as ArrowLeftOutlined } from 'shared/components/icon/collection/arrow-left-outlined.svg';
import { ReactComponent as ArrowRightOutlined } from 'shared/components/icon/collection/arrow-right-outlined.svg';
import { ReactComponent as Camera } from 'shared/components/icon/collection/camera.svg';
import { ReactComponent as CameraOff } from 'shared/components/icon/collection/camera-off.svg';
import { ReactComponent as Checkmark } from 'shared/components/icon/collection/check.svg';
import { ReactComponent as ChevronDown } from 'shared/components/icon/collection/chevron-down.svg';
import { ReactComponent as Close } from 'shared/components/icon/collection/close.svg';
import { ReactComponent as Comments } from 'shared/components/icon/collection/comments.svg';
import { ReactComponent as CopyLink } from 'shared/components/icon/collection/copy-link.svg';
import { ReactComponent as DefaultSort } from 'shared/components/icon/collection/default-sort.svg';
import { ReactComponent as Delete } from 'shared/components/icon/collection/delete.svg';
import { ReactComponent as Download } from 'shared/components/icon/collection/download.svg';
import { ReactComponent as DragIndicator } from 'shared/components/icon/collection/drag-indicator.svg';
import { ReactComponent as DragPan } from 'shared/components/icon/collection/drag-pan.svg';
import { ReactComponent as Edit } from 'shared/components/icon/collection/edit.svg';
import { ReactComponent as EditProfile } from 'shared/components/icon/collection/edit-profile.svg';
import { ReactComponent as EmptyCheckbox } from 'shared/components/icon/collection/empty-checkbox.svg';
import { ReactComponent as Filter } from 'shared/components/icon/collection/filter.svg';
import { ReactComponent as Globe } from 'shared/components/icon/collection/globe.svg';
import { ReactComponent as HideMenu } from 'shared/components/icon/collection/hide-menu.svg';
import { ReactComponent as Logout } from 'shared/components/icon/collection/logout.svg';
import { ReactComponent as Microphone } from 'shared/components/icon/collection/microphone.svg';
import { ReactComponent as MicrophoneOff } from 'shared/components/icon/collection/microphone-off.svg';
import { ReactComponent as OpenNew } from 'shared/components/icon/collection/open_new.svg';
import { ReactComponent as OpenMenu } from 'shared/components/icon/collection/open-menu.svg';
import { ReactComponent as Pause } from 'shared/components/icon/collection/pause.svg';
import { ReactComponent as QuoteIcon } from 'shared/components/icon/collection/quote.svg';
import { ReactComponent as Reset } from 'shared/components/icon/collection/reset.svg';
import { ReactComponent as Resume } from 'shared/components/icon/collection/resume.svg';
import { ReactComponent as Search } from 'shared/components/icon/collection/search.svg';
import { ReactComponent as Settings } from 'shared/components/icon/collection/settings.svg';
import { ReactComponent as SignIn } from 'shared/components/icon/collection/sign-in.svg';
import { ReactComponent as SortArrowDown } from 'shared/components/icon/collection/sort-down-arrow.svg';
import { ReactComponent as SortArrowUp } from 'shared/components/icon/collection/sort-up-arrow.svg';
import { ReactComponent as StartRecord } from 'shared/components/icon/collection/start-record.svg';
import { ReactComponent as Stop } from 'shared/components/icon/collection/stop.svg';
import { ReactComponent as Views } from 'shared/components/icon/collection/views.svg';
import { ReactComponent as Calendar } from 'shared/components/icon/collection/сalendar.svg';

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
	views: Views,
	comments: Comments,
	edit_profile: EditProfile,
	search: Search,
	action_menu: ActionMenu,
	copy_link: CopyLink,
	delete: Delete,
	download: Download,
	settings: Settings,
	filter: Filter,
	default_sort: DefaultSort,
	sort_arrow_up: SortArrowUp,
	sort_arrow_down: SortArrowDown,
	calendar: Calendar,
	checkmark: Checkmark,
	globe: Globe,
	stop: Stop,
	pause: Pause,
	reset: Reset,
	resume: Resume,
	microphone: Microphone,
	microphone_off: MicrophoneOff,
	drag_indicator: DragIndicator,
	camera: Camera,
	camera_off: CameraOff,
	drag_pan: DragPan,
	open_new: OpenNew,
	open_menu: OpenMenu,
	hide_menu: HideMenu,
	sign_in: SignIn,
	start_record: StartRecord,
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = (typeof ICON_COLLECTION)[Keys];
