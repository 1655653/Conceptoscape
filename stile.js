var stile= [        //STILE NODI
    {
        selector: 'node[type = "ouo"]',
        style: {
            shape: 'hexagon',
            height: 18,
            'background-color': 'black'
            
        }
    },
    {
        selector: 'node[type = "andornot"]',
        style: {
            shape: 'hexagon',
            label: 'data(id)',
            height: 18,
            'background-color': 'white',
            'border-width':0.5,
            'border-color':'black',
            'text-valign' : 'center',
            'text-halign' : 'center',
            'font-size' : 10
            
        }
    },
    {
        selector:'node[type = "concept"]',
        style:{
            shape:'rectangle',
            height:30,
            width: 70,
            'background-color': 'white',
            'border-width':0.5,
            'border-color':'black',
            label: 'data(id)',
            'text-valign' : 'center',
            'text-halign' : 'center',
            'font-size' : 10
        }
    },
    {
        selector:'node[type = "value_domain"]',
        style:{
            shape:'roundrectangle',
            height:30,
            width: 70,
            'background-color': 'white',
            'border-width':0.5,
            'border-color':'black',
            label: 'data(id)',
            'text-valign' : 'center',
            'text-halign' : 'center',
            'font-size' : 10
        }
    },
    {
        selector:'node[type = "simpleRole"]',
        style:{
            shape:'diamond',
            height:30,
            width: 70,
            'background-color': 'white',
            'border-width':1,
            'border-color':'black',
            label: 'data(id)',
            'text-valign' : 'top',
            'text-halign' : 'center',
            'font-size' : 10
        }
    },
    {
        selector:'node[type = "complexRole"]',
        style:{
            shape:'diamond',
            height:30,
            width: 70,
            'background-color': 'white',
            'border-width':4,
            'border-color':'black',
            label: 'data(id)',
            'text-valign' : 'top',
            'text-halign' : 'center',
            'font-size' : 10
        }
    },
    {
        selector: 'node[type = "existsW"]',
        style: {
            shape: 'rectangle',
            height: 12,
            width: 12,
            'background-color': 'white',
            'border-width':0.5,
            'border-color':'black',
            label: 'exists',
            'text-valign' : 'top',
            'text-halign' : 'center',
            'font-size' : 10
            
        }
    },
    {
        selector: 'node[type = "existsB"]',
        style: {
            shape: 'rectangle',
            height: 12,
            width: 12,
            'background-color': 'black',
            label: 'exists',
            'text-valign' : 'top',
            'text-halign' : 'center',
            'font-size' : 10
            
        }
    },
    {
        selector:'node[type = "simpleAttribute"],[type = "complexAttribute"]',
        degree:3,
        style:{
            shape:'ellipse',
            height: 15,
            width: 15,
            'background-color': 'white',
            'border-width':0.5,
            'border-color':'black',
            label: 'data(id)',
            'text-valign' : 'center',
            'text-halign' : 'right',
            'font-size' : 10
        }
    },
    {
        selector:'node[type = "fakeAttribute"]',
        style:{
            shape:'ellipse',
            height: 10,
            width: 10,
            'background-color': 'white',
            'border-width':0.5,
            'border-color':'black',
            
        }
    },
    {           //STILE ARCHI
        selector:'edge[type = "normal"]',
        style:{
            'width': 1,
            'curve-style': 'bezier',
            'line-color' : 'black',
            'target-arrow-color': 'black',
            'target-arrow-shape': 'triangle'
        }
    },
    {
        selector:'edge[type = "doublenormal"]',
        style:{
            'width': 1,
            'curve-style': 'bezier',
            'line-color' : 'black',
            'target-arrow-color': 'black',
            'target-arrow-shape': 'triangle',
            'source-arrow-color': 'black',
            'source-arrow-shape': 'triangle'
        }
    },
    {
        selector:'edge[type = "descendant"]',
        style:{
            'width': 1,
            'curve-style': 'bezier',
            'line-color' : 'grey',
            'line-style' : 'dashed',
            'target-arrow-shape': 'diamond',
            'target-arrow-color': 'black',
            'target-arrow-fill': 'hollow',
            'arrow-scale': 1.2
            
        }
        
    }]
    
    