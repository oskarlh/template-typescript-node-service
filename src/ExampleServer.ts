import { Server, Socket, createServer } from "net";

async function withTcpServer(
	onNewConnection: (
		close: () => void,
		closeSignal: AbortSignal,
		send: ArrayBuffer | Uint8Array,
		setMessageListener: (onMessage: () => void) => void,
	) => void,
	closeServerAndSocketsSignal: AbortSignal,
) {
	const server: Server = createServer((socket: Socket) => {});

	const y = 4;
	close();
	return 4;
}

function a(e: string[]) {
	// return all strings that contain digits
}
