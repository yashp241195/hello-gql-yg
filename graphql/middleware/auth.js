import jwt from "jsonwebtoken"
import { config } from "dotenv"

config()

const auth = {
    signAccessToken:(_id)=>{
        let accessExpTime = 5
        let token = jwt.sign({ _id }, process.env.JWT_ACCESS_TOKEN,{ expiresIn: accessExpTime });
        return token
    },
    signRefreshToken:(_id, res)=>{
        let refreshExpTime = 15
        let token = jwt.sign({ _id }, process.env.JWT_REFRESH_TOKEN,{ expiresIn: refreshExpTime });
        res.cookie("refreshToken",token,{ httpOnly:true, secure:true, maxAge:1000*refreshExpTime })
        return token
    },
    verifyRefreshToken:(req)=>{
        try{
            let decode = {}
            let hash = req.cookies.refreshToken
            decode = jwt.verify(hash, process.env.JWT_REFRESH_TOKEN);
            return decode
        }catch(e){
            throw Error("Unauthorized ! Refresh Token Not Found")
        }        
    },
    verifyAccessToken:(req)=>{
        try{
            let decode = {}
            let hash = req.headers['authorization']
            decode = jwt.verify(hash, process.env.JWT_ACCESS_TOKEN);
            return decode
        }catch(e){
            throw Error("Unauthorized ! Access Token Not Found")
        }        
    },
  
}

export {auth}