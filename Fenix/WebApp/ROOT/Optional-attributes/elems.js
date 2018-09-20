
var Elems = {
    nodes:[
        {
            data: {
                id:'Persona',
                image:'rect.png',
                type:'concept'
            },
        }, {
            data:{
                id:'exists0',
                image:'w_square.png',
                type:'exists'
            }
        }, {
            data:{
                id:'cod_indiv',
                image:'circl.png',
                type:'attrib'
            }
        }, {
            data:{
                id:'descr_genere',
                image:'circl.png',
                type:'attrib'
            }
        }, {
            data:{
                id:'exists1',
                image:'w_square.png',
                type:'exists'
            }
        }
    ],

    edges: [
        {
            data:{
                id:'P_exists0',
                source:'Persona',
                target:'exists0',
                type:'Opt_Att_s' //optional attribute source
            }
        },{
            data:{
                id:'exists_Att0',
                source:'exists0',
                target:'cod_indiv',
                type:'Opt_Att_t' //optional attribute target
            }
        },{
            data:{
                id:'P_exists1',
                source:'Persona',
                target:'exists1',
                type:'Opt_Att_s' //optional attribute target
            }
        },{
            data:{
                id:'exists_Att1',
                source:'exists1',
                target:'descr_genere',
                type:'Opt_Att_t' //optional attribute target
            }
        }
    ]
};

















//INTANTO FAI LA PARTE PRIMA

// var Elems = {
//     nodes:[
//         {
//             data: {
//                 id:'Persona',
//                 image:'rect.png',
//                 type:'concept'
//             },
//         }, {
//             data: {
//                 id:'Nato_in',
//                 image:'rombo.png',
//                 type:'role'
//             }
//         },{
//             data:{
//                 id:'exists',
//                 image:'w_square.png',
//                 type:'exists'
//             }
//         }
//     ],

//     edges: [
//         {
//             data:{
//                 id:'P_exists',
//                 source:'Persona',
//                 target:'exists',
//                 type:'Man_Role_s' //mandatory role source
//             }
//         },{
//             data:{
//                 id:'exists_N',
//                 source:'exists',
//                 target:'Nato_in',
//                 type:'Man_Role_t' //mandatory role target
//             }
//         }
//     ]
// };