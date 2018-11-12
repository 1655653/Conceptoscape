/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.mavenproject2;
import static org.semanticweb.owlapi.vocab.OWLFacet.*;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.coode.owlapi.manchesterowlsyntax.ManchesterOWLSyntaxOntologyFormat;
import org.coode.owlapi.turtle.TurtleOntologyFormat;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.semanticweb.HermiT.Reasoner.ReasonerFactory;
//import org.junit.Ignore;
//import org.junit.Test;
import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.io.OWLOntologyDocumentTarget;
import org.semanticweb.owlapi.io.OWLXMLOntologyFormat;
import org.semanticweb.owlapi.io.RDFXMLOntologyFormat;
import org.semanticweb.owlapi.io.StreamDocumentTarget;
import org.semanticweb.owlapi.io.StringDocumentTarget;
import org.semanticweb.owlapi.io.SystemOutDocumentTarget;
import org.semanticweb.owlapi.model.AddAxiom;
import org.semanticweb.owlapi.model.AddOntologyAnnotation;
import org.semanticweb.owlapi.model.AxiomType;
import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLAnnotation;
import org.semanticweb.owlapi.model.OWLAnnotationProperty;
import org.semanticweb.owlapi.model.OWLAxiom;
import org.semanticweb.owlapi.model.OWLClass;
import org.semanticweb.owlapi.model.OWLClassAssertionAxiom;
import org.semanticweb.owlapi.model.OWLClassExpression;
import org.semanticweb.owlapi.model.OWLDataExactCardinality;
import org.semanticweb.owlapi.model.OWLDataFactory;
import org.semanticweb.owlapi.model.OWLDataProperty;
import org.semanticweb.owlapi.model.OWLDataPropertyAssertionAxiom;
import org.semanticweb.owlapi.model.OWLDataPropertyDomainAxiom;
import org.semanticweb.owlapi.model.OWLDataPropertyRangeAxiom;
import org.semanticweb.owlapi.model.OWLDataRange;
import org.semanticweb.owlapi.model.OWLDataSomeValuesFrom;
import org.semanticweb.owlapi.model.OWLDataUnionOf;
import org.semanticweb.owlapi.model.OWLDatatype;
import org.semanticweb.owlapi.model.OWLDatatypeDefinitionAxiom;
import org.semanticweb.owlapi.model.OWLDatatypeRestriction;
import org.semanticweb.owlapi.model.OWLDeclarationAxiom;
import org.semanticweb.owlapi.model.OWLDifferentIndividualsAxiom;
import org.semanticweb.owlapi.model.OWLDisjointClassesAxiom;
import org.semanticweb.owlapi.model.OWLEntity;
import org.semanticweb.owlapi.model.OWLEquivalentClassesAxiom;
import org.semanticweb.owlapi.model.OWLFacetRestriction;
import org.semanticweb.owlapi.model.OWLFunctionalDataPropertyAxiom;
import org.semanticweb.owlapi.model.OWLIndividual;
import org.semanticweb.owlapi.model.OWLLiteral;
import org.semanticweb.owlapi.model.OWLNamedIndividual;
import org.semanticweb.owlapi.model.OWLObjectAllValuesFrom;
import org.semanticweb.owlapi.model.OWLObjectExactCardinality;
import org.semanticweb.owlapi.model.OWLObjectHasValue;
import org.semanticweb.owlapi.model.OWLObjectIntersectionOf;
import org.semanticweb.owlapi.model.OWLObjectOneOf;
import org.semanticweb.owlapi.model.OWLObjectProperty;
import org.semanticweb.owlapi.model.OWLObjectPropertyAssertionAxiom;
import org.semanticweb.owlapi.model.OWLObjectPropertyDomainAxiom;
import org.semanticweb.owlapi.model.OWLObjectPropertyExpression;
import org.semanticweb.owlapi.model.OWLObjectSomeValuesFrom;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyFormat;
import org.semanticweb.owlapi.model.OWLOntologyID;
import org.semanticweb.owlapi.model.OWLOntologyIRIMapper;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.semanticweb.owlapi.model.OWLOntologyStorageException;
import org.semanticweb.owlapi.model.OWLSubClassOfAxiom;
import org.semanticweb.owlapi.model.OWLSubObjectPropertyOfAxiom;
import org.semanticweb.owlapi.model.PrefixManager;
import org.semanticweb.owlapi.model.SWRLAtom;
import org.semanticweb.owlapi.model.SWRLObjectPropertyAtom;
import org.semanticweb.owlapi.model.SWRLRule;
import org.semanticweb.owlapi.model.SWRLVariable;
import org.semanticweb.owlapi.model.SetOntologyID;
import org.semanticweb.owlapi.reasoner.BufferingMode;
import org.semanticweb.owlapi.reasoner.ConsoleProgressMonitor;
import org.semanticweb.owlapi.reasoner.InferenceType;
import org.semanticweb.owlapi.reasoner.Node;
import org.semanticweb.owlapi.reasoner.NodeSet;
import org.semanticweb.owlapi.reasoner.OWLReasoner;
import org.semanticweb.owlapi.reasoner.OWLReasonerConfiguration;
import org.semanticweb.owlapi.reasoner.OWLReasonerFactory;
import org.semanticweb.owlapi.reasoner.SimpleConfiguration;
import org.semanticweb.owlapi.reasoner.structural.StructuralReasoner;
import org.semanticweb.owlapi.reasoner.structural.StructuralReasonerFactory;
import org.semanticweb.owlapi.util.AutoIRIMapper;
import org.semanticweb.owlapi.util.DefaultPrefixManager;
import org.semanticweb.owlapi.util.InferredAxiomGenerator;
import org.semanticweb.owlapi.util.InferredOntologyGenerator;
import org.semanticweb.owlapi.util.InferredSubClassAxiomGenerator;
//import org.semanticweb.owlapi.util.OWLClassExpressionVisitorAdapter;
import org.semanticweb.owlapi.util.OWLEntityRemover;
import org.semanticweb.owlapi.util.OWLOntologyMerger;
import org.semanticweb.owlapi.util.OWLOntologyWalker;
import org.semanticweb.owlapi.util.OWLOntologyWalkerVisitor;
import org.semanticweb.owlapi.util.SimpleIRIMapper;
import org.semanticweb.owlapi.vocab.OWL2Datatype;
import org.semanticweb.owlapi.vocab.OWLFacet;
import org.semanticweb.owlapi.vocab.OWLRDFVocabulary;

import uk.ac.manchester.cs.owlapi.modularity.ModuleType;
import uk.ac.manchester.cs.owlapi.modularity.SyntacticLocalityModuleExtractor;

/**
 *
 * @author theta
 */
public class Esempio {
    public static void main(String args[]) throws OWLOntologyCreationException, IOException {
        String path = "C:\\Users\\theta\\Desktop\\books_ontology.owl";
        OWLOntologyManager manager =OWLManager.createOWLOntologyManager();
        File file = new File (path);
        OWLOntology o = manager.loadOntologyFromOntologyDocument(file);
        OWLDataFactory df = manager.getOWLDataFactory();
        System.out.println("------------START--------------");

        
        
        List<OWLObjectProperty> listaowlruoli = new LinkedList<OWLObjectProperty>();
        for (OWLObjectProperty cls : o.getObjectPropertiesInSignature()){
            listaowlruoli.add(cls);
        }
        
        List<OWLDataProperty> listaowlattributi = new LinkedList<OWLDataProperty>();
        for (OWLDataProperty cls : o.getDataPropertiesInSignature()){
            listaowlattributi.add(cls);
        }
        
        JSONObject obj = new JSONObject();
        
        JSONArray arrayconcetti = new JSONArray();
        LavoraConcetti(arrayconcetti,o);
        obj.put("Concepts", arrayconcetti);
        
        JSONArray arrayruoli = new JSONArray();
        LavoraRuoli(arrayruoli,o);
        obj.put("Roles", arrayruoli);
        
        JSONArray arrayattributi = new JSONArray();
        LavoraAttributi(arrayattributi,o);
        obj.put("Attributes", arrayattributi);
        
        
        try (FileWriter localfile = new FileWriter("/Users/theta/Desktop/prova.json")) {
            localfile.write(obj.toJSONString());
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
    private static void LavoraConcetti(JSONArray arrayconcetti,OWLOntology o) {
               
        List<String> listanomiConcetti = new LinkedList<String>();
        for (OWLClass cls : o.getClassesInSignature()){
            listanomiConcetti.add(cls.getIRI().getFragment());
        }

        for (int i = 0; i < listanomiConcetti.size(); i++) {
            JSONObject oggettoConcetto = new JSONObject();
            JSONObject infoOggettoConcetto = new JSONObject();
            String nomeConcetto = listanomiConcetti.get(i);
            
//            if(nomeConcetto == "Book"){ //per ogni concetto preso dal owl
//                List<String> MandAttrlist= new LinkedList<String>(); //lista dei mandAttr del nomeconcetto fatta dal owl 
//                List<String> MandRolelist = new LinkedList<String>();//ecc
//                List<String> OptRolelist = new LinkedList<String>();
//                List<String> SuperConclist = new LinkedList<String>();
//                
//                
//                List<LinkedList<String>> SubConclist = new LinkedList<LinkedList<String>>();//è un array di array
//                
//                    /*da sistemare con owlapi*/
//                    LinkedList<String> SingleGroupSubConc = new LinkedList<String>();
//                    LinkedList<String> SingleGroupSubConc2 = new LinkedList<String>();
//                    SingleGroupSubConc.add("AudioBook");
//                    SingleGroupSubConc.add("E_Book");
//                    SingleGroupSubConc.add("PrintedBook");
//                    SingleGroupSubConc2.add("UneditedBook");
//                    SubConclist.add(SingleGroupSubConc);
//                    SubConclist.add(SingleGroupSubConc2);
//                
//                 
//                
//                MandAttrlist.add("genre");
//                MandAttrlist.add("title");
//                OptRolelist.add("writtenBy");
//                if(!MandAttrlist.isEmpty())infoOggettoConcetto.put("Mandatory_Attributes", MandAttrlist);
//                if(!MandRolelist.isEmpty())infoOggettoConcetto.put("Mandatory_Roles", MandRolelist);
//                if(!OptRolelist.isEmpty())infoOggettoConcetto.put("Optional_Roles", OptRolelist);
//                if(!SubConclist.isEmpty())infoOggettoConcetto.put("Sub_Concepts", SubConclist);
//                if(!SuperConclist.isEmpty())infoOggettoConcetto.put("Super_Concepts", SuperConclist);
//               
//                
//            }
            
            oggettoConcetto.put(nomeConcetto, infoOggettoConcetto);
            arrayconcetti.add(oggettoConcetto);
        }
    }
    //FINE LAVORA CONCETTI
    
    //INIZIO LAVORA RUOLI
    private static void LavoraRuoli(JSONArray arrayruoli,OWLOntology o) {
               
        List<String> listanomiRuoli = new LinkedList<String>();
        for (OWLObjectProperty cls : o.getObjectPropertiesInSignature()){
            listanomiRuoli.add(cls.getIRI().getFragment());
        }
        

        for (int i = 0; i < listanomiRuoli.size(); i++) {
            JSONObject oggettoRuolo = new JSONObject();
            JSONObject infoOggettoRuolo = new JSONObject();
            String nomeRuolo = listanomiRuoli.get(i);
            
//            if(nomeRuolo == "editedBy"){ //per ogni ruolo preso dal owl
//                List<String> Domlist= new LinkedList<String>(); //lista dei mandAttr del nomeconcetto fatta dal owl 
//                List<String> Rangelist = new LinkedList<String>();//ecc
//                List<String> Functlist = new LinkedList<String>();
//                List<String> SubRollist = new LinkedList<String>();
//                List<String> SuperRollist = new LinkedList<String>();
//                
//                Domlist.add("Edition");
//                Rangelist.add("Editor");
//                Functlist.add("Functional");
//                
//                if(!Domlist.isEmpty())infoOggettoRuolo.put("Domain", Domlist);
//                if(!Rangelist.isEmpty())infoOggettoRuolo.put("Range", Rangelist);
//                if(!Functlist.isEmpty())infoOggettoRuolo.put("ObjectProperty", Functlist);
//                if(!SubRollist.isEmpty())infoOggettoRuolo.put("Sub_Roles", SubRollist);
//                if(!SuperRollist.isEmpty())infoOggettoRuolo.put("Super_Roles", SuperRollist);
//               
//                
//            }
            
            oggettoRuolo.put(nomeRuolo, infoOggettoRuolo);
            arrayruoli.add(oggettoRuolo);
        }
    }
    //FINE LAVORA RUOLI
    
    //INIZIO LAVORA ATTRIBUTI
    private static void LavoraAttributi(JSONArray arrayattributi,OWLOntology o) {
               
        List<String> listanomiAttributi = new LinkedList<String>();
        for (OWLDataProperty cls : o.getDataPropertiesInSignature()){
            listanomiAttributi.add(cls.getIRI().getFragment());
        }
        
        for (int i = 0; i < listanomiAttributi.size(); i++) {
            JSONObject oggettoAttributo = new JSONObject();
            JSONObject infoOggettoAttributo = new JSONObject();
            String nomeAttributo = listanomiAttributi.get(i);
            
//            if(nomeAttributo == "title"){ //per ogni ruolo preso dal owl
//                List<String> Domlist= new LinkedList<String>(); //lista dei mandAttr del nomeconcetto fatta dal owl 
//                List<String> Functlist = new LinkedList<String>();
//                List<String> MandInlist = new LinkedList<String>();
//                
//                Domlist.add("Book");
//                MandInlist.add("Book");
//                Functlist.add("Functional");
//                
//                if(!Domlist.isEmpty())infoOggettoAttributo.put("Domain", Domlist);
//                if(!MandInlist.isEmpty())infoOggettoAttributo.put("Mandatory_in", MandInlist);
//                if(!Functlist.isEmpty())infoOggettoAttributo.put("ObjectProperty", Functlist);
//            }
            
            oggettoAttributo.put(nomeAttributo, infoOggettoAttributo);
            arrayattributi.add(oggettoAttributo);
        }
    }
    //FINE LAVORA ATTRIBUTI
    
        
        
        

    
    
}
