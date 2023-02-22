import {useSnapshot} from 'valtio';

import {socketState} from 'app/store/record-socket/state';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const selectStatus = () => useSnapshot(socketState).recordStatus;
// eslint-disable-next-line react-hooks/rules-of-hooks
export const selectIsRecording = () => useSnapshot(socketState).isRecording;
// eslint-disable-next-line react-hooks/rules-of-hooks
export const selectIsOnline = () => useSnapshot(socketState).isOnline;

