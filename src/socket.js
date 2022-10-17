import io from "socket.io-client";
const socket = io('https://react-chatek-server.herokuapp.com/');

//const socket = io('localhost:80');
console.log('socket created:',socket);
export default socket;