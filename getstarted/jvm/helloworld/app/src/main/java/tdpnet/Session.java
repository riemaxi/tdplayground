package tdpnet;

import java.util.Map;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

import java.net.URISyntaxException;

public class Session {
    private Socket socket;

    public void connect(String host) {
        try {
            IO.Options options = new IO.Options();
            socket = IO.socket(host, options);

            socket.on("connect", args -> onConnected(System.currentTimeMillis()));
            socket.on("granted", args -> onGranted(args[0]));
            socket.on("denied", args -> onDenied(args[0]));
            socket.on("data", args -> onData(args[0], valid(args[0])));
            socket.on("signal", args -> onSignal(args[0], valid(args[0])));
            socket.on("error", args -> onError(args[0]));

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
        System.out.println(data.toString());
        send("signin", data);
    }

    public void signoff(Object data) {
        send("signoff", data);
    }

    public Object message(String from, String to, String subject, String detail){
        try{
            return JSONizer.createMessage(from, to, subject, detail);
        }catch(Exception e){
            return "";
        }
    }

}