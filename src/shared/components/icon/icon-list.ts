import { ReactComponent as ArrowLeft } from 'shared/components/icon/collection/arrow-left.svg';
import { ReactComponent as ArrowRightOutlined } from 'shared/components/icon/collection/arrow-right-outlined.svg';
import { ReactComponent as ArrowLeftOutlined } from 'shared/components/icon/collection/arrow-left-outlined.svg';
import { ReactComponent as QuoteIcon } from 'shared/components/icon/collection/quote.svg';
import {ReactComponent as ChevronDown} from 'shared/components/icon/collection/chevron-down.svg'

export const ICON_COLLECTION = {
	arrow_left: ArrowLeft,
	arrow_left_outlined: ArrowLeftOutlined,
	arrow_right_outlined: ArrowRightOutlined,
	quote: QuoteIcon,
	chevron_down: ChevronDown
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = typeof ICON_COLLECTION[Keys];
