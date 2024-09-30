export default class WebSocketService {
    constructor(url) {
      this.url = url;
      this.socket = null;
      this.listeners = [];
    }
  
    connect() {
      this.socket = new WebSocket(this.url);
  
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.listeners.forEach((callback) => callback(data));
      };
  
      this.socket.onclose = () => {
        // Tentar reconectar em caso de desconexão
        setTimeout(() => this.connect(), 1000);
      };
    }
  
    onMessage(callback) {
      this.listeners.push(callback);
    }
  }
  