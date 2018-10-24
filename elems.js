var Elems = {

    nodes: [
        // nodes
        { data: { id: 'Book', type: 'concept'} },
        { data: { id: 'b', type: 'ouo' } },
        { data: { id: 'E-book', type: 'concept' } },
        { data: { id: 'AudioBook', type: 'concept' } },
        { data: { id: 'PrintedBook', type: 'concept' } }
    ],

    edges:[
            // edges
        {
        data: {
            id: 'Bookb',
            source: 'b',
            target: 'Book',
            type:'normal'
        }
        },
        {
        data: {
            id: 'bE-book',
            source: 'E-book',
            target: 'b',
            type:'descendant'
        }
        },
        {
        data: {
            id: 'bAudioBook',
            source: 'AudioBook',
            target: 'b',
            type:'descendant'
        }
        },
        {
        data: {
            id: 'bPrintedBook',
            source: 'PrintedBook',
            target: 'b',
            type:'descendant'
        }
        
        }
    ]  
}