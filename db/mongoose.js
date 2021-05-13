const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING , {
    useUnifiedTopology: true , 
    useNewUrlParser: true ,
    useCreateIndex: true ,
    useFindAndModify: false
})



