import {createContext, useContext} from "react";

interface IDragWrapperContext {
	handelMouseDown: () => void,
	handelMouseUp: () => void,
}

export const DragWrapperContext = createContext<IDragWrapperContext>({
	handelMouseDown: () => {
	},
	handelMouseUp: () => {
	}
});

export const useDragWrapperContext = () => {
	const {handelMouseDown, handelMouseUp} = useContext(DragWrapperContext);
	return {
		handelMouseDown, handelMouseUp
	}
}
