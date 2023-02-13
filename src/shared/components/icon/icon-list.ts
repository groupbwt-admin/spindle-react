import { ReactComponent as ActionMenu } from 'shared/components/icon/collection/action-menu.svg';
import { ReactComponent as ArrowLeft } from 'shared/components/icon/collection/arrow-left.svg';
import { ReactComponent as ArrowLeftOutlined } from 'shared/components/icon/collection/arrow-left-outlined.svg';
import { ReactComponent as ArrowRightOutlined } from 'shared/components/icon/collection/arrow-right-outlined.svg';
import { ReactComponent as ChevronDown } from 'shared/components/icon/collection/chevron-down.svg';
import { ReactComponent as Close } from 'shared/components/icon/collection/close.svg';
import { ReactComponent as Comments } from 'shared/components/icon/collection/comments.svg';
import { ReactComponent as CopyLink } from 'shared/components/icon/collection/copy-link.svg';
import { ReactComponent as DefaultSort } from 'shared/components/icon/collection/default-sort.svg';
import { ReactComponent as Delete } from 'shared/components/icon/collection/delete.svg';
import { ReactComponent as Download } from 'shared/components/icon/collection/download.svg';
import { ReactComponent as Edit } from 'shared/components/icon/collection/edit.svg';
import { ReactComponent as EditProfile } from 'shared/components/icon/collection/edit-profile.svg';
import { ReactComponent as EmptyCheckbox } from 'shared/components/icon/collection/empty-checkbox.svg';
import { ReactComponent as Filter } from 'shared/components/icon/collection/filter.svg';
import { ReactComponent as Logout } from 'shared/components/icon/collection/logout.svg';
import { ReactComponent as QuoteIcon } from 'shared/components/icon/collection/quote.svg';
import { ReactComponent as Search } from 'shared/components/icon/collection/search.svg';
import { ReactComponent as Settings } from 'shared/components/icon/collection/settings.svg';
import { ReactComponent as SortArrowDown } from 'shared/components/icon/collection/sort-down-arrow.svg';
import { ReactComponent as SortArrowUp } from 'shared/components/icon/collection/sort-up-arrow.svg';
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
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = typeof ICON_COLLECTION[Keys];
