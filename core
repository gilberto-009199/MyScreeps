module.exports = {
    verify:function(spawn){
        //console.log("core.verufy@ Verificando spawn status") ;
        this.secure.verify(spawn);
    },
    secure:{
        listAlerts:{},
        alert:function(creep){
          console.log("core.secure.alert@ Alguem esta precisando de ajuda?"+creep.room.name)  
          if(!this.listAlerts[creep.room.name])this.listAlerts[creep.room.name] = 1;
          else this.listAlerts[creep.room.name] += 1;
        },
        verify:function(spawn){
          //console.log("core.secure.verify@ verificando spawn : "+spawn.room.name);
          //console.log(this.listAlerts[spawn.room.name]);
          if(this.listAlerts[spawn.room.name] && this.listAlerts[spawn.room.name] > 1){
              if(this.createUnit(spawn))this.listAlerts[spawn.room.name] = 0;
              else console.log("Unidade de defesa ainda não criada ");
          }
        },
        createGuard:function(spawn){
          console.log("core.secure.createUnit@ Criando unidade attack")
          
          if(Game.spawns.Spawn1.room.energyCapacityAvailable() > 499)return spawn.spawnCreep( [ATTACK,ATTACK,TOUGH,MOVE],'g@'+ Game.time,{ memory: { role: 'guard' } } ) == OK;
          return spawn.spawnCreep( [ATTACK,TOUGH,MOVE],'g@'+ Game.time,{ memory: { role: 'guard' } } ) == OK;
          
          
        },
        createTower:function(spawn){
          console.log("core.secure.createUnit@ Criando torre ")  
        },
        tower:{
            run:function(tower){
                console.log("core.secure.tower.run@ Run torre ")
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(closestHostile) {
                    tower.attack(closestHostile);
                }
            }
        },
        guard:{
            run:function(guard){
                console.log("core.secure.unit.run@ Run guard ")
                var hostiles = guard.room.find(FIND_HOSTILE_CREEPS);
                if(hostiles[0])
                    if(guard.attack(hostiles[0]) == ERR_NOT_IN_RANGE)guard.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#fff'}});
            }
        }
    }
};
