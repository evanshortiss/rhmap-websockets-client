
const MESSAGE_TYPES = {
  MESSAGE: {
    SEND: 'message.send',
    LIST: 'message.list',
    INVALID_FORMAT: 'message.invalid'
  }
};

export function getMessageTypes () {
  return MESSAGE_TYPES;
}
