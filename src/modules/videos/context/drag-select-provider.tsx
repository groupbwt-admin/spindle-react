import React, { createContext, useContext } from 'react';

type ProviderProps = {
	containerRef: React.RefObject<HTMLDivElement>;
};

const DragContext = createContext<ProviderProps | undefined>(undefined);

function useDragSelect() {
	return useContext(DragContext);
}

export { DragContext, useDragSelect };
