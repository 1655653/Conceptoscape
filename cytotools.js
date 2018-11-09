//GRAPHOLY SERVE PER CREARE IL LAYOUT IN STILE GRAPHOL
function GrapholyConcept( nodes ){
    var attributes = cy.$('node[type = "simpleAttribute"],[type = "complexAttribute"]');
    var roles = cy.$('node[type = "simpleRole"],[type = "doubleSimpleRole"],[type = "complexRole"],[type = "doubleComplexRole"]');
    var subouos = cy.$('node[type = "subOuo"],[type = "subAndornot"],[type = "simpleSubConcept"]');
    var superconcepts = cy.$('node[type = "superConcept"]');
    


    var star = cy.$id(soggetto);
    var starx = star.position('x');
    var stary = star.position('y');
    var n;

    for (let i = 0; i < attributes.length; i++){
        const node = attributes[i];
        nodeAttrid = node.data('id');
        var nodeExists = cy.$id('exists'+nodeAttrid+soggetto);
        
        if ( i == 0) n = 0;
        else if( i % 2 != 0 ) n = -Math.abs(n)-30;
        else if( i % 2 == 0 ) n = n * (-1);

        nodeExists.position({
            x: starx + 100,
            y: stary + n 
        });

        node.position({
            x:nodeExists.position('x')+50,
            y:nodeExists.position('y')
        })
        
    }
    for (let i = 0; i < roles.length; i++) {
        const node = roles[i];
        nodeRoleid = node.data('id');
        var nodeExists = cy.$id('exists'+nodeRoleid+soggetto);

        if ( i == 0) n = 0;
        else if( i % 2 != 0 ) n = -Math.abs(n)-40;
        else if( i % 2 == 0 ) n = n * (-1);

        nodeExists.position({
            x: starx - 100,
            y: stary + n 
        });

        node.position({
            x:nodeExists.position('x')-80,
            y:nodeExists.position('y')
        })

        
    }
    
    //inizio gestione figli
    var ranges = {
        dx: [],
        sx: [],
        n : []//strutt.dati per le coordinate
    };
    for (let i = 0; i < subouos.length; i++) {
        const nodeouo = subouos[i];
        if(nodeouo.data('type') == "simpleSubConcept"){
            ranges.dx.push(50);
            ranges.sx.push(50);
        }
        var subConcetti = nodeouo.incomers('node[type = "subConcept"]');
        var numSubConc = subConcetti.length;
        
        var range = (numSubConc * 70) + 20*(numSubConc+1) //70*NUM NODI (LUNGH)+ 20*NUM NODI(SPAZIO+1) 
        
        if(numSubConc % 2 == 0){
            ranges.dx.push(range/2);
            ranges.sx.push(range/2);
        }
        else{
            ranges.dx.push(range*(3/5));
            ranges.sx.push((range*(2/5)));
        }
        
    }
    for (let i = 0; i < subouos.length; i++) {
        nodeouo = subouos[i];
        subConcetti = nodeouo.incomers('node[type = "subConcept"]');
        numSubConc = subConcetti.length;
        
        nodeouo.position('y',stary + 90);
        if(i == 0){
            n = starx;
            ranges.n.push(n);
        }
        else if(i  == 1){
            n = starx - ranges.sx[0] - ranges.dx[i];
            ranges.n.push(n);
        }
        else if(i == 2){
            n = starx + ranges.dx[0] + ranges.sx[2];
        }
        else if (i % 2 == 0 && i > 2){
            n = ranges.n[i-2] + ranges.dx[i-2] + ranges.sx[i];
        }
        else if (i % 2 != 0 && i > 1){
            n = ranges.n[i-2] - ranges.sx[i-2] - ranges.dx[i];
        }
        
        nodeouo.position('x',n);

        for (let j = 0; j < subConcetti.length; j++) {
            const nodeSubCon = subConcetti[j];
            
            if ( j == 0) start = 0;
            else if( j % 2 != 0 ) start = -Math.abs(start)-90;
            else if( j % 2 == 0 ) start = start * (-1) ;

            var ouoy = nodeouo.position('y');

            nodeSubCon.position({
                x: start + n,
                y: ouoy + 90
            });
            
            
        }
    }
    //fine gestione figli

    for (let i = 0; i < superconcepts.length; i++) {
        const node = superconcepts[i];
        node.position('y',stary-90);

        if(i == 0) n = 0;
        else if( i % 2 != 0 ) n = -Math.abs(n)-80;
        else if( i % 2 == 0 ) n = n * (-1);

        node.position('x',starx + n);
        
    }
    
    
}

//GESTORE DEI NODI FAKE, LAYOUT
function FakeManager(){
    var compAtrr = cy.$('node[type = "complexAttribute"],[type = "doubleComplexRole"]');
    compAtrr.on('grabon drag',function(evt){
        var node = evt.target;
        var idnode = node.data('id');
        var fakenode = cy.$id(idnode+'fake');
        var ix = node.position('x');
        var iy = node.position('y');
        fakenode.position({
            x: ix,
            y: iy
        });
    });

    var fakeAtrr = cy.$('node[type = "fakeAttribute"],[type = "fakeRole"]');
    fakeAtrr.on('grabon drag',function(evt){
        var node = evt.target;
        var idnode = node.data('id');
        var l = idnode.length;
        idnode = idnode.slice(0,l-4);
        var realnode = cy.$id(idnode);
        var ix = node.position('x');
        var iy = node.position('y');
        realnode.position({
            x: ix,
            y: iy
        });
    });

    var sfr = cy.$('node[type = "simpleFakeRole"]');
    sfr.on('grabon drag',function(evt){
        var node = evt.target;
        var idnode = node.data('id');
        var l = idnode.length;
        idnode = idnode.slice(4);
        var realnode = cy.$id(idnode);
        var ix = node.position('x');
        var iy = node.position('y');
        realnode.position({
            x: ix,
            y: iy
        });
        var fakeRole = cy.$id(idnode+"fake");
        fakeRole.position({
            x: ix,
            y: iy
        });
    });
}

//GENERATORE DEI NODI ATTRIBUTO FAKE
function FakeAttrGen(){
    var d = cy.$("node[type = 'complexAttribute']");
    for (let i = 0; i < d.length; i++) {
        var ix = d[i].position('x');
        var iy = d[i].position('y');
        var iddi = d[i].data('id');
        cy.add([
            {
            group:'nodes',
            data: { id: iddi+'fake', type: 'fakeAttribute'},
            position:{ x: ix , y: iy}
            }
        ]);
    }
}

//GENERATORE DEI NODI RUOLO FAKE
function FakeRoleGen(){
    var d = cy.$("node[type = 'doubleComplexRole']");
    for (let i = 0; i < d.length; i++) {
        var ix = d[i].position('x');
        var iy = d[i].position('y');
        var iddi = d[i].data('id');
        cy.add([
            {
            group:'nodes',
            data: { id: iddi+'fake', type: 'fakeRole'},
            position:{ x: ix , y: iy}
            },
            {
            group:'nodes',
            data: { id: 'fake'+iddi, type: 'simpleFakeRole'},
            position:{ x: ix , y: iy},
            }
        ]);
    }
    d = cy.$("node[type = 'doubleSimpleRole']");
    for (let i = 0; i < d.length; i++) {
        var ix = d[i].position('x');
        var iy = d[i].position('y');
        var iddi = d[i].data('id');
        cy.add([
            {
            group:'nodes',
            data: { id: 'fake'+iddi, type: 'simpleFakeRole'},
            position:{ x: ix , y: iy},
            }
        ]);
    }


}

//GENERATORE DI SUB CONCETTI
function SubConceptGenerator(src, ouoStarArr, typeConcept, typeOuo, ouoConceptArr, aonName){ //src è una str dati
    //ouoStarArr--> tipo arco che va da ouo a star
    //typeConcept--> tipo dei concetti figli (sub o super)
    //typeouo--> tipo degli (sub o super / andornot o ouo)
    //ouoStarArr--> tipo arco che va da ouo a star
    //aonName--> testo che deve apparire nel ouo solo nel caso in cui è andornot
    if(typeConcept == 'simpleSubConcept'){
        cy.add([
            {group: 'nodes', data: {id: src[0],type: 'simpleSubConcept'}},
            {
                group:'edges',
                data:{
                    id: soggetto+src[0],
                    source: src[0],
                    target: soggetto,
                    type:ouoStarArr

                }
            }
        ])
        return;
    }
    else if(typeOuo == "subAndornot"){
        cy.add([
            {group: 'nodes', data: { id: 'ouo'+src[0], type: typeOuo, andornot: aonName}},
            {
                group: 'edges', 
                data:{
                    id: 'ouo'+soggetto+src[0],
                    source: 'ouo'+src[0],
                    target: soggetto,
                    type:ouoStarArr
                }
            }
        ]);
    }
    
    else{
        cy.add([
            {group: 'nodes', data: { id: 'ouo'+src[0], type: typeOuo}},
            {
                group: 'edges', 
                data:{
                    id: 'ouo'+soggetto+src[0],
                    source: 'ouo'+src[0],
                    target: soggetto,
                    type:ouoStarArr
                }
            }
        ]);
    }
        
    for (let i = 0; i < src.length; i++) {
        const el = src[i];
        cy.add([
            {group: 'nodes', data: { id: el, type: typeConcept}}, //nodo concetto per ogni src
            {
                group: 'edges', 
                data:{
                    id: 'ouo'+src[0]+el,
                    source: el,
                    target: 'ouo'+src[0],
                    type:ouoConceptArr
                }
            }
        ]);
    }
    
}

//GENERATORE DI SUPER CONCETTI
function SuperConceptGenerator(srcID,arrstyle){
    for (let i = 0; i < srcID.length; i++) {
        const element = srcID[i];
        cy.add([
        {group: 'nodes', data: { id: element, type: 'superConcept'}},
            {
            group: 'edges', 
                data:{
                    id: soggetto+element,
                    source: soggetto,
                    target: element,
                    type:arrstyle
                }
            }

        ]);
    }
    
}

//GENERATORE DI RUOLI E ATTRIBUTI 
function AttrRoleGenerator( idSrc, idTargt, arrstyle, colorExists,typ){ //crea nodo concetto + exists + archi
    cy.add([
        { group:"nodes",data: { id: idSrc, type: typ }}, //creo nodo giusto
        { group:"nodes",data: { id: 'exists' +idSrc+idTargt, type: colorExists }}, //creo nodo exists

        {   
            group:"edges",
            data: { // creo edge nodo--->exists
            id: 'edgeExists' +idSrc+idTargt, 
            source: idSrc,
            target: 'exists' +idSrc+idTargt,
            type: 'descendant' } 
        },
        { 
            group:"edges",                    
            data: { //creo edge exists--->target
            id: 'edgetarget' +idSrc+idTargt, 
            source: 'exists' +idSrc+idTargt,
            target: idTargt,
            type: arrstyle } 
        }

    ]);
}

//GRAPHOLY SERVE PER CREARE IL LAYOUT IN STILE GRAPHOL 
function GrapholyRole( nodes ){
    var concepts = cy.$('node[type = "simpleConcept"]');
    var subroles = cy.$('node[hint = "sub"]');
    var superoles = cy.$('node[hint = "super"]');

    var star = cy.$id(soggetto);
    var starx = star.position('x');
    var stary = star.position('y');
    var n;
    var m;
    var b=0;
    var w=0;

    for (let i = 0; i < concepts.length; i++){
        const node = concepts[i];
        nodeConcid = node.data('id');
        var nodeExists = cy.$id('exists'+nodeConcid+soggetto);
        if(nodeExists.data('type') == "existsB"){
            if ( b == 0) {
                n = 0;
            }
            else if( b % 2 != 0 ) {
                n = -Math.abs(n)-30;
            }
            else if( b % 2 == 0 ){
                n = n * (-1);
            }
            b++;

            nodeExists.position({
                x: starx + 100,
                y: stary + n + 7
            });

            node.position({
                x:nodeExists.position('x') + 100,
                y:nodeExists.position('y') + n
            })
        }
        else{
            if ( w == 0) {
                m = 0;
            }
            else if( w % 2 != 0 ) {
                m = -Math.abs(m)-30;
            }
            else if( w % 2 == 0 ){
                m = m * (-1);
            }

            w++;

            nodeExists.position({
                x: starx - 100,
                y: stary + m
            });

            node.position({
                x:nodeExists.position('x') - 100,
                y:nodeExists.position('y') + m
            })

        }
        
        
    }

    for (let i = 0; i < subroles.length; i++){
        const node = subroles[i];
        
        if ( i == 0) n = 0;
        else if( i % 2 != 0 ) n = -Math.abs(n)-50;
        else if( i % 2 == 0 ) n = n * (-1);

        node.position({
            x:starx + n,
            y:stary + 80
        })
        
    }
    
    for (let i = 0; i < superoles.length; i++) {
        const node = superoles[i];
        if ( i == 0) n = 0;
        else if( i % 2 != 0 ) n = -Math.abs(n)-50;
        else if( i % 2 == 0 ) n = n * (-1);
            
            
        
        node.position({
            x:starx + n,
            y:stary - 80
        })
        
    }

}

//GENERATORE DI CONCETTI PER STARROLE
function ConceptGenerator( idSrc, idTargt, arrNodoExi, colorExists,typ, arrExitgt){ //crea nodo concetto + exists + archi
    cy.add([
        { group:"nodes",data: { id: idSrc, type: typ }}, //creo nodo giusto
        { group:"nodes",data: { id: 'exists' +idSrc+idTargt, type: colorExists }}, //creo nodo exists

        {   
            group:"edges",
            data: { // creo edge nodo--->exists
            id: 'edgeExists' +idSrc+idTargt, 
            source: idSrc,
            target: 'exists' +idSrc+idTargt,
            type: arrNodoExi } 
        },
        { 
            group:"edges",                    
            data: { //creo edge exists--->target
            id: 'edgetarget' +idSrc+idTargt, 
            source: 'exists' +idSrc+idTargt,
            target: idTargt,
            type: arrExitgt } 
        }

    ]);
}

//GENERATORE DI RUOLI PER STARROLE
function RoleGenerator(note,srcID,typeRole,ouoStarArr,typeOuo,roleOuoArr,aonName){
    //note è sub o super
    //srcID è una str dati
    //typeRole ---> tipo di ruolo (simple, complex,doublecomplex)
    //ouoStarArr--> tipo arco che va da ouo a starRuolo (o piu spesso da subruolo a starruolo)
    //typeOuo--> tipo degli (sub o super / andornot o ouo) oppure undefined (spesso)
    //roleOuoArr--> tipo arco che va da subruolo a ouo oppure undefinde
    //aonName--> testo che deve apparire nel ouo solo nel caso in cui è andornot
    if(typeOuo == undefined){
        for (let i = 0; i < srcID.length; i++) {
            const el = srcID[i];
            cy.add([
                {group: 'nodes', data: {id: el,type: typeRole, hint:note}},
                {
                    group:'edges',
                    data:{
                        id: soggetto+el,
                        source: el,
                        target: soggetto,
                        type:ouoStarArr

                    }
                }
            ]);
        }
        return;
    }
    else if(typeOuo == "subAndornot"){
        cy.add([
            {group: 'nodes', data: { id: 'ouo'+srcID[0], type: typeOuo, andornot: aonName}},
            {
                group: 'edges', 
                data:{
                    id: 'ouo'+soggetto+srcID[0],
                    source: 'ouo'+srcID[0],
                    target: soggetto,
                    type:ouoStarArr
                }
            }
        ]);
    }
    
    else{
        cy.add([
            {group: 'nodes', data: { id: 'ouo'+srcID[0], type: typeOuo}},
            {
                group: 'edges', 
                data:{
                    id: 'ouo'+soggetto+srcID[0],
                    source: 'ouo'+srcID[0],
                    target: soggetto,
                    type:ouoStarArr
                }
            }
        ]);
    }
        
    for (let i = 0; i < srcID.length; i++) {
        const el = srcID[i];
        cy.add([
            {group: 'nodes', data: { id: el, type: typeRole,hint:note}}, 
            {
                group: 'edges', 
                data:{
                    id: 'ouo'+srcID[0]+el,
                    source: el,
                    target: 'ouo'+srcID[0],
                    type:roleOuoArr
                }
            }
        ]);
    }
}

//PARSING DEL FILE JSON E CREAZIONE DEI NODI
function jparse(text){
    var data = JSON.parse(text);
    //ho starConcept
    if(tipo == 'starConcept'){
        for (el in data.Concepts){
            var obj = data.Concepts[el];
            for(id in obj){
                if (id == soggetto){
                    //CREAZIONE NODO STAR
                    cy.add([
                        {
                            group:'nodes',
                            data: { id: soggetto, type: tipo},
                        }
                    ]);

                    var star = obj[id];
                    //array con scritti gli id degli elementi
                    var subconcepts = [];
                    var superconcepts = [];
                    
                    var maStarAttributes = [];
                    var opStarAttributes = [];

                    var maStarRole = [];
                    var opStarRole = [];

                    if( star.Sub_Concepts != undefined){
                        for(h in star.Sub_Concepts ){
                            subconcepts.push(star.Sub_Concepts[h]);
                        }
                    }
                    if( star.Super_Concepts != undefined){
                        superconcepts.push(star.Super_Concepts);
                    }
                    if( star.Mandatory_Attributes != undefined){
                        for(h in star.Mandatory_Attributes ){
                            maStarAttributes.push(star.Mandatory_Attributes[h]);
                        }
                    }
                    if( star.Optional_Attributes != undefined){
                        for(h in star.Optional_Attributes ){
                            opStarAttributes.push(star.Optional_Attributes[h]);
                        }
                    }
                    if( star.Mandatory_Roles != undefined){
                        for(h in star.Mandatory_Roles ){
                            maStarRole.push(star.Mandatory_Roles[h]);
                        }
                    }
                    if( star.Optional_Roles != undefined){
                        for(h in star.Optional_Roles ){
                            opStarRole.push(star.Optional_Roles[h]);
                        }
                    }
                }
            }
        }
        
        //INIZIO CREAZIONE NODI ATTRIBUTI OPZIONALI
        for (let j = 0; j < opStarAttributes.length; j++) { //per tutti gli attributi opzionali di star 
            const singleAttr = opStarAttributes[j]; //è una stringa
            var funct = false;
            for(x in data.Attributes){
                var element = data.Attributes[x];
                if(element[singleAttr] != undefined){
                    var obj = element[singleAttr];
                    for(y in obj){
                        if (y == "ObjectProperty"){
                            funct = true;
                            //singleAttr è un attributo  funzionale
                        }
                    }
                    if(funct == true){
                        AttrRoleGenerator(singleAttr,soggetto,'normal','existsW','complexAttribute');
                    }
                    else{
                        AttrRoleGenerator(singleAttr,soggetto,'normal','existsW','simpleAttribute');
                    }
                
                }
            }
        };
        //FINE CREAZIONE NODI ATTRIBUTI OPZIONALI

        //INIZIO CREAZIONE NODI ATTRIBUTI MANDATORI
        for (let j = 0; j < maStarAttributes.length; j++) { //per tutti gli attributi mandatori di star 
            const singleAttr = maStarAttributes[j]; //è una stringa
            var dom = false;
            var funct = false;
            for(x in data.Attributes){
                var element = data.Attributes[x];
                if(element[singleAttr] != undefined){
                    var obj = element[singleAttr];
                    for(y in obj){
                        if(y == "Domain"){
                            for(i in obj[y]){
                                if(obj[y][i] == soggetto){
                                    dom = true;
                                    //obj[y][i] e quindi singleAttr (genre) è un attributo mandatorio con dominio book
                                }
                            }
                            
                        }
                        if (y == "ObjectProperty"){
                            funct = true;
                            //singleAttr è un attributo mandatorio funzionale
                            
                        }
                        if (y == "SomeValueMandatory"){
                            funct = true;
                            //singleAttr è un attributo mandatorio funzionale
                            
                        }
                    }
                    if(dom == true){
                        if(funct == true){
                            AttrRoleGenerator(singleAttr,soggetto,'doublenormal','existsW','complexAttribute');
                        }
                        else{
                            AttrRoleGenerator(singleAttr,soggetto,'doublenormal','existsW','simpleAttribute');
                        }
                    }
                    else{
                        if(funct == true){
                            AttrRoleGenerator(singleAttr,soggetto,'antinormal','existsW','complexAttribute');
                        }
                        else{
                            AttrRoleGenerator(singleAttr,soggetto,'antinormal','existsW','simpleAttribute');
                        }
                    }
                }
            }
        };
        //FINE CREAZIONE NODI ATTRIBUTI MANDATORI

        //INIZIO CREAZIONE NODI SOTTOCONCETTI
        for (let j = 0; j < subconcepts.length; j++) { //per tutti gruppi di sottoconcetti di star 
            const subgroup = subconcepts[j]; //è una stringa
            if(subgroup.length == 1) SubConceptGenerator(subgroup, 'normal','simpleSubConcept');
            else {
                SubConceptGenerator(subgroup, 'normal', 'subConcept', 'subOuo', 'descendant');
            }
        };
        //FINE CREAZIONE NODI SOTTOCONCETTI*/

        //INIZIO CREAZIONE NODI SUPERCONCETTI
        for (let j = 0; j < superconcepts.length; j++) { //per tutti gruppi di superconcetti di star 
            const sup = superconcepts[j]; //è una stringa
            SuperConceptGenerator(sup, 'normal');
        };
        //FINE CREAZIONE NODI SUPERCONCETTI*/

        //INIZIO CREAZIONE NODI RUOLI MANDATORI
        for (let j = 0; j < maStarRole.length; j++) { //per tutti i ruoli mandatori di star 
            const singleRol = maStarRole[j]; //è una stringa
            var dom = false;
            var rang = false;
            var funct = false;
            var invFunct = false;
            for(x in data.Roles){
                var element = data.Roles[x];
                if(element[singleRol] != undefined){
                    var obj = element[singleRol];
                    for(y in obj){
                        if(y == "Domain"){
                            for(i in obj[y]){
                                if(obj[y][i] == soggetto){
                                    dom = true;
                                    //obj[y][i] e quindi singleRol (writtenby) è un ruolo mandatorio con dominio book
                                    //existsW
                                }
                            }
                            
                        }
                        if (y == "ObjectProperty"){
                            for(g in obj[y] ){
                                if(obj[y][g] == "InverseFunctional") invFunct = true;
                                if(obj[y][g] == "Functional") funct = true;
                            }
                            
                        }
                        if(y == "Range"){
                            for(i in obj[y]){
                                if(obj[y][i] == soggetto){
                                    rang = true;
                                    //obj[y][i] e quindi singleRol (writtenby) è un ruolo mandatorio con range book
                                    //existsB
                                }
                            }
                            
                        }
                    }
                    var ex;
                    var arr = 'normal';
                    var complexity;
                    if(dom == true){
                        ex = 'existsW';
                        arr = 'doublenormal'
                    }
                    if(rang == true){
                        ex = 'existsB';
                    }

                    if(funct == true && invFunct == true) complexity = 'doubleComplexRole';
                    else if(funct == true && invFunct == false) complexity = 'doubleSimpleRole';
                    else if(funct == false && invFunct == true) complexity = 'complexRole';
                    else complexity = 'simpleRole';

                    AttrRoleGenerator(singleRol,soggetto,arr,ex,complexity);
                    
                }
            }
        };
        //FINE CREAZIONE NODI RUOLI MANDATORI
        
        //INIZIO CREAZIONE NODI RUOLI OPZIONALI
        for (let j = 0; j < opStarRole.length; j++) { //per tutti i ruoli mandatori di star 
            const singleRol = opStarRole[j]; //è una stringa
            var dom = false;
            var rang = false;
            var funct = false;
            var invFunct = false;
            for(x in data.Roles){
                var element = data.Roles[x];
                if(element[singleRol] != undefined){
                    var obj = element[singleRol];
                    for(y in obj){
                        if(y == "Domain"){
                            for(i in obj[y]){
                                if(obj[y][i] == soggetto){
                                    dom = true;
                                    //obj[y][i] e quindi singleRol (writtenby) è un ruolo opzionale con dominio book
                                    //existsW
                                }
                            }
                            
                        }
                        if (y == "ObjectProperty"){
                            for(g in obj[y] ){
                                if(obj[y][g] == "InverseFunctional") invFunct = true;
                                if(obj[y][g] == "Functional") funct = true;
                            }
                            
                        }
                        if(y == "Range"){
                            for(i in obj[y]){
                                if(obj[y][i] == soggetto){
                                    rang = true;
                                    //obj[y][i] e quindi singleRol (writtenby) è un ruolo mandatorio con range book
                                    //existsB
                                }
                            }
                            
                        }
                    }
                    var ex;
                    var arr = 'normal';
                    var complexity;
                    if(dom == true){
                        ex = 'existsW';
                    }
                    if(rang == true){
                        ex = 'existsB';
                    }

                    if(funct == true && invFunct == true) complexity = 'doubleComplexRole';
                    else if(funct == true && invFunct == false) complexity = 'doubleSimpleRole';
                    else if(funct == false && invFunct == true) complexity = 'complexRole';
                    else complexity = 'simpleRole';

                    AttrRoleGenerator(singleRol,soggetto,arr,ex,complexity);
                    
                }
            }
        }
        //FINE CREAZIONE NODI RUOLI OPZIONALI
        
    }
    //*****************************
    //ho starRole
    else{
        for (el in data.Roles){
            var obj = data.Roles[el];
            for(id in obj){
                if (id == soggetto){
                    var star = obj[id];

                    //VEDO LA FUNZIONALITÀ DELLA STAR
                    var funct = false;
                    var complex = false;
                    var tippo;
                    if(star.ObjectProperty != undefined){
                        for(x in star.ObjectProperty){
                            var el = star.ObjectProperty[x];
                            if(el == "Functional") funct = true;
                            if(el == "InverseFunctional") complex = true;
                        }
                        if(!funct && complex) tippo = "complexRole";
                        if(funct && !complex) tippo = "doubleSimpleRole";
                        if(funct && complex) tippo = "doubleComplexRole";
                    }
                    else tippo = "simpleRole"
                    //CREAZIONE NODO STAR
                    cy.add([
                        {
                            group:'nodes',
                            data: { id: soggetto, type: tippo},
                        }
                    ]);
                    
                    //INIZIO CREAZIONE NODI DOMINIO
                    var mand = false;
                    if(star.Domain != undefined){
                        for(x in star.Domain){
                            var domConcept = star.Domain[x];
                            for(y in data.Concepts){
                                var manCpt = data.Concepts[y];
                                for(z in manCpt){
                                    if(z == domConcept){
                                        var manRol = manCpt[z].Mandatory_Roles;
                                        for (let i = 0; i < manRol.length; i++) {
                                            if (manRol[i] == soggetto)
                                            mand = true;
                                        }
                                    }
                                }
                            }
                            if(mand == true){
                                ConceptGenerator( domConcept, soggetto, "doublenormal", 'existsW','simpleConcept',"antidescendant")
                            }
                            else {
                                ConceptGenerator( domConcept, soggetto, "antinormal", 'existsW','simpleConcept',"antidescendant")
                            }
                        }
                    }
                    //FINE CREAZIONE NODI DOMINIO

                    //INIZIO CREAZIONE NODI RANGE
                    var mand = false;
                    if(star.Range != undefined){
                        for(x in star.Range){
                            var ranConcept = star.Range[x];
                            for(y in data.Concepts){
                                var manCpt = data.Concepts[y];
                                for(z in manCpt){
                                    if(z == ranConcept){
                                        var manRol = manCpt[z].Mandatory_Roles;
                                        if(manRol != undefined){
                                            for (let i = 0; i < manRol.length; i++) {
                                                if (manRol[i] == soggetto)
                                                mand = true;
                                            }
                                        }
                                    }
                                }
                            }
                            if(mand == true){
                                
                                ConceptGenerator( ranConcept, soggetto, "doublenormal", 'existsB','simpleConcept',"antidescendant")
                            }
                            else {
                                ConceptGenerator( ranConcept, soggetto, 'antinormal', 'existsB','simpleConcept','antidescendant')
                            }
                        }
                    }
                    //FINE CREAZIONE NODI RANGE

                    //INIZIO CREZIONE NODI SOTTORUOLO
                    if(star.Sub_Roles != undefined){
                        for(g in star.Sub_Roles){
                            var singlesubrol = star.Sub_Roles[g];
                            var funct = false;
                            var invFunct = false;
                            for(x in data.Roles){
                                var element = data.Roles[x];
                                for(y in element){
                                    if(y == singlesubrol){
                                        var el = element[y];
                                        for(z in el.ObjectProperty){
                                            if(el.ObjectProperty[z]=="Functional") funct = true;
                                            if(el.ObjectProperty[z]=="InverseFunctional") invFunct = true;
                                        }

                                    }
                                    
                                }

                            }
                            var tippo;
                            if(!funct && invFunct) tippo = "complexRole";
                            if(!funct && !invFunct) tippo = "simpleRole";
                            if(funct && !invFunct) tippo = "doubleSimpleRole";
                            if(funct && invFunct) tippo = "doubleComplexRole";
                            RoleGenerator('sub',star.Sub_Roles,tippo,"normal");
                            funct = false;
                            invFunct = false;
                        }
                    }
                    //FINE CREAZIONE NODI SOTTORUOLO

                    //INZIO CREAZIONE NODI SUPERRUOLO
                    if(star.Super_Roles != undefined){
                        for(g in star.Super_Roles){
                            var singlesuprol = star.Super_Roles[g];
                            var funct = false;
                            var invFunct = false;
                            for(x in data.Roles){
                                var element = data.Roles[x];
                                for(y in element){
                                    if(y == singlesuprol){
                                        var el = element[y];
                                        for(z in el.ObjectProperty){
                                            if(el.ObjectProperty[z]=="Functional") funct = true;
                                            if(el.ObjectProperty[z]=="InverseFunctional") invFunct = true;
                                        }

                                    }
                                    
                                }

                            }
                            var tippo;
                            if(!funct && invFunct) tippo = "complexRole";
                            if(!funct && !invFunct) tippo = "simpleRole";
                            if(funct && !invFunct) tippo = "doubleSimpleRole";
                            if(funct && invFunct) tippo = "doubleComplexRole";
                            RoleGenerator('super',star.Super_Roles,tippo,"antinormal");
                            funct = false;
                            invFunct = false;
                        }
                    }
                    //FINE CREAZIONE NODI SUPERRUOLO
                }
            }
        }
    }
}

//sistema le label troppo grandi
function fixSizeLabel(){
    var conc = cy.$('node[type = "starConcept"],[type = "subConcept"],[type = "superConcept"],[type = "simpleSubConcept"],[type = "simpleConcept"]');
    for (let i = 0; i < conc.length; i++) {
        const element = conc[i];
        var lab = element.style('label');
        if(lab.length>11){
            element.style('font-size',7);
        }
        
    }
}

//readTextFile serve per leggere il json
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


