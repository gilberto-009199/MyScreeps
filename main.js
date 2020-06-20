var nucleo      = require('core.js');
var harvest     = require('role.harvester.js');
var builder     = require('role.builder.js');
var upgrader    = require('role.upgrader.js');
var prototipos  = require('creeps.prototypes.js')( Creep , nucleo );

module.exports.loop = function(){
    
    //console.log("TICK TACK")
    
    //Limpando memoria dos crepps mortos
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    // Lista dos Spawns
    let spawns = Object.values(Game.spawns);
    
    //spawns = [];
    
    
    // Circulo de vida de um spawn
    spawns.forEach((spawn)=>{
        
        let listCreeps = spawn.room.find(FIND_MY_CREEPS);
        
        let creep;
        let category = {};
        
        harvest.donate.list = [];
        harvest.donate.listener(spawn, builder.donate.add);
        harvest.donate.listener(spawn, upgrader.donate.add);
        
        builder.donate.list = [];
        builder.donate.listener(spawn, upgrader.donate.add);
        builder.donate.listener(spawn, harvest.donate.add);
        
        // Aplicando o circulo de vida dos creeps
        while(creep = listCreeps.shift()){
            
            if(creep.memory.role){
                if(category[creep.memory.role])category[creep.memory.role] += 1;
                else category[creep.memory.role] = 1;
            } else  continue;
            
            // Filtrando os screps
            switch(creep.memory.role){
                case 'harvester':
                    harvest.run(creep);
                    break;
                case 'builder':
                    builder.run(creep);
                    break;
                case 'upgrader':
                    upgrader.run(creep);
                    break;
                case 'guard':
                    nucleo.secure.guard.run(creep);
                    break;
                default:
                    console.log("Tipo ainda não definido")
            }
        }
        nucleo.verify(spawn,category);
        harvest.verify(spawn,category);
    })

}
