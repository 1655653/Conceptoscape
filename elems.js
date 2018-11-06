/*function NodeGenerator( n ,targt){
    for (var i = 0; i < n; i++) {
        cy.add({
            group:"nodes",
            data: { id: 'node' + i ,type: 'subConcept'},
            position: { x: 200*i, y:450 }
            }
        );
        var source = 'node' + i;
        cy.add({
            group:"edges",
            data: {
                id: 'edge' + i,
                source: source,
                target: targt,
                type : 'descendant'
            }
        });
    }
}

                if(elenco.attribute.length > 0){
                    n = elenco.attribute[elenco.attribute.length-1] * (-1);
                    
                    if(elenco.attribute.length % 2 != 0){
                       elenco.attribute.push(n+20);
                    }
                    else{
                        elenco.attribute.push(n-20);
                    }
                    
                }
                else elenco.attribute.push(n);

*/
var Elems = {

    nodes: [
        // nodes
        // { data: { id: 'Book', type: 'concept'} },
        // { data: { id: 'b', type: 'ouo' } },
        // { data: { id: 'E-book', type: 'concept' } },
        // { data: { id: 'AudioBook', type: 'concept' } },
        // { data: { id: 'PrintedBook', type: 'concept' } },
        // { data: { id: ':writtenBy', type: 'simpleRole' } }
    ]

    // edges:[
    //         // edges
    //     {
    //     data: {
    //         id: 'Bookb',
    //         source: 'b',
    //         target: 'Book',
    //         type:'normal'
    //     }
    //     },
    //     {
    //     data: {
    //         id: 'bE-book',
    //         source: 'E-book',
    //         target: 'b',
    //         type:'descendant'
    //     }
    //     },
    //     {
    //     data: {
    //         id: 'bAudioBook',
    //         source: 'AudioBook',
    //         target: 'b',
    //         type:'descendant'
    //     }
    //     },
    //     {
    //     data: {
    //         id: 'bPrintedBook',
    //         source: 'PrintedBook',
    //         target: 'b',
    //         type:'descendant'
    //     }
        
    //     }
    // ]  
}





/// LAYOUT VARI



// cy.layout({
    //     name: 'cola',
    //     maxSimulationTime: 500,
    //     fit:true,
    //     padding: 40

    // }).run();
    


//CONCENTRIC LAYOUT

// cy.layout({
        //     name: 'concentric',
        //     avoidOverlap: true,
        //     startAngle: 1 / 2 * Math.PI,
        //     concentric: function( node ){
        //         return node.data('peso');
        //     },
        //     levelWidth: function( nodes ){
        //         return 1;
        //     }
        // }).run();
        


            
// cy.layout({
//     name: 'concentric',
//     concentric: function( node ){
//         return node.degree();
//     },
//     levelWidth: function( nodes ){
//         return 2;
//     }
// }).run(); 


        
// cy.layout({
    //     name: 'breadthfirst',
    //     roots:'node[id = "Book"]', //posso lasciare cosi tanto quando mi prenderò la root
    //     spacingFactor: 1,      //io ho già scansionato tutto e so chi è
    //     avoidOverlap: true,
    //     fit: true,
    //     padding: 50
    //     // animate: true,
    //     // animationDuration: 500
    // }).run();

    // cy.layout({
    //     name: 'grid',
    //     fit: true,
    //     padding:30,
    //     avoidOverlap: true,
    //     rows: 10, 
    //     cols: 10,
    //     position: function( node ){
    //         if(node.data('peso') == 100){
    //             console.log(node.data('id'));
    //             return (11,5);
    //         }
    //     }
    // }).run(); -->



    // function Grapholy(){
        //     var nodi = cy.$('node[type = "simpleAttribute"],[type = "complexAttribute"]');
        //     var star = cy.$id("Book");
        //     var starx = star.position('x');
        //     var stary = star.position('y');
        //     for (let i = 0; i < nodi.length; i++) {
        //         const singleNode = nodi[i];
        //         var singleNodeExists = cy.$id('exists'+singleNode.data('id')+'Book');

        //         var singleNodeExistsx = singleNodeExists.position('x');
        //         var singleNodeExistsy = singleNodeExists.position('y');
                
        //         var singleNodex = singleNode.position('x');
        //         var singleNodey = singleNode.position('y');

        //         singleNode.position('y',singleNodey-stary-singleNodeExistsy);
        //         singleNodeExists.position('y',singleNodeExistsy-stary);
                



                
        //     }
            
        // }


         
        //INIZIO MAIN
            
            /*//inizio creazione di archi e nodi messi a mano di concetti (sup,super,star)
        cy.add([
            {
            group:'nodes',
            data: { id: 'Book', type: 'starConcept'},
            },
            {
            group:'nodes',
            data: { id: 'b', type: 'superOuo'},
            },
            {
            group:'nodes',
            data: { id: 'E-book', type: 'superConcept'},
            },
            {
            group:'nodes',
            data: { id: 'AudioBook', type: 'superConcept'},
            },
            {
            group:'nodes',
            data: { id: 'PrintedBook', type: 'superConcept'},
            },
            {
            group:'edges',
            data: {
                id: 'Bookb',
                source: 'b',
                target: 'Book',
                type:'normal'
            }
            },
            {
            group:'edges',
            data: {
                id: 'bE-book',
                source: 'E-book',
                target: 'b',
                type:'descendant'
            }
            },
            {
            group:'edges',
            data: {
                id: 'bAudioBook',
                source: 'AudioBook',
                target: 'b',
                type:'descendant'
            }
            },
            {
            group:'edges',
            data: {
                id: 'bPrintedBook',
                source: 'PrintedBook',
                target: 'b',
                type:'descendant'
            }
            },
            //nodi esempio-------------------------------------
            {
            group:'nodes',
            data: { id: 'be', type: 'superOuo'},
            },
            {
            group:'edges',
            data: {
                id: 'Bookbe',
                source: 'be',
                target: 'Book',
                type:'normal'
            }
            },
            {
            group:'nodes',
            data: { id: 'Educational', type: 'superConcept'},
            },
            {
            group:'nodes',
            data: { id: 'Tutorial', type: 'superConcept'},
            },
            {
            group:'nodes',
            data: { id: 'Literature', type: 'superConcept'},
            },
            {
            group:'edges',
            data: {
                id: 'beEducational',
                source: 'Educational',
                target: 'be',
                type:'descendant'
            }
            },
            {
            group:'edges',
            data: {
                id: 'beTutorial',
                source: 'Tutorial',
                target: 'be',
                type:'descendant'
            }
            },
            {
            group:'edges',
            data: {
                id: 'beLiterature',
                source: 'Literature',
                target: 'be',
                type:'descendant'
            }
            }
            
        ]);
            //fine creazione di archi e nodi messi a mano di concetti (sup,super,star)
            */






//------------------------------------------------------------------------------------------






            /*
            n = 0;
            var startprec = 0;
            var stopprec = 0;
            for (let i = 0; i < subouos.length; i++) {
                const node = subouos[i];
                node.position('y',stary + 90);
                var subConcetti = node.incomers('node[type = "subConcept"]');
                var ouox = node.position('x'); 
                var ouoy = node.position('y');
                var range = (subConcetti.length * 70) + 20*(subConcetti.length+1) //70*NUM NODI (LUNGH)+ 20*NUM NODI(SPAZIO+1) 
                var start = ouox - (range/2);
                var stop = ouox + (range/2);
    
                
                
                if(i == 0) n = ouox;//0
                else if( i % 2 != 0 ) n = n - stop - startprec;
                else if( i % 2 == 0 ) n = n * (-1);
                node.position('x',n);
                
                range = (subConcetti.length * 70) + 20*(subConcetti.length+1);
                
                if(subConcetti.length % 2 == 0) {
                    start = ouox - (range/2);
                    stop = ouox + (range/2);
                }
                else{
                    start = ouox - (range*(2/3));
                    stop = ouox + (range/3);
                }

                

                for (let j = 0; j < subConcetti.length; j++) {
                    const nodeSubCon = subConcetti[j];
                    console.log(n);
                    
                    if ( j == 0) start = 0;
                    else if( j % 2 != 0 ) start = -Math.abs(start)-90;
                    else if( j % 2 == 0 ) start = start * (-1);


                    nodeSubCon.position({
                        x: start + n,
                        y: ouoy + 90
                    });
                    
                    
                }

                
            }*/


            ///------------------------------------



            // else if(node.data('type') == "superOuo" || node.data('type') == "superAndornot"){
            //     var min = Math.ceil(-180);
            //     var max = Math.floor(180);
            //     var n = Math.floor(Math.random() * (max - min + 1)) + min;


            //     node.position('y',stary - 90);

            //     if(elenco.superOuo.length == 0){ ///primo nodo ouo
            //         node.position('x',starx + n);
            //     }

            //     for (let i = 0; i < elenco.superOuo.length; i++) {
            //         const element = elenco.superOuo[i];
            //         while(n<element){
            //             n = n+5;
            //         }     
            //         node.position('x',n);
            //     }
                


            //     var superConcetti = node.incomers('node[type = "superConcept"]');
            //     var ouox = node.position('x');
            //     var ouoy = node.position('y');
            //     var range = superConcetti.length * 90 //70*NUM NODI (LUNGH)+ 20*NUM NODI(SPAZIO) 
            //     var start = ouox - (range/2);
            //     var stop = ouox + (range/2);

                

            //     for (let i = 0; i < elenco.superOuo.length; i++) {
            //         var element = elenco.superOuo[i];
            //         while( start<element ){
            //             start = start+5;
            //             stop = stop+5;
            //         }
            //     }

            //     elenco.superOuo.push(stop);
                    
                
            //     for (let i = 0; i < superConcetti.length; i++) {
            //         const nodeSupCon = superConcetti[i];
            //         nodeSupCon.position({
            //             x: start,
            //             y: ouoy - 90
            //         });
            //         start += 90;
                    
            //     }

            // }














            //if ( i == 0) {
                //     n = 0;
                //     m = -100;
                // }
                // else if( i % 2 != 0 ) {
                //     n = -Math.abs(n)-30;
                //     m = 100;
                // }
                // else if( i % 2 == 0 ){
                //     n = n * (-1);
                //     m = -100
                // }
                
                
                // nodeExists.position({
                //     x: starx + m,
                //     y: stary + n 
                // });

                // node.position({
                //     x:nodeExists.position('x')+m,
                //     y:nodeExists.position('y')
                // })
                // if( i == 1) {
                //     nodeExists.position({
                //         x: starx + m,
                //         y: stary 
                //     });

                //     node.position({
                //         x:nodeExists.position('x')+m,
                //         y:nodeExists.position('y')
                //     })
                // }











///*-*f**************************************************************************************                
///*-*f************************************************************************************** /*
/*               
var listaconcetti = []; 
        var soggetto;    
        readTextFile("book.json", function(text){
            var data = JSON.parse(text);
            for (el in data.Concepts){
                var obj = data.Concepts[el];
                for(id in obj){
                    listaconcetti.push(id);
                }
            }
        });

        document.write("<select onchange = Soggetto(this.value)>");
        for(i=0; i<listaconcetti.length; i++) {
            document.write("<option value=" + listaconcetti[i] + ">" + listaconcetti[i] + "</option>");
        }
        document.write("</select>");
        
        function Soggetto(name){
            soggetto = name;
        }
        
        function waitForElement(){
            if(typeof soggetto !== "undefined"){
                go();
            }
            else{
                setTimeout(waitForElement, 250);
            }
        }
        waitForElement();

        function go(){
            document.write("<div id='cy'></div>");
            */