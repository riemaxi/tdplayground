import tdpnet.Session;

class App{
    App(){

    }

    public static void main(String [] args){
        new Session().connect("the host");
    }
}