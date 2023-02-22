import {useState} from "react";

export const useRecordCamera = () => {
	const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

	async function enableVideoStream() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {facingMode: "environment"}
			});
			setMediaStream(stream);
		} catch (err) {
			console.log(err)
		}
	}
	const disabledVideoStream = () => {
		try {
			mediaStream?.getTracks().forEach(track => {
				track.stop();
			});
		} catch (e) {
			console.log(e)
		}
	}


	return {mediaStream, enableVideoStream, disabledVideoStream};
}
