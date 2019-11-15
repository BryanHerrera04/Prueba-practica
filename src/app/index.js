const express = require('express');
const morgan = require ('morgan');

//inicializar

const app = express();

//settings
app.set('port', 4200);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//variables globales
app.use((req, res, next) => {
    next();
})

//routes
app.use(require('./app-routing.module'));
app.use(require('./authentication'));
app.use('/links',require('./links'));

//Public

//Starting the server
app.listen(app.get('port'),() =>{
    console.log('server on port', app.get('port'));
});
