import io from 'socket.io-client';

const URL: string = process.env.REACT_APP_SOCKET_URI || '';

export default io.connect(URL);
