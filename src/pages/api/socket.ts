import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';
import { NextApiResponseWithSocket } from '../../types/socket';

export const config = {
    api: {
        bodyParser: false,
    },
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
    if (!res.socket.server.io) {
        console.log('Socket.io initializing');
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: '/api/socket',
            addTrailingSlash: false,
        });
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            socket.on('join_conversation', (conversationId: string) => {
                socket.join(conversationId);
                console.log(`Socket ${socket.id} joined conversation: ${conversationId}`);
            });

            socket.on('send_message', (data: any) => {
                const { conversationId } = data;
                io.to(conversationId).emit('receive_message', data);
            });

            socket.on('typing', ({ conversationId, userName }: { conversationId: string; userName: string }) => {
                socket.to(conversationId).emit('user_typing', { userName });
            });

            socket.on('stop_typing', ({ conversationId }: { conversationId: string }) => {
                socket.to(conversationId).emit('user_stop_typing');
            });

            socket.on('message_read', ({ conversationId, messageId }: { conversationId: string; messageId: string }) => {
                io.to(conversationId).emit('message_status_update', { messageId, status: 'read' });
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });
    }
    res.end();
};

export default SocketHandler;
