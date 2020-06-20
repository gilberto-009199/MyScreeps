// role.builder
var roleBuilder = {
    limit:4,
    core:{},
    donate:{
        /* Recebe um crep doado
         * e retorna true ou false para se aceita ou n ele 
         */
        add:function(creep){
            //console.log("Alguem quer me dar uma creep :) ");
            //console.log(JSON.stringify(creep));
            console.log("Alguem quer me dar uma creep :) ");
            
            if(creep.room.find(FIND_MY_CREEPS).filter((item)=>(item.memory.role == 'builder')).length < roleBuilder.limit + 1){
                creep.memory.role = "builder";
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

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                console.log("role.builder.run@Estamos mortos?")
                this.donate.done(creep);
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;
