import {createContext} from "react";

interface IRecordContext {
	isShow: boolean,
	startRecording: () => void
}

export const RecordContext = createContext<IRecordContext>({
	isShow: true,
	startRecording: () => console.log('default')
});
