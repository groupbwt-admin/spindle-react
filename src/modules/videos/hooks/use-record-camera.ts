import {useEffect, useState} from "react";

export const useRecordCamera = () => {
	const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

	useEffect(() => {
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

		if (!mediaStream) {
			enableVideoStream();
		} else {
			return function cleanup() {
				mediaStream.getTracks().forEach(track => {
					track.stop();
				});
			};
		}
	}, [mediaStream]);

	return {mediaStream};
}
