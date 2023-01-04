import React, {useEffect, useState} from 'react';
import {useStopWatch} from './useStopWatch'

export const useRecording = (props: any) => {
	const {
		startTimer,
		stopTimer,
		time,
	} = useStopWatch()
	const {videoR} = props
	let stream: any = null
	let audio: any = null
	let mixedStream: any = null
	let recorder: any = null
	let chunks: Blob[] = []
	console.log(time)
	async function setupStream() {
		try {
			stream = await navigator.mediaDevices.getDisplayMedia({
				video: true
			});

			audio = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					sampleRate: 44100,
				},
			});
		} catch (err) {
			console.error(err)
		}
	}


	async function startRecording() {
		await setupStream();

		if (stream && audio) {
			mixedStream = new MediaStream([...stream.getTracks(), ...audio.getTracks()]);
			recorder = new MediaRecorder(mixedStream);
			recorder.ondataavailable = handleDataAvailable;
			recorder.onstop = handleStop;
			recorder.start(1000);
			// startTimer()
			console.log('Recording started');
		} else {
			console.warn('No stream available.');
		}
	}

	function stopRecording() {
		recorder.stop();
	}

	function handleDataAvailable(e) {
		console.log(e.data)
		chunks.push(e.data);
	}

	function handleStop(e) {
		const blob = new Blob(chunks, {'type': 'video/mp4'});
		chunks = [];
		videoR.current.src = URL.createObjectURL(blob);
		videoR.current.load();
		videoR.current.onloadeddata = function () {
			videoR.current.play();
		}
		stream.getTracks().forEach((track) => track.stop());
		audio.getTracks().forEach((track) => track.stop());

		console.log('Recording stopped');

	}

	function pause() {
		recorder.pause()
		// stopTimer()
	}

	function resume() {
		recorder.resume()
		// startTimer()
	}


	return {
		startRecording, stopRecording, pause, resume
	}

}

