import * as dotenv from 'dotenv' 
dotenv.config()

export default {
    jwtSecret: process.env.JWTSECRET || "" ,
    jwtSecretReset: process.env.JWTSECRETRESET || ""
}