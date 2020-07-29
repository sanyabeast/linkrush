const {argv, command} = require('yargs')
console.log(argv)

const {exec,spawn}=require(`child_process`)
const { count } = require('console')

function run() {
    let command = ``
    for (let i = 0 ; i< argv.count;i++){
        command += `electron . && `
    }
    command = command.substring(0,command.length-3)
    console.log(command)
    exec (command)
    // console.log(1)
}
run()