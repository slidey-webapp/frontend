import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_PROXY_API_HOST || 'http://localhost:5000', {
    autoConnect: false,
    transports: ['websocket'],
    path: process.env.REACT_APP_SOCKET_API_URL || '/api/socket',
});

const SocketContext = createContext({ socket });

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => useContext(SocketContext);

export default SocketProvider;
