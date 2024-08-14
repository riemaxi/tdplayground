package tdpnet;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import java.net.URISyntaxException;
import java.util.UUID;
import java.util.function.Consumer;

public class Desk {
    private int port;
    private String home;

    public Desk(Config config) {
        this.port = config.port;
        this.home = config.home;

        listen(port);
    }

    private void listen(int port) {
        // Implement the server setup and listening here
        // You might use a framework like Spark or embed a Jetty server
        onListening(port);
    }

    protected void dispatch(Consumer<Socket> io) {
        // Implement WebSocket connection handling here
        // Since Java doesn't have a direct equivalent to socket.io,
        // this method will need to be implemented based on the chosen WebSocket library.
    }

    protected void onListening(int port) {
        // Handle what happens when the server starts listening
    }

    protected void onCloseSession(Object session, String id) {
        // Handle session closure
    }

    protected Object createSession(Socket socket, String id) {
        return new Object(); // Replace with actual session creation logic
    }

    protected String getSessionId() {
        return UUID.randomUUID().toString();
    }

    public static class Config {
        public int port;
        public String home;

        public Config(int port, String home) {
            this.port = port;
            this.home = home;
        }
    }
}
