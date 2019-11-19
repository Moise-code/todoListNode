let express = require('express');
let app = express();
//Déclaration des middleware de session et bodyParser
let session = require('cookie-session');
let bodyParser = require('body-parser');
//Utilisation du middleware bodyParser 
let urlencodedParser = bodyParser.urlencoded({extended: false});


//Utilistion du middleware de session
app.use(session({secret: 'todoList'}));

/*SI PAS DE TODOLIST DANS LA SESSION EN CREER UNE
*SOUS FORME DE TABLEAU*/
app.use(function(req, res, next){
     if(typeof(req.session.todoList) == 'undefined'){
          req.session.todoList = [];
     }
     next();
});

//Fonction qui permettra d'afficher la todoList ainsi que le formulaire
app.get('/todo',function(req, res){

     res.render('todo.ejs',{todoList: req.session.todoList});
});

//Ajout d'un élément à la liste
app.post('/todo/ajouter/', urlencodedParser, function(req, res){
     //console.log(req.body.newTodo)
     if(req.body.newTodo != ''){
          req.session.todoList.push(req.body.newTodo);
     }
     res.redirect('/todo');
});

//Suppression d'un élément de la liste
app.get('/todo/supprimer/:id', function(req, res){
     if(req.params.id != ''){
          req.session.todoList.splice(req.params.id, 1);
     }
     res.redirect('/todo');
});

app.use(function(req, res, next){
     res.redirect('/todo');
})


//Connection au port
app.listen(8080);