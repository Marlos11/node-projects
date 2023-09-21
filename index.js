const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT ||3001
app.use(express.json())
app.use(cors())
const uuid = require('uuid')

const orders = []


const checkMethodAndUrl = (req, res, next) => {
    console.log(req.url, req.method)

    next()
}


const checkOrderId = (req, res, next) => {

    const { id } = req.params
    const index = orders.findIndex(clint => clint.id === id)
    if (index < 0) {
        return res.status(404).json({ Error: "order not found " })



    }

    res.indexOreder = index
    res.idOreder = id

    next()


}

app.get('/order', checkMethodAndUrl, (req, res) => {
    return res.json(orders)


})

app.post('/order', checkMethodAndUrl, (req, res) => {
    const { order, clienteName, price, Status } = req.body


    const newOrder = { id: uuid.v4(), order, clienteName, price, Status }
    orders.push(newOrder)

    return res.status(201).json(newOrder)

})

app.put('/order/:id', checkOrderId, checkMethodAndUrl, (req, res) => {

    const { order, clienteName, price, Status } = req.body
    const index = res.indexOreder
    const id = res.idOreder
    const updateOrder = { id, order, clienteName, price, Status }

    orders[index] = updateOrder

    return res.json(updateOrder)

})
app.delete('/order/:id', checkOrderId, checkMethodAndUrl, (req, res) => {
    const index = res.indexOreder
    orders.splice(index, 1)
    return res.status(204).json()

})

app.get('/order/:id', checkMethodAndUrl, (req, res) => {
    const { id } = req.params
    const { order, clienteName, price, Status } = req.body

    const checkOrder = { id, order, clienteName, price, Status }

    const index = orders.findIndex(clint => clint.id === id)
    if (index < 0) {
        return res.status(404).json({ menssage: "order not found " })

    }

    orders[index] = checkOrder

    return res.json(checkOrder)




})

app.patch('/order/:id', checkMethodAndUrl, (req, res) => {

    const { id } = req.params
    const { order, clienteName, price, Status } = req.body

    const updateStatus = { id, order, clienteName, price, Status }

    const index = orders.findIndex(clint => clint.id === id)
    if (index < 0) {
        return res.status(404).json({ menssage: "order not found " })


    }
    orders[index] = updateStatus

    return res.json(updateStatus)





})































app.listen(port, () => {

    console.log(`🚀 server stared on port ${port}`)

})