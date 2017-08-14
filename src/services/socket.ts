import * as io from 'socket.io-client';

let host: string;

export function setHost (newHost: string) {
  host = newHost;
}

export function getSocket () {
  if (!host) {
    throw new Error('cannot call getSocket before setHost');
  }

  return io(host + '/chat', {
    // transports: ['websocket', 'polling']
    upgrade: true
  });
}
