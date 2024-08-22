const express=require('express')
const dotenv=require('dotenv')
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
const categorieRouter =require("./routes/categorie.routes")
const scategorieRouter =require("./routes/scategorie.routes")
const articleRouter =require("./routes/article.routes")
const paymentRouter =require("./routes/payment.route")
const userRouter =require('./routes/user.routes')
dotenv.config()
//middleware
app.use(express.json())
app.use(cors({origin:'*'}) 
)
app.get('/',(req,res)=>{ 
    res.send(' Bienvenue dans notre site!'); 
});
app.get('/contact',(req,res)=>{ 
    res.send('la page contact'); 
});

app.use('/api/categories', categorieRouter);
app.use('/api/scategories', scategorieRouter);
app.use('/api/articles', articleRouter);
app.use('/api/payement',paymentRouter);
app.use('/api/users',userRouter);
// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD/*,{
useNEWUrlParser: true, 
useUnifiedTopology: true 
}*/)
.then(() => {console.log("DataBase Successfully Connected");})
.catch(err => { console.log("Unable to connect to database", err);
process.exit(); });

app.listen(process.env.PORT)
console.log('app is running on port'+ process.env.PORT); 

module.exports = app;