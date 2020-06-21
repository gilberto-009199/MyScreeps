var roleHarvester = {
    limit:4,
    core:{},
    energyBySources: 3000,
    // Define quantos teram no quarto e se e necessario criar mais um
    verify: function(spawn, category){
        
        if(spawn.room.energyAvailable < 300 )return;
        
        // Quantidade de energia que existe no quarto 30% será para criar e manter mineradoras
        let quantidade = ((spawn.room.find(FIND_SOURCES).length * this.energyBySources)*0.30)/300;
        //let atual      =  spawn.room.find(FIND_MY_CREEPS).filter((item)=>(item.memory.role == 'harvester')).length;
        let atual        = category['harvester'] || 0 ;
        
        if(quantidade > atual &&  this.limit > atual )this.create(spawn)
        else{
            console.log("Existe a mais! Ta na hora de doar")
        }
    },
    create: function(spawn){
        if(spawn.room.energyAvailable > 299 )spawn.spawnCreep([WORK,CARRY,MOVE], ('H@' + Game.time) ,{memory: {role: 'harvester'}});
        else console.log("role.harvester.create@Energia insuficiente!");
    },
    donate:{
        /* Recebe um crep doado
         * e retorna true ou false para se aceita ou n ele 
         */
        add:function(creep){
            
            console.log("Alguem quer me dar uma creep :) ");
            
            if(creep.room.find(FIND_MY_CREEPS).filter((item)=>(item.memory.role == 'harvester')).length < roleHarvester.limit + 1){
                creep.memory.role = "harvester";
                return true;
            }else return false;
            
        },
        /* Quarda os pedidos */
        list:[],
        /* Envia um creep que não e mais necessario 
         * Por uam função de callback
         */
        listener:function(spawn,fun){
            this.list.push({name:spawn.name,fun});
            //console.log("Alguem quer receber um creep "+this.list.length);
        },
        /* Pega o creep e verifica se ele entra em um pedido de doação */
        done: function(creep){
            for(var i = 0 ; i < this.list.length ; i++){
	            
            	if(this.list[i].fun(creep)){
            		console.log(":" + this.list[i] + ":")
            		this.list.push(this.list[i])// Adicionando ao final do vetor apra baixa prioridade
            		this.list.splice(i,1);
            	}
            	
            
            }
            /*this.list.filter((item)=>{
                ///if(item.fun(creep)){
                //    console.log(" Aceitou! ");
                //    return true;
                //}else{
                //    console.log(" Não aceitou! ");
                //    return false;
                //}
                return !item.fun( creep );
            })*/
        }
    },
    /** @param {Creep} creep **/
    run: function(creep) {
        
	  if(creep.store.getFreeCapacity() > 0 ) {
	        
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#00fbff'}});
        }else {
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#0f0'}});
                }else console.log(" Enviando para papai "+creep.name);
            } else {
                console.log("role.hervester.run@Estamos mortos?")
                this.donate.done(creep);
            }
        }  
	}
};

module.exports = roleHarvester;
