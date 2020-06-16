
const fs = require('fs')
const yargs = require("yargs")
const chalk = require("chalk")

function loadData(status) {
    try {
        const buffer = fs.readFileSync("data.json") 
        const data = buffer.toString()  // stringify it ( change it to string )
        const dataObj = JSON.parse(data)    // convert json into js object
        if(status === "complete"){
            console.log('complete')
            return dataObj.filter(item => {
                return item.status == "true"
                
            })}
            else if(status === "incomplete"){

                return dataObj.filter(item => {
                    return item.status == "false"
                    
                })}
             else{ return dataObj}
       
    } catch (err) {
        console.log('big error here')
        return []

    }
}
function deleteData(index){
    const data = loadData(index)
    data.splice(index,1)
  
    saveData(data)
}

yargs.command({
    command:'delete',
    describe:"delete item todos",
    builder:{
        index:{
            describe: "Status of todo",
            demandOption: false,
            type: 'int',
            alias: "d",
        }
    },
    
    handler: function({index}){
           deleteData(index)
    }
})
    function saveData(data) {
        fs.writeFileSync("data.json", JSON.stringify(data))
    }
    function addTodo(todo, status) {
        const data = loadData()
        const newTodo = { todo: todo, status: status }
        data.push(newTodo)
        saveData(data)
    }



    yargs.command({
        command:'list',
        describe:"listing all todos",
        builder:{
            status:{
                describe: "Status of todo",
                demandOption: false,
                type: 'string',
                alias: "s",
                default: "all"
            }
        },
        handler: function({status}){
            console.log(chalk.red('listing of todos'));
            
                const data = loadData(status)
                data.forEach(({ todo, status },index) => console.log(
                    `index:${index}  todo:${todo}    status:${status}`)
                )
        }
    })

    yargs.command({
        command:"add",
        describe:"add a new todo",
        builder:{
            todo:{
                descripbe: "todo content",
                demandOption:true,
                type: 'string',
                alias: 't'
            },
            status:{
                describe: "Status of todo",
                demandOption: false,
                type: 'boolean',
                alias: "s",
                default: false
            }
        },
handler:function({todo,status}){
 addTodo(todo,status)
 
}
    })
    yargs.parse()

    // 