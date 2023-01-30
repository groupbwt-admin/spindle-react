import {useSnapshot,} from 'valtio';
import {socketState} from 'app/store/video/state';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const selectSocketEmit = () => useSnapshot(socketState).emit
// eslint-disable-next-line react-hooks/rules-of-hooks
export const selectSocketEmitSave = () => useSnapshot(socketState).save
// eslint-disable-next-line react-hooks/rules-of-hooks
export const selectSocketConnect = () => useSnapshot(socketState).connect


