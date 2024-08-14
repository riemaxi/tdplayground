package helloworld;

import java.util.*;
import tdpnet.*;

public class Sysnet extends Session {

    private Codec codec = new Codec();
    private String address;
    private String host;
    private String greeting;
    private Peers peers;
    private Credentials credentials;

    public Sysnet(Config config) {
        super();

        this.credentials = config.credentials;
        this.address = this.credentials.address;
        this.host = config.host;
        this.peers = config.peers;

        System.out.println("connect " + this.host);
        this.connect(this.host);
    }

    protected void onConnected(long timestamp) {
        System.out.println("connected ... signin ...");
        this.signin(this.credentials);
    }

    public void reconnect() {
        this.connect(this.host);
    }

    protected void onGranted(Object data) {
        // Implement onGranted functionality
    }

    protected void onDenied(Object data) {
        // Implement onDenied functionality
    }

    
    protected void onSignal(Object error, Object data) {
        this.onCommand(data, true, true);
    }

    protected void onData(Object error, Object data) {
        this.onCommand(data, true, false);
    }

    protected void onCommand(Object data, boolean valid, boolean signal) {
        // Assuming data is of type Map<String, Object> or a similar structure
        if (data instanceof Map) {
            Map<String, Object> dataMap = (Map<String, Object>) data;
            String subject = (String) dataMap.get("subject");
            if ("request".equals(subject)) {
                this.onRequest(dataMap);
            } else if ("response".equals(subject)) {
                this.onResponse(dataMap);
            }
        }
    }

    protected void onRequest(Map<String, Object> data) {
        // Implement onRequest functionality
    }

    protected void onResponse(Map<String, Object> data) {
        // Implement onResponse functionality
    }

    public void request(String to, Object detail) {
        this.send("data", this.message(
            this.address,
            to,
            "request",
            detail.toString()));
    }
    
    // Helper classes (you need to define these or import them as necessary)
    public static class Config {
        public Credentials credentials;
        public String host;
        public Peers peers;
    }

    public static class Credentials {
        public String address;
        public String accesskey;
        public String password;
    }

    public static class Peers {
        public String greeter;
    }
}
