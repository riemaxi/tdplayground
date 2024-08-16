package hello;

import java.util.*;
import tdpnet.*;

public class Sysnet extends Session {

    private Codec codec = new Codec();
    public String address;
    public String host;
    public Peers peers;
    public Credentials credentials;

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

        try{
            this.signin(JSONizer.createCredentials(this.credentials));
        }catch(Exception e){

        }
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

    @Override
    protected void onCommand(Object data, boolean valid, boolean signal) {
        Message message = JSONizer.extractMessage(data);
        switch (message.subject) {
            case "request": onRequest(message); break;
            case "response" : onResponse(message); break;
            default:
                break;
        }
    }
    
    /*protected void onCommand(Object data, boolean valid, boolean signal) {
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
    }*/

    protected void onRequest(Message msg) {
        // Implement onRequest functionality
    }

    protected void onResponse(Message msg) {
        // Implement onResponse functionality
    }

    public void request(String to, String detail) {
            this.send("data", this.message(
                this.address,
                to,
                "request",
                detail)
            );
    }

}
