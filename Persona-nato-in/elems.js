var Elems = {
    nodes:[
        {
            data: {
                id:'Persona',
                image:'rect.png',
                type:'concept'
            },
        }, {
            data: {
                id:'Nato_in',
                image:'rombo.png',
                type:'role'
            }
        },{
            data:{
                id:'exists',
                image:'w_square.png',
                type:'exists'
            }
        }
    ],

    edges: [
        {
            data:{
                id:'P_exists',
                source:'Persona',
                target:'exists',
                type:'Man_Role_s' //mandatory role source
            }
        },{
            data:{
                id:'exists_N',
                source:'exists',
                target:'Nato_in',
                type:'Man_Role_t' //mandatory role target
            }
        }
    ]
};