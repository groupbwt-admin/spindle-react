export const RECORDING_STATUS = {
	recording: 'recording',
	idle: 'idle',
	error: 'error',
	stopped: 'stopped',
	paused: 'paused',
	permission_requested: 'permission_requested',
	interrupt: 'interrupt',
	start: 'start',
}

export const SOCKET_ACTIONS = {
	connect: "connect",
	disconnect: 'disconnect',
	start: 'record:start',
	save: 'record:save',
	generate_video_path: 'record:generate-video-path',
	reset: 'record:reset',
}
