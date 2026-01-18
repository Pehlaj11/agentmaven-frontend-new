import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

class SocketService {
    constructor() {
        this.socket = null;
        this.listeners = new Map();
    }

    connect(token) {
        if (this.socket?.connected) {
            console.log('Socket already connected');
            return;
        }

        this.socket = io(SOCKET_URL, {
            auth: { token },
            transports: ['websocket', 'polling']
        });

        this.socket.on('connect', () => {
            console.log('✅ Socket connected:', this.socket.id);
        });

        this.socket.on('disconnect', (reason) => {
            console.log('❌ Socket disconnected:', reason);
        });

        this.socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error.message);
        });

        // Re-attach all existing listeners
        this.listeners.forEach((callback, event) => {
            this.socket.on(event, callback);
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            console.log('Socket disconnected manually');
        }
    }

    on(event, callback) {
        // Store the listener
        this.listeners.set(event, callback);

        // Attach to socket if connected
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    off(event) {
        // Remove from stored listeners
        this.listeners.delete(event);

        // Remove from socket if connected
        if (this.socket) {
            this.socket.off(event);
        }
    }

    emit(event, data) {
        if (this.socket) {
            this.socket.emit(event, data);
        } else {
            console.warn('Socket not connected. Cannot emit event:', event);
        }
    }

    isConnected() {
        return this.socket?.connected || false;
    }
}

export default new SocketService();
