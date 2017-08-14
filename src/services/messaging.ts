import { getSocket } from './socket';
import { Observable } from 'rxjs/Observable';
import { getMessageTypes } from '../models/message-types';
import { Message } from '../models/message';
import { getUserFirstname, getUserLastname } from './storage';
import { getFHParams } from 'fh-js-sdk';

/**
 * Returns an observable that makes messages that come from the server available for consumption
 */
export function getMessageObservable () {
  const sock = getSocket();

  return new Observable((observer) => {
    // Once a single message is received emit it
    sock.on(getMessageTypes().MESSAGE.SEND, (message) => {
      observer.next(message)
    });

    // If we get a list, emit them all in series
    sock.on(getMessageTypes().MESSAGE.LIST, (messages) => {
      return messages.map(m => observer.next(m));
    })
  });
}

/**
 * Returns an observable that will propogate errors when they are sent to us from the server
 */
export function getMessageErrorObservable () {
  const sock = getSocket();

  return new Observable((observer) => {
    sock.on(getMessageTypes().MESSAGE.INVALID_FORMAT, err => observer.next(err));
  });
}


/**
 * Send the provided string of text to teh server as a chat message
 * @param msg
 */
export function sendMessage (msg: string): Promise<Message> {
  const sock = getSocket();

  return Promise.all([
      getUserFirstname(),
      getUserLastname()
    ])
      .then((names) => {
        const payload: Message = {
          text: msg,
          ts: new Date(),
          firstname: names[0],
          lastname: names[1],
          deviceId: getFHParams().cuid
        };

        // Send message and display locally
        sock.emit(getMessageTypes().MESSAGE.SEND, payload);

        return payload;
      });
}
