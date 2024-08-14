package tdpnet;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;


class Session {
    private Socket socket;

    public void connect(String host) {
        try {
            IO.Options options = new IO.Options();
            socket = IO.socket(host, options);

            socket.on(Socket.EVENT_CONNECT, args -> onConnected(System.currentTimeMillis()));
            socket.on("granted", args -> onGranted(args[0]));
            socket.on("denied", args -> onDenied(args[0]));
            socket.on("data", args -> onData(args[0], valid(args[0])));
            socket.on("signal", args -> onSignal(args[0], valid(args[0])));
            socket.on(Socket.EVENT_ERROR, args -> onError(args[0]));

            socket.connect();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    protected void onError(Object data) {}
    protected void onConnected(long timestamp) {}
    protected void onGranted(Object data) {}
    protected void onDenied(Object data) {}
    protected void onData(Object data, boolean valid) {
        onCommand(data, valid, false);
    }
    protected void onSignal(Object data, boolean valid) {
        onCommand(data, valid, true);
    }
    protected void onCommand(Object data, boolean valid, boolean signal) {}

    protected boolean valid(Object data) {
        // Assuming data is a JSON object. You may need to cast and handle it properly.
        return true; // Implement your validation logic here.
    }

    public void send(String id, Object data) {
        socket.emit(id, data);
    }

    public void signin(Object data) {
        send("signin", data);
    }

    public void signoff(Object data) {
        send("signoff", data);
    }

    public Message message(String from, String to, String subject, String detail) {
        return new Message(System.currentTimeMillis(), from, to, subject, detail);
    }

    public static class Message {
        private long timestamp;
        private String from;
        private String to;
        private String subject;
        private String detail;

        public Message(long timestamp, String from, String to, String subject, String detail) {
            this.timestamp = timestamp;
            this.from = from;
            this.to = to;
            this.subject = subject;
            this.detail = detail;
        }

        // Getters and setters can be added here
    }
}
