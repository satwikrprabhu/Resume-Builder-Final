const mongoose=require("mongoose");
mongoose.set ('strictQuery', true);
 mongoose.connect('mongodb+srv://bharat:bharat@cluster0.e0xrcpn.mongodb.net/?retryWrites=true&w=majority',{

}).then(()=>{
    console.log(`connected to db`);
}).catch((e)=>{
    console.log(`no connection`);
});

