package hello;


//import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.checkerframework.checker.units.qual.h;

import com.fasterxml.jackson.annotation.*;
//import com.fasterxml.jackson.databind.node.JsonNodeFactory;

public class JSONizer {
        public static Object createMessage(String from, String to, String subject, String detail) throws Exception{
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(new Message(from, to, subject, detail));
        }

        public static Object createCredentials(Credentials credentials) throws Exception{
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(credentials); 
        }

        public static Message extractMessage(Object data){
            try{
                ObjectMapper mapper = new ObjectMapper();
                return mapper.readValue(data.toString(),  Message.class);
            }catch(Exception e){
                System.out.println("extract: " + data);
                System.out.println(e);
                return null;
            }
        }
}

