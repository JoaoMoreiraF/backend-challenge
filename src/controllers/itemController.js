import HttpStatus from 'http-status-codes'
import {Item} from '../models/item'
import {User} from '../models/user'

export const addItem = (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const price = req.body.price

    let data = {
            name: name, 
            description: description, 
            price: price,
            authorId: req.user.id
        }
    Item.create(data).then((item) => {
        res.status(HttpStatus.CREATED).json(item).send()
    }).catch((error) => {
        console.log(error)
        res.status(HttpStatus.BAD_REQUEST)
            .json(responseErroCatch(HttpStatus.BAD_REQUEST))
            .send()
    })
}

export const updateItem = (req, res) => {
    const id = req.params.id
    Item.findByPk(id).then((item) => {
        if(item){
            const name = req.body.name
            const description = req.body.description
            const price = req.body.price
            const data = {
                name: name, 
                description: description, 
                price:price
            }
            item.update(data).then(() => {
                res.status(HttpStatus.OK).json(item).send()
            }).catch((error) => {
                res.status(HttpStatus.BAD_REQUEST)
                    .json(responseErroCatch(HttpStatus.BAD_REQUEST))
                    .send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundItem()).send()
        }
    })
}

export const getItems = (req, res) => {
    Item.findAll(
        {
            include: {model: User, attributes: {exclude: ATTRIBUTES_EXCLUDE_USER}},
            attributes: {exclude: ['authorId']}
        }
    ).then((items) => {
        res.status(HttpStatus.OK).json(items).send()
    })
}

export const getItem = (req, res) => {
    const id = req.params.id
    Item.findByPk(id, 
        {
            include: {model: User, attributes: {exclude: ATTRIBUTES_EXCLUDE_USER}},
            attributes: {exclude: ['authorId']}
        }).then((item) => {
            if(item){
                res.status(HttpStatus.OK).json(item).send()
            }else{
                res.status(HttpStatus.NOT_FOUND).json(responseNotFoundItem()).send()
            }
    })
}


export const deleteItem = (req, res) => {
    const id = req.params.id
    Item.findByPk(id).then((item) => {
        if(item){
            item.destroy().then(() => {
                res.status(HttpStatus.OK).json(item).send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundItem()).send()
        }
    })
}

function responseErroCatch(code){
    let erro = {error: HttpStatus.getStatusText(code)}
    return erro
}

function responseNotFoundItem(){
    return {error: ITEM_NOT_FOUND}
}

const ITEM_NOT_FOUND = "item not found"
const ATTRIBUTES_EXCLUDE_USER = ['password', 'createdAt', 'updatedAt']
