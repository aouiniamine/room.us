let Messages = require('../models/messageSchema')
const messages = (socket, io) => {
    socket.on('send-message', async (msg)=>{ 
        // save message when is sent
        let newMsg = new Messages(msg)
        await newMsg.save()
        .then((savedMsg)=>{ // send message to users when stored to DB
            io.emit('recieve-message', newMsg)
        })
        .catch(err =>{throw err}) // throw error if there's any
    })
}

module.exports = messages;