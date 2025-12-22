import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import type { Server as IOServer } from 'socket.io';

interface SocketServer extends HTTPServer {
    io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
    server: SocketServer;
}

interface NextApiResponseWithSocket {
    socket: SocketWithIO;
}

const SocketHandler = (req: any, res: NextApiResponseWithSocket) => {
    if (res.socket.server.io) {
        console.log('Socket.io already running');
    } else {
        console.log('Socket.io initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            // Join a conversation room
            socket.on('join-conversation', (conversationId: string) => {
                socket.join(`conversation-${conversationId}`);
                console.log(`Socket ${socket.id} joined conversation-${conversationId}`);
            });

            // Leave a conversation room
            socket.on('leave-conversation', (conversationId: string) => {
                socket.leave(`conversation-${conversationId}`);
                console.log(`Socket ${socket.id} left conversation-${conversationId}`);
            });

            // Handle new message
            socket.on('send-message', (data: {
                conversationId: string;
                message: any;
            }) => {
                // Broadcast to all clients in the conversation room
                io.to(`conversation-${data.conversationId}`).emit('new-message', data.message);
                console.log(`Message sent to conversation-${data.conversationId}`);
            });

            // Handle typing indicator
            socket.on('typing-start', (data: { conversationId: string; userName: string }) => {
                socket.to(`conversation-${data.conversationId}`).emit('user-typing', data.userName);
            });

            socket.on('typing-stop', (conversationId: string) => {
                socket.to(`conversation-${conversationId}`).emit('user-stopped-typing');
            });

            // Handle read status
            socket.on('message-read', (data: { conversationId: string; messageId: string }) => {
                io.to(`conversation-${data.conversationId}`).emit('message-read', data.messageId);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });
    }
    res.end();
};

export default SocketHandler;
