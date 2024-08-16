package tdpnet;

public class Config {
        public Credentials credentials;
        public String host;
        public Peers peers;
    
        public Config(String host, Peers peers, Credentials credentials){
            this.host = host;
            this.peers = peers;
            this.credentials = credentials;
        }

    }

    
