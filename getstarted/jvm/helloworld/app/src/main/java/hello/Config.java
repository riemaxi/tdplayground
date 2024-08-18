package hello;

public class Config {
        public String host = "http://localhost:20000";    
        public Credentials credentials = new Credentials();
        public Peers peers = new Peers();

        public Config(){}
    
        /*public Config(String host, Peers peers, Credentials credentials){
            this.host = host;
            this.peers = peers;
            this.credentials = credentials;
        }*/

    }

    
