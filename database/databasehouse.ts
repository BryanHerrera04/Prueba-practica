import { RegisterComponent } from '../src/app/components/users/register';

const mysql = require('mysql');

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_house'
});
  con.connect();

export class DataH{
    constructor(private dataReg: RegisterComponent){ }
    email = RegisterComponent('email');
    password = RegisterComponent('password');

    getReg(err: String,res: String ,campos: String): void{
        con.query("insert into cliente values('this.email','this.correo')",(err,res,campos) => {
            console.log(res);
        })
    }
        

        

        
}
con.end();