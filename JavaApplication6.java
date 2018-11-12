package javaapplication6;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.util.* ; 
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonWriter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class JavaApplication6 {
    
   public static void main(String args[]) throws Exception {

        JSONObject obj = new JSONObject();
        
        JSONArray arrayconcetti = new JSONArray();
        LavoraConcetti(arrayconcetti);
        obj.put("Concepts", arrayconcetti);
        
        JSONArray arrayruoli = new JSONArray();
        LavoraRuoli(arrayruoli);
        obj.put("Roles", arrayruoli);
        
        JSONArray arrayattributi = new JSONArray();
        LavoraAttributi(arrayattributi);
        obj.put("Attributes", arrayattributi);
        
        
        try (FileWriter file = new FileWriter("/Users/theta/Desktop/prova.json")) {
            file.write(obj.toJSONString());
            System.out.println("Successfully Copied JSON Object to File...");
            System.out.println("\nJSON Object: " + obj);
        }
        try (FileWriter file2 = new FileWriter("/Users/theta/Desktop/1655653.github.io-master/prova.json")) {
            file2.write(obj.toJSONString());
            System.out.println("Successfully Copied JSON Object to github proj...");
            System.out.println("\nJSON Object: " + obj);
        }
   }
    //INIZIO LAVORA CONCETTI
    private static void LavoraConcetti(JSONArray arrayconcetti) {
        
        List<String> listanomiConcetti = new LinkedList<String>();
        listanomiConcetti.add("AudioBook");
        listanomiConcetti.add("Author");
        listanomiConcetti.add("Book");
        listanomiConcetti.add("E_Book");
        listanomiConcetti.add("EconomicEdition");
        listanomiConcetti.add("Edition");
        listanomiConcetti.add("Editor");
        listanomiConcetti.add("EmergingWriter");

        for (int i = 0; i < listanomiConcetti.size(); i++) {
            JSONObject oggettoConcetto = new JSONObject();
            JSONObject infoOggettoConcetto = new JSONObject();
            String nomeConcetto = listanomiConcetti.get(i);
            
            if(nomeConcetto == "Book"){ //per ogni concetto preso dal owl
                List<String> MandAttrlist= new LinkedList<String>(); //lista dei mandAttr del nomeconcetto fatta dal owl 
                List<String> MandRolelist = new LinkedList<String>();//ecc
                List<String> OptRolelist = new LinkedList<String>();
                List<String> SuperConclist = new LinkedList<String>();
                
                
                List<LinkedList<String>> SubConclist = new LinkedList<LinkedList<String>>();//è un array di array
                
                    /*da sistemare con owlapi*/
                    LinkedList<String> SingleGroupSubConc = new LinkedList<String>();
                    LinkedList<String> SingleGroupSubConc2 = new LinkedList<String>();
                    SingleGroupSubConc.add("AudioBook");
                    SingleGroupSubConc.add("E_Book");
                    SingleGroupSubConc.add("PrintedBook");
                    SingleGroupSubConc2.add("UneditedBook");
                    SubConclist.add(SingleGroupSubConc);
                    SubConclist.add(SingleGroupSubConc2);
                
                 
                
                MandAttrlist.add("genre");
                MandAttrlist.add("title");
                OptRolelist.add("writtenBy");
                if(!MandAttrlist.isEmpty())infoOggettoConcetto.put("Mandatory_Attributes", MandAttrlist);
                if(!MandRolelist.isEmpty())infoOggettoConcetto.put("Mandatory_Roles", MandRolelist);
                if(!OptRolelist.isEmpty())infoOggettoConcetto.put("Optional_Roles", OptRolelist);
                if(!SubConclist.isEmpty())infoOggettoConcetto.put("Sub_Concepts", SubConclist);
                if(!SuperConclist.isEmpty())infoOggettoConcetto.put("Super_Concepts", SuperConclist);
               
                
            }
            
            oggettoConcetto.put(nomeConcetto, infoOggettoConcetto);
            arrayconcetti.add(oggettoConcetto);
        }
    }
    //FINE LAVORA CONCETTI
    
    //INIZIO LAVORA RUOLI
    private static void LavoraRuoli(JSONArray arrayruoli) {
        List<String> listanomiRuoli = new LinkedList<String>();
        listanomiRuoli.add("editedBy");
        listanomiRuoli.add("hasEdition");
        listanomiRuoli.add("writtenBy");
        

        for (int i = 0; i < listanomiRuoli.size(); i++) {
            JSONObject oggettoRuolo = new JSONObject();
            JSONObject infoOggettoRuolo = new JSONObject();
            String nomeRuolo = listanomiRuoli.get(i);
            
            if(nomeRuolo == "editedBy"){ //per ogni ruolo preso dal owl
                List<String> Domlist= new LinkedList<String>(); //lista dei mandAttr del nomeconcetto fatta dal owl 
                List<String> Rangelist = new LinkedList<String>();//ecc
                List<String> Functlist = new LinkedList<String>();
                List<String> SubRollist = new LinkedList<String>();
                List<String> SuperRollist = new LinkedList<String>();
                
                Domlist.add("Edition");
                Rangelist.add("Editor");
                Functlist.add("Functional");
                
                if(!Domlist.isEmpty())infoOggettoRuolo.put("Domain", Domlist);
                if(!Rangelist.isEmpty())infoOggettoRuolo.put("Range", Rangelist);
                if(!Functlist.isEmpty())infoOggettoRuolo.put("ObjectProperty", Functlist);
                if(!SubRollist.isEmpty())infoOggettoRuolo.put("Sub_Roles", SubRollist);
                if(!SuperRollist.isEmpty())infoOggettoRuolo.put("Super_Roles", SuperRollist);
               
                
            }
            
            oggettoRuolo.put(nomeRuolo, infoOggettoRuolo);
            arrayruoli.add(oggettoRuolo);
        }
    }
    //FINE LAVORA RUOLI
    
    //INIZIO LAVORA ATTRIBUTI
    private static void LavoraAttributi(JSONArray arrayattributi) {
        List<String> listanomiAttributi = new LinkedList<String>();        
        listanomiAttributi.add("dateOfPublication");
        listanomiAttributi.add("editionNumber");
        listanomiAttributi.add("name");
        listanomiAttributi.add("genre");
        listanomiAttributi.add("title");
        

        for (int i = 0; i < listanomiAttributi.size(); i++) {
            JSONObject oggettoAttributo = new JSONObject();
            JSONObject infoOggettoAttributo = new JSONObject();
            String nomeAttributo = listanomiAttributi.get(i);
            
            if(nomeAttributo == "title"){ //per ogni ruolo preso dal owl
                List<String> Domlist= new LinkedList<String>(); //lista dei mandAttr del nomeconcetto fatta dal owl 
                List<String> Functlist = new LinkedList<String>();
                List<String> MandInlist = new LinkedList<String>();
                
                Domlist.add("Book");
                MandInlist.add("Book");
                Functlist.add("Functional");
                
                if(!Domlist.isEmpty())infoOggettoAttributo.put("Domain", Domlist);
                if(!MandInlist.isEmpty())infoOggettoAttributo.put("Mandatory_in", MandInlist);
                if(!Functlist.isEmpty())infoOggettoAttributo.put("ObjectProperty", Functlist);
            }
            
            oggettoAttributo.put(nomeAttributo, infoOggettoAttributo);
            arrayattributi.add(oggettoAttributo);
        }
    }
    //FINE LAVORA ATTRIBUTI
}