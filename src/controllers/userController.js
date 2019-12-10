import HttpStatus from 'http-status-codes'
import {User} from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as middleware from '../middlewares/auth'
import * as exceptions from '../exceptions/userExceptions'
const fs = require('fs')
const fileType = require('file-type')
import {SECRET_ENCODING_MESSAGE} from '../middlewares/auth'
import {getAbsoluteUri} from '../server.js'

export const profile = (req, res) => {
    const token = req.headers['x-access-token']
    if(token){
        jwt.verify(token, SECRET_ENCODING_MESSAGE, (error, decoded) => {
            if(error != null){
                res.status(HttpStatus.UNAUTHORIZED).json({error:HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)}).send()                
            }
            else{
                delete decoded.password
                res.status(HttpStatus.OK).json(decoded).send()
            }
        })
    }else{
        res.status(HttpStatus.UNAUTHORIZED).json({error:HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)}).send()
    }
}

export const login = (req, res) => {
    User.findOne({where: {email: req.body.email}}).then((user) => {
        if(user){
            console.log(user.get({plain:true}))
            bcrypt.compare(req.body.password, user.get({plain:true}).password).then((result) => {
                if(result){
                    const token = jwt.sign(user.get({plain:true}), middleware.SECRET_ENCODING_MESSAGE)
                    res.status(HttpStatus.OK).json({token: token}).send()                    
                }else{
                    res.status(HttpStatus.UNAUTHORIZED).json(exceptions.responseUsernameOrPasswordIncorret()).send()                    
                }
            })
        }else{
            res.status(HttpStatus.UNAUTHORIZED).json(exceptions.responseUsernameOrPasswordIncorret()).send()
        }
    })
}

export const addUser = (req, res) => {
    bcrypt.hash(req.body.password, 12).then((result) => {
        const name = req.body.name
        const email = req.body.email
        const cnpj = req.body.cnpj
        const password = req.body.password
        const data = {
                    name: name, 
                    email: email,
                    cnpj: cnpj,
                    password: result,
                }

        User.create(data).then((user) => {
            if(req.body.photo){
                const photo = savePhotoUser(req.body.photo, user.email, req)
                user.update({photo: photo}).then(() => {
                    res.status(HttpStatus.CREATED).json(user).send()
                })
            }else{
                res.status(HttpStatus.CREATED).json(user).send()
            }
        }).catch((error) => {
            res.status(HttpStatus.BAD_REQUEST)
                .json(exceptions.responseErroCatch(HttpStatus.BAD_REQUEST))
                .send()
        })
    })
}

export const getUsers = (req, res) => {
    User.findAll({attributes: {exclude: ["password"]}}).then((users) => {
        res.status(HttpStatus.OK).json(users).send()
    })
}

/*
    função responsável por salvar a foto de perfil de um usuário
    em um diretório no sistema operacional
*/
function savePhotoUser(codeBase64, pictureName, req){
    let buffer = new Buffer(codeBase64, 'base64')
    let pictureExtension = fileType(buffer).ext
    pictureName = pictureName + '.' + pictureExtension
    fs.writeFileSync(BASE_URL_SAVE + pictureName, buffer)
    return getAbsoluteUri(req) + BASE_URL_USER_PICTURE + pictureName
}

