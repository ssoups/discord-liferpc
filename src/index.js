const RPC = require('discord-rpc')
const client = new RPC.Client({transport: 'ipc'})
const { clientId, dateofbirth } = require('./SECRETS.json')
var i = 1;

/* Notes

    Request limit is 10,000/m.
    The max amount of request is 16/s.

*/


client.on('ready', () => {
    client.request('SET_ACTIVITY', {
        pid: process.pid, 
        activity: {
            details: "Waiting for time sync...",
            assets: {
                large_image: 'loadingimg',
                large_text: `Thumbsup Cat`
            },
            instance: true
        }})
    console.log(`Request sent, waiting for time sync. \nWait time: ${60 -(new Date).getSeconds()}s`)

    while(true){
        if ((new Date).getSeconds() === 0) {
                console.log('Time has been synced.')
                break;
        }
    }

    client.request('SET_ACTIVITY', {
        pid: process.pid, 
        activity: {
            details: `🕒 ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${new Date().toLocaleDateString()}`,
            assets: {
                large_image: `${calculateAge(dateofbirth)}`,
                large_text: `Playing life for ${calculateAge(dateofbirth)} years!`
            },
            instance: true
        }
    })

    foreverLoop(client)

})


client.login({clientId: clientId})

function calculateAge (birthDate) {
    birthDate = new Date(birthDate);
    otherDate = new Date(((new Date).getMonth()+1)+'/'+(new Date).getDate()+'/'+(new Date).getFullYear())
    var years = (otherDate.getFullYear() - birthDate.getFullYear());

    if (otherDate.getMonth() < birthDate.getMonth() || 
        otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }

    return(years);
}

function foreverLoop(client){
    setTimeout(function() {
        i++;
        client.request('SET_ACTIVITY', {
            pid: process.pid, 
            activity: {
                details: `🕒: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${new Date().toLocaleDateString()}`,
                assets: {
                    large_image: `${calculateAge(dateofbirth)}`,
                    large_text: `Playing life for ${calculateAge(dateofbirth)} years!`
                },
                instance: true
            }})
        if (true) {
            foreverLoop(client);
        }
    }, 60000)
}