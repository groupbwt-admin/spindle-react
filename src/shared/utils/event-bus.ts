import EventEmitter from 'eventemitter3';

export enum RECORDING_EVENTS {
	start = 'start',
	prev_stop = 'prev_stop',
}


export type EventBusEvents =
	| RECORDING_EVENTS


const eventEmitter = new EventEmitter();

const Emitter = {
	on: (event: EventBusEvents, fn) => eventEmitter.on(event, fn),

	once: (event: EventBusEvents, fn) => eventEmitter.once(event, fn),

	off: (event: EventBusEvents, fn) => eventEmitter.off(event, fn),

	emit: (event: EventBusEvents, payload?) => eventEmitter.emit(event, payload),
};

Object.freeze(Emitter);

export {Emitter as EventBus};
