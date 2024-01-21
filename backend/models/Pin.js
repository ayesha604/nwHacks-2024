const mongoose = require("mongoose");

const PinSchema = mongoose.Schema({
        name: {
            type: String,
        },
        lat: {
            type: Number,
        },
        long : {
            type: Number,
        },
        Address: {
            type: String,
        },
        Resources: {
            wifi: Boolean,
            outlets: Boolean,
            washroom: Boolean,
            food: Boolean,
            gn_washroom: Boolean,
            acc_washrrom: Boolean,
            fem_hygiene: Boolean,
            
        }
        // Resources: {
        //         Free wi-fi: < boolean true or false >,
        //         Free outlets:: < boolean true or false >,
        //         Free washroom: < boolean true or false >,
        //         Free food: < boolean true or false >,
        //         Gender-neutral washroom: < boolean true or false >,
        //         Accessible washroom: < boolean true or false >,
        //         Free menstrual products: < boolean true or false >,
        //         Queer-friendly: < boolean true or false >
        // Description: <string comment>
        //     }
        
    },
{ timestamps: true }
);