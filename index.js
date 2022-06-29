const db = require("./db.js");
const express = require('express');
const app = express();

const PORT = 5000;


app.use(express.urlencoded({extended : false}));
app.use(express.json());


app.get('/', function(req, res) {
  res.send('hello world');
});
// listes des articles
app.get('/blog/articles',(req,res) =>{
    const sql = "SELECT * FROM article  LIMIT 5";
    

    db.all(sql,(err,rows) =>{
        if(err){
            res.status(400).json({erro : err.message});
            return
        }
        res.json({Message : "Liste des articles",data : rows})
    })

})

// Afficher les details d'un article
app.get('/blog/articles/:id',(req,res)=>{
    const{ id : articlesID} = req.params;
    const sql = "SELECT * FROM article WHERE id=?";
    const params =[articlesID];
    db.get(sql, params, (err,row)=>{
        if(err){
            res.status(400).json({error: err.message});
            return
        }

        res.json({Message : `Detail de l'article avec titre ${articlesID}`,data:row})
    })

})
app.post('/blog/articles',(req,res) => {
    console.log("le post passe");
    const{title, resum, description, 
        author, creationDate, lastUpdateDate} = req.body;
        if(!title || !resum || !description ||
            !author || !creationDate || !lastUpdateDate){
            res.status(400).json({error : "Merci de remplir tous les champs"});
            return
        }
        const articles = {title, resum, description, 
            author, creationDate, lastUpdateDate};
        const sql = "INSERT INTO article (title, resum, description, author, creationDate, lastUpdateDate) VALUES (?,?,?,?,?,?)";
        const params = [articles.title,articles.resum,articles.description,
        articles.author, articles.creationDate, articles.lastUpdateDate];
       
        db.run(sql, params, (err,result) =>{
            if(err){
                console.log("erreur message",err);
                res.status(400).json({erro : err.message});
            }

            res.status(201).json({Message : "article crée avec succée 😉"
            ,data: articles});

        })
    //res.json({Message : "api du post"})
})

// Modifier un article
app.put('/blog/articles/:id',(req,res) =>{
    const{ id : articlesID} = req.params;
    const{title, resum, description, 
        author, creationDate, lastUpdateDate} = req.body;
    if(!title || !resum || !description ||
            !author || !creationDate || !lastUpdateDate){
            res.status(400).json({error : "Merci de remplir tous les champs"});
            return
        }
        const articles = {title, resum, description, 
            author, creationDate, lastUpdateDate};
const sql = "UPDATE article SET title=? ,resum=?, description=?, author=?,creationDate=?,lastUpdateDate=?";
const params = [articles.title,articles.resum,articles.description,
    articles.creationDate,articles.lastUpdateDate];
    db.run(sql, params, (err,result)=>{
        if(err){
            console.log("erreur message",err);
            res.status(400).json({erro : err.message});

        }
        res.json({Message : `Article avec titre ${articlesID} Modifié `,data:articles })
    })
})

// supprimer un article

app.delete('/blog/articles/:id',(req,res) => {
    const{ id : articlesID} = req.params;
    const sql = "DELETE FROM article WHERE title=?";
    db.run(sql, articlesID ,(err,result) =>{
        if(err){
            res.status(400).json({erro : err.message});
            return
        }
        res.json({Message : `article avec id ${articlesID} supprimé `, data : this.changes})
    })
})






app.listen(PORT,() => {
    console.log(`l'application est demarré sur le port ${PORT}`);
})