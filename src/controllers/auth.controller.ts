import { Request, Response } from "express";
import { sqlConfigMYSQL } from "../database/database.mysql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config"; // donde tienes tu jwtSecret

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username & Password are required!" });
  }

  try {
    // Buscar al usuario
    const [rows]: any = await sqlConfigMYSQL.query(
      "SELECT id_user, username, password FROM user WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Username or Password are incorrect!" });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Username or Password are incorrect!" });
    }

    const token = jwt.sign(
      { id_user: user.id_user, username: user.username },
      config.jwtSecret,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      message: `Bienvenido ${user.username}`,
      id_user: user.id_user,
      username: user.username,
      role: user.role,
      token: token
    });

  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*
export const changePassword = async (req:Request, res:Response) => {
  const salt = bcrypt.genSaltSync(10);
  const {id_user} = res.locals.jwtPayload // locals.jwtPayload son los headers que vamos a mandar a traves de JSON WEBTOKEN
  const {oldPassword, newPassword} = req.body

  if(!(oldPassword && newPassword)){
    res.status(400).json({message: 'Old password & new password are required'});
  }

  const conf = configDatabase;
  const connection = await mysql.createConnection(conf);

  try {
    connection.query(`SELECT u.id_user, u.username, u.password, u.role
                        FROM users unpm i bcrypt
                        WHERE u.id_user = '${id_user}' `, (error,results,fields) => {

            if (results.length) {
                results.forEach(function(row:any) { //-----------> aqui se empieza a leer los campos del arreglo
                  if(!bcrypt.compareSync(oldPassword, row.password)){
                    return res.status(401).json({message: 'Check your password'})
                  }
                  row.password = newPassword;
                  row.password = bcrypt.hashSync(row.password, salt);
                  res.json({message:'Password change succesfully!!'})
               });
            }
    });
  } catch (error) {
    return res.status(400).json({ message: ' Something goes wrong' });
  }
  
}

*/


/*
export const changePassword = async (req:Request, res:Response) => {

  const {id_user} = res.locals.jwtPayload // locals.jwtPayload son los headers que vamos a mandar a traves de JSON WEBTOKEN
  const {oldPassword, newPassword} = req.body

  if(!(oldPassword && newPassword)){
    res.status(400).json({message: 'Old password & new password are required'});
  }

  const userRepository = AppDataSource.getRepository(Users);
  let user:Users;

  try {
    user = await userRepository.findOneOrFail({where: {id_user:id_user}});
  } catch (e) {
    return res.status(400).json({ message: ' Something goes wrong' });
  }
  
  if(!user.checkPassword(oldPassword)){
      return res.status(401).json({message: 'Check your password'})
  }
  user.password = newPassword;
  const validationOpt = {validationError : {target:false, value:false}}
  const errors = await validate(user,validationOpt)

  if(errors.length > 0){
    return res.status(400).json(errors);
  }

  //Has password
  user.hashPassword();
  userRepository.save(user);
  res.json({message:'Password change succesfully!!'})
}
*/

/*

  export const forgotPassword = async (req: Request, res:Response) => {
    const {username} = req.body;
    if(!(username)){
      return res.status(400).json({ message:'Username is requiered' });
    }

    const message = 'Se envio un correo electronico para reiniciar su password';
    let verificationLink;
    let emailStatus = 'OK'

    const userRepository = AppDataSource.getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail({where: {username:username}});
      const token = jwt.sign({id_user: user.id_user, username:user.username}, config.jwtSecretReset, {expiresIn:'10m'})
      verificationLink = `http://localhost:3000/new-password/${token}`
      user.resetToken = token;
    } catch (error) {
      return res.status(400).json({ message });
    }

    //TODO: sendmail

    try{
      
    }catch(e){
      emailStatus = e
      return res.status(400).json({ message: 'Something goes wrong!' });
    }

    try{
      await userRepository.save(user);
    }catch(error){
      emailStatus = error;
      return res.status(400).json({ message: 'Something goes wrong!' });
    }
    res.json({message, info: emailStatus, test: verificationLink});

  }
  */

  /*
  export const createNewPassword = async (req: Request, res: Response) => {
    const {newPassword} = req.body
    const resetToken = req.headers.reset as string

    if(!(resetToken && newPassword)){
      res.status(400).json({message:'All the fields are requiered'});
    }

    const userRepository = AppDataSource.getRepository(Users);

    let jwtPayload;
    let user: Users;
    
    try {
      jwtPayload = jwt.verify(resetToken, config.jwtSecretReset);
      user = await userRepository.findOneOrFail({where: {resetToken: resetToken}})
    } catch (error) {
      return res.status(401).json({message: error })
    }

    user.password = newPassword;
    const validationOpt = {validationError : {target:false, value:false}};
    const errors = await validate(user, validationOpt);

    if(errors.length > 0){
      return res.status(400).json(errors);
    }

    try {
      user.hashPassword();
      userRepository.save(user);
      
    } catch (error) {
      return res.status(401).json({ message: error })
    }

    res.json({message: 'Password has been change'});

  }
*/
  //Encriptacion del Passwor
