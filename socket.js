let io, socket;
const User = require('./models/userModel')

module.exports = {
    init: (server) => {
        io = require('socket.io')(server)
        io.on('connection', (s) => {
            socket = s

            socket.on('on-user-disconnect', (userId) => {
                 console.log("El Usuario se ha desconectado....."+userId)
                 console.log("procedemos a  buscar y actualzar la tabla de ponerla en offline")
                User.findByIdAndUpdate(userId, {
                    offline: true
                }).then((user) => {
                    io.emit('on-user-disconnect', userId)
                    console.log("el usuario esta fuera de linea  "+userId+" "+user.name)
                    console.log('offline : true')
                })
            })
            socket.on('on-user-connect', (userId) => {

                console.log("el usuario e ha conectado ..."+userId)
                console.log("procedemos a  buscar y actualizar la tabla de ponerla en online")

                User.findByIdAndUpdate(userId, {
                    offline: false
                }).then((user) => {

                    io.emit('on-user-connect', user)
                    console.log("Una vez encntrado el usuario lo ponemos en linea   actualizamos su estado"+userId+" "+user.name)
                    console.log('offline : false')
                })
            })

        })
    },
    io: () => io,
    socket: () => socket,

}