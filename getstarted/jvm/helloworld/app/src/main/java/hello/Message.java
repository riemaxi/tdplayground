package hello;

public class Message{
    public String timestamp;
    public String from;
    public String to;
    public String subject;
    public String detail;

    public Message(){}
    
    public Message(String from, String to, String subject, String detail){
        this(from, to, subject, detail, System.currentTimeMillis() + "" );
    }

    public Message(String from, String to, String subject, String detail, String  timestamp){
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.detail = detail;
        this.timestamp = timestamp;
    }
}