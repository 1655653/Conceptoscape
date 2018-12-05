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
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JFileChooser;

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
import org.semanticweb.owlapi.model.OWLClassAxiom;
import org.semanticweb.owlapi.model.OWLClassExpression;
import org.semanticweb.owlapi.model.OWLDataExactCardinality;
import org.semanticweb.owlapi.model.OWLDataFactory;
import org.semanticweb.owlapi.model.OWLDataProperty;
import org.semanticweb.owlapi.model.OWLDataPropertyAssertionAxiom;
import org.semanticweb.owlapi.model.OWLDataPropertyAxiom;
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
import org.semanticweb.owlapi.model.OWLObjectPropertyAxiom;
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
import javax.swing.*;
import javax.swing.filechooser.FileNameExtensionFilter;
/**
 *
 * @author theta
 */
public class GenerateJson {
    public static void main(String args[]) throws OWLOntologyCreationException, IOException {
        //INIZIALIZZAZIONE
        JFileChooser chooser = new JFileChooser();
        FileNameExtensionFilter filter = new FileNameExtensionFilter("OWL FILES", "owl");
        chooser.setFileFilter(filter);
        chooser.setMultiSelectionEnabled(false);
        chooser.setFileSelectionMode(JFileChooser.FILES_AND_DIRECTORIES);
        int retval = chooser.showOpenDialog(new JFrame("GenerateJson"));
        File file;
        if (retval == JFileChooser.APPROVE_OPTION) {
            try { 
                file = chooser.getSelectedFile();
                OWLOntologyManager manager =OWLManager.createOWLOntologyManager();
                OWLOntology o = manager.loadOntologyFromOntologyDocument(file);
                System.out.println("------------START--------------");

                JSONObject obj = new JSONObject();

                //INIZIO ELABORAZIONE DATI PER I CONCETTI
                JSONArray arrayconcetti = new JSONArray();
                LavoraConcetti(arrayconcetti,o);
                obj.put("Concepts", arrayconcetti);
                //FINE ELABORAZIONE DATI PER I CONCETTI

                //INIZIO ELABORAZIONE DATI PER I RUOLI
                JSONArray arrayruoli = new JSONArray();
                LavoraRuoli(arrayruoli,o);
                obj.put("Roles", arrayruoli);
                //FINE ELABORAZIONE DATI PER I RUOLI

                //INIZIO ELABORAZIONE DATI PER GLI ATTRIBUTI
                JSONArray arrayattributi = new JSONArray();
                LavoraAttributi(arrayattributi,o);
                obj.put("Attributes", arrayattributi);
                //FINE ELABORAZIONE DATI PER GLI ATTRIBUTI

                //SCRITTURA DEL RISULTATO SU 2 FILE, UNO NELLA CARTELLA DEL PROGETTO ED UNO SU DEKSTOP.
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
                System.exit(0);
            }
            catch (Exception ex) {
                JOptionPane.showMessageDialog(new JFrame("Exception"), "Error opening file!", "Error!", retval);
                System.exit(1);
            }
        }
        if(retval == JFileChooser.CANCEL_OPTION){
            JOptionPane.showMessageDialog(new JFrame("operazione annullata"), "operazione annullata", "Error!", retval);
            System.exit(1);
        }
        
   }
    


//INIZIO LAVORA CONCETTI
    private static void LavoraConcetti(JSONArray arrayconcetti,OWLOntology o) {
        OWLReasonerFactory rf = new org.semanticweb.HermiT.ReasonerFactory();
        OWLReasoner r = rf.createReasoner(o);
        //INIZIO RIEMPIO LISTA CON STRINGE DI TUTTI I CONCETTI       
        List<String> listanomiConcetti = new LinkedList<String>();
        List<OWLClass> listanomiOWLConcetti = new LinkedList<OWLClass>();
        for (OWLClass cls : o.getClassesInSignature()){
            if(!cls.getIRI().getFragment().equals("Thing")){
                listanomiConcetti.add(cls.getIRI().getFragment());
                listanomiOWLConcetti.add(cls);
            }
            
        }
        //FINE RIEMPIO LISTA CON STRINGE DI TUTTI I CONCETTI  
        
        //PER OGNI CONCETTO CREO LA STRUTTURA DATI CHE DIFFERISCE PER OGNUNO
        for (int i = 0; i < listanomiConcetti.size(); i++) {
            JSONObject oggettoConcetto = new JSONObject();
            JSONObject infoOggettoConcetto = new JSONObject();
            String nomeConcetto = listanomiConcetti.get(i);
            
            //INZIO LETTURA DI EVENTUALI ATTRIBUTI MANDATORY
            List<String> MandAttrlist= new LinkedList<String>(); 
            for (OWLClass cls : o.getClassesInSignature()){
                Set<OWLSubClassOfAxiom> set = o.getSubClassAxiomsForSubClass(cls);
                for(OWLSubClassOfAxiom subcl : set){
                    OWLClassExpression nomeattribEXPR = subcl.getSuperClass();
                    if(nomeattribEXPR.getClassExpressionType().toString().equals("DataSomeValuesFrom")){
                        OWLClassExpression nomeconcettoEXPR = subcl.getSubClass();
                        String nomeconcetto = nomeconcettoEXPR.asOWLClass().getIRI().getFragment();
                        if(nomeconcetto.equals(nomeConcetto)){
                            Set<OWLEntity> entities = nomeattribEXPR.getSignature();
                            for(OWLEntity entity : entities){
                                if(entity.getEntityType().getName().equals("DataProperty")){
                                    String attributo = entity.getIRI().getFragment();
                                    MandAttrlist.add(attributo);
                                }
                            }
                        }
                    }
                }
            }
            if(!MandAttrlist.isEmpty())infoOggettoConcetto.put("Mandatory_Attributes", MandAttrlist);
            //FINE LETTURA DI EVENTUALI ATTRIBUTI MANDATORY
            
            //INIZIO LETTURA DI EVENTUALI RUOLI MANDATORY
            List<String> MandRolelist = new LinkedList<String>();
            
            OWLClass concettocorrente = listanomiOWLConcetti.get(i);
            Set<OWLSubClassOfAxiom> set = o.getSubClassAxiomsForSubClass(concettocorrente);
            Set<OWLClassAxiom> axiom = o.getAxioms(concettocorrente);
            for(OWLClassAxiom ax : axiom){
                if(ax.getAxiomType().equals(AxiomType.EQUIVALENT_CLASSES)){
                    for(OWLDataProperty prop : ax.getDataPropertiesInSignature()){
                        if(MandAttrlist.contains(prop.getIRI().getFragment())){
                            MandAttrlist.add(prop.getIRI().getFragment());
                        }
                    }
                }
            }
            for(OWLSubClassOfAxiom subcl : set){
                OWLClassExpression nomeruoloEXPR = subcl.getSuperClass();
                if(nomeruoloEXPR.getClassExpressionType().toString().equals("ObjectSomeValuesFrom")){ 
                    Set<OWLEntity> setnomeruolo = nomeruoloEXPR.getSignature();
                    for(OWLEntity nomeruolo : setnomeruolo){
                        String rol = nomeruolo.getIRI().getFragment();
                        if(!rol.equals("Thing")&& !MandRolelist.contains(rol)) MandRolelist.add(rol);
                    }
                }
            }
            if(!MandRolelist.isEmpty())infoOggettoConcetto.put("Mandatory_Roles", MandRolelist);
            //FINE LETTURA DI EVENTUALI RUOLI MANDATORY
            
            //INIZIO LETTURA DI EVENTUALI RUOLI OPZIONALI
            List<String> OptRolelist = new LinkedList<String>();
            
            for (OWLObjectProperty ruol : o.getObjectPropertiesInSignature()){
                Set<OWLClass> setorgy = r.getObjectPropertyDomains(ruol).getFlattened();
                Set<OWLClass> setRange = r.getObjectPropertyRanges(ruol).getFlattened();
                setorgy.addAll(setRange);
                for(OWLClass c : setorgy){
                    String C = c.getIRI().getFragment();
                    if(C.equals(nomeConcetto)){
                        if(!MandRolelist.contains(ruol.getIRI().getFragment()))
                            OptRolelist.add(ruol.getIRI().getFragment());
                    }
                }
            }
            
            if(!OptRolelist.isEmpty())infoOggettoConcetto.put("Optional_Roles", OptRolelist);
            //FINE LETTURA DI EVENTUALI RUOLI OPZIONALI
            /****************************/
            //INIZIO LETTURA DI EVENTUALI SUPERCONCETTI
            List<String> SuperConclist = new LinkedList<String>();
            
            Set<OWLClass> setsupercla = r.getSuperClasses(concettocorrente).getFlattened();
            for(OWLClass supercla : setsupercla){
                if(!supercla.getIRI().getFragment().equals("Thing")){
                    SuperConclist.add(supercla.getIRI().getFragment());
                }
            }
            
            if(!SuperConclist.isEmpty())infoOggettoConcetto.put("Super_Concepts", SuperConclist);
            //FINE LETTURA DI EVENTUALI SUPERCONCETTI
           
            //INIZIO LETTURA DI EVENTUALI SUBCONCETTI
            List<LinkedList<String>> SubConclist = new LinkedList<LinkedList<String>>();//è un array di array
            
            Set<OWLClass> setsubcla = r.getSubClasses(concettocorrente).getFlattened();
            OWLDataFactory df = o.getOWLOntologyManager().getOWLDataFactory();
            for(OWLClass subcla : setsubcla){
                Set<OWLDisjointClassesAxiom> dj = o.getDisjointClassesAxioms(subcla);
                for(OWLDisjointClassesAxiom sc : dj ){
                    Set<OWLClass> singlc = sc.getClassesInSignature();
                    LinkedList<String> singlConcList = new LinkedList();
                    for(OWLClass k : singlc ){
                        String K = k.getIRI().getFragment();
                        if(!singlConcList.contains(K)){
                            singlConcList.add(K);
                        }
                    }
                    if(!SubConclist.contains(singlConcList)) SubConclist.add(singlConcList);
                }
            }
            for(OWLClass subcla : setsubcla){
                LinkedList<String> scl = new LinkedList();
                String clas = subcla.getIRI().getFragment();
                boolean cista = false;
                for(LinkedList l : SubConclist ){
                    if(l.contains(clas)) cista = true;
                }
                if(!cista && !clas.equals("Nothing")) {
                    scl.add(clas);
                    SubConclist.add(scl);
                }
                
                
            }
            //FINE LETTURA DI EVENTUALI SUBCONCETTI
            if(!SubConclist.isEmpty())infoOggettoConcetto.put("Sub_Concepts", SubConclist);
            
            oggettoConcetto.put(nomeConcetto, infoOggettoConcetto);
            arrayconcetti.add(oggettoConcetto);
        }
    }
    //FINE LAVORA CONCETTI
    
    //INIZIO LAVORA RUOLI
    private static void LavoraRuoli(JSONArray arrayruoli,OWLOntology o) {
        //INIZIALIZZAZIONE 
        OWLReasonerFactory rf = new org.semanticweb.HermiT.ReasonerFactory();
        OWLReasoner r = rf.createReasoner(o);
        List<String> listanomiRuoli = new LinkedList<String>();
        List<OWLObjectProperty> listaowlruoli = new LinkedList<OWLObjectProperty>();
        for (OWLObjectProperty cls : o.getObjectPropertiesInSignature()){
            listaowlruoli.add(cls);
            listanomiRuoli.add(cls.getIRI().getFragment());
        }
        //FINE INIZIALIZZAZIONE   

        //PER OGNI RUOLO CREO LA STRUTTURA DATI CHE DIFFERISCE PER OGNUNO
        for (int i = 0; i < listanomiRuoli.size(); i++) {
            JSONObject oggettoRuolo = new JSONObject();
            JSONObject infoOggettoRuolo = new JSONObject();
            String nomeRuolo = listanomiRuoli.get(i);
            
            //INZIO LETTURA DI EVENTUALI DOMINI
            List<String> Domlist= new LinkedList<String>();
            for( OWLObjectProperty el : listaowlruoli){
                NodeSet<OWLClass> set = r.getObjectPropertyDomains(el);
                for(OWLClass dominio : set.getFlattened()){
                    String nomedominio = dominio.getIRI().getFragment();
                    if(!nomedominio.equals("Thing") && el.getIRI().getFragment().equals(nomeRuolo)) {
                        if(!Domlist.contains(nomedominio)) Domlist.add(nomedominio);
                    }
                }
            }
            if(!Domlist.isEmpty())infoOggettoRuolo.put("Domain", Domlist);
            //FINE LETTURA DI EVENTUALI DOMINI
            
            //INZIO LETTURA DI EVENTUALI RANGE
            List<String> Rangelist= new LinkedList<String>();
            for( OWLObjectProperty el : listaowlruoli){
                NodeSet<OWLClass> set = r.getObjectPropertyRanges(el);
                for(OWLClass range : set.getFlattened()){
                    String nomerange = range.getIRI().getFragment();
                    if(!nomerange.equals("Thing") && el.getIRI().getFragment().equals(nomeRuolo)) {
                        if(!Rangelist.contains(nomerange)) Rangelist.add(nomerange);
                    }
                }
            }
            if(!Rangelist.isEmpty())infoOggettoRuolo.put("Range", Rangelist);
            //FINE LETTURA DI EVENTUALI RANGE
            
            //INZIO LETTURA DI EVENTUALI FUNZIONALITA
            List<String> Functlist = new LinkedList<String>();
            for( OWLObjectProperty el : o.getObjectPropertiesInSignature()){
                if(el.getIRI().getFragment().equals(nomeRuolo)){
                    Set<OWLObjectPropertyAxiom> set = o.getAxioms(el);
                    for(OWLObjectPropertyAxiom assioma : set){
                        OWLAxiom Axiom = assioma.getAxiomWithoutAnnotations();
                        if(Axiom.getAxiomType().toString().equals("FunctionalObjectProperty")){
                            Functlist.add("Functional");
                        }
                        if(Axiom.getAxiomType().toString().equals("InverseFunctionalObjectProperty")){
                            Functlist.add("InverseFunctional");
                        }
                    }
                }
                
            }
            if(!Functlist.isEmpty())infoOggettoRuolo.put("ObjectProperty", Functlist);
            //FINE LETTURA DI EVENTUALI FUNZIONALITA
            
            //INIZIO LETTURA DI EVENTUALI SOTTORUOLI
            List<String> SubRollist = new LinkedList<String>();
            //TODO
            if(!SubRollist.isEmpty())infoOggettoRuolo.put("Sub_Roles", SubRollist);
            //FINE LETTURA DI EVENTUALI SOTTORUOLI            

            //INIZIO LETTURA DI EVENTUALI SUPERRUOLI
            List<String> SuperRollist = new LinkedList<String>();
            //TODO
            if(!SuperRollist.isEmpty())infoOggettoRuolo.put("Super_Roles", SuperRollist);
            //FINE LETTURA DI EVENTUALI SUPERRUOLI

            oggettoRuolo.put(nomeRuolo, infoOggettoRuolo);
            arrayruoli.add(oggettoRuolo);
        }
    }
    //FINE LAVORA RUOLI
    
    //INIZIO LAVORA ATTRIBUTI
    private static void LavoraAttributi(JSONArray arrayattributi,OWLOntology o) {
        //INIZIO LETTURA EVENTUALI FUNZIONALITA
        List<String> attributifunzionali = new LinkedList<String>();
        for (OWLDataProperty cls : o.getDataPropertiesInSignature()){
            Set<OWLDataPropertyAxiom> set = o.getAxioms(cls);
            for(OWLDataPropertyAxiom assioma : set){
                OWLAxiom Axiom = assioma.getAxiomWithoutAnnotations();
                if(Axiom.getAxiomType().toString().equals("FunctionalDataProperty")){
                    for (Iterator<OWLDataProperty> it = assioma.getDataPropertiesInSignature().iterator(); it.hasNext();) {
                        OWLDataProperty el = it.next();
                        attributifunzionali.add(el.getIRI().getFragment());
                    }
                }
            }
        }
        //FINE LETTURA EVENTUALI FUNZIONALITA
        OWLReasonerFactory rf = new org.semanticweb.HermiT.ReasonerFactory();
        OWLReasoner r = rf.createReasoner(o);
        
        List<OWLDataProperty> listaowlattributi = new LinkedList<OWLDataProperty>();
        List<String> listanomiAttributi = new LinkedList<String>();
        
        for (OWLDataProperty cls : o.getDataPropertiesInSignature()){
            listaowlattributi.add(cls);
            listanomiAttributi.add(cls.getIRI().getFragment());
        }
        
        //PER OGNI ATTRIBUTO CREO LA STRUTTURA DATI CHE DIFFERISCE PER OGNUNO
        for (int i = 0; i < listanomiAttributi.size(); i++) {
            JSONObject oggettoAttributo = new JSONObject();
            JSONObject infoOggettoAttributo = new JSONObject();
            String nomeAttributo = listanomiAttributi.get(i);
            
            //INIZIO LETTURA EVENTUALI DOMINI
            List<String> Domlist= new LinkedList<String>();
            for( OWLDataProperty el : listaowlattributi){
                NodeSet<OWLClass> set = r.getDataPropertyDomains(el);
                for(OWLClass dominio : set.getFlattened()){
                    String nomedominio = dominio.getIRI().getFragment();
                    if(!nomedominio.equals("Thing") && el.getIRI().getFragment().equals(nomeAttributo)) {
                        if(!Domlist.contains(nomedominio)) Domlist.add(nomedominio);
                    }
                }
            }
            if(!Domlist.isEmpty())infoOggettoAttributo.put("Domain", Domlist);
            //FINE LETTURA EVENTUALI DOMINI
            
            if(attributifunzionali.contains(nomeAttributo)) infoOggettoAttributo.put("ObjectProperty", "Functional");
            
            //INIZIO LETTURA EVENTUALI OBBLIGATORIETà
            List<String> MandInlist = new LinkedList<String>();
            for (OWLClass cls : o.getClassesInSignature()){
                Set<OWLSubClassOfAxiom> set = o.getSubClassAxiomsForSubClass(cls);
                for(OWLSubClassOfAxiom subcl : set){
                    OWLClassExpression nomeattribEXPR = subcl.getSuperClass();
                    if(nomeattribEXPR.getClassExpressionType().toString().equals("DataSomeValuesFrom")){
                        OWLClassExpression nomeconcettoEXPR = subcl.getSubClass();
                        String nomeconcetto = nomeconcettoEXPR.asOWLClass().getIRI().getFragment();
                        Set<OWLEntity> entities = nomeattribEXPR.getSignature();
                        for(OWLEntity entity : entities){
                            if(entity.getEntityType().getName().equals("DataProperty")){
                                String attributo = entity.getIRI().getFragment();
                                if(attributo.equals(nomeAttributo)){
                                    MandInlist.add(nomeconcetto);
                                }
                            }
                        }
                    }
                }
            }
            if(!MandInlist.isEmpty())infoOggettoAttributo.put("Mandatory_in", MandInlist);
            //FINE LETTURA EVENTUALI OBBLIGATORIETà
            oggettoAttributo.put(nomeAttributo, infoOggettoAttributo);
            arrayattributi.add(oggettoAttributo);
        }
    }
    //FINE LAVORA ATTRIBUTI
}
