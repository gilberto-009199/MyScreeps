
module.exports = function( Creep , core){
    
    var attackDetected = function(){
        //if(this.memory.role && this.memory.role == 'guard')return;
        if(this.hits < this.hitsMax)core.secure.alert(this);
        
    }
    
    if(!Creep.prototype._moveTo){
        Creep.prototype._moveTo = Creep.prototype.moveTo;
        Creep.prototype.moveTo = function(target){
            attackDetected.call(this);
            return this._moveTo(target);
        }
    }
    if(!Creep.prototype._harvest){
        Creep.prototype._harvest = Creep.prototype.harvest;
        Creep.prototype.harvest = function(target){
            attackDetected.call(this);
            return this._harvest(target);
        }
    }
    if(!Creep.prototype._build){
        Creep.prototype._build = Creep.prototype.build;
        Creep.prototype.build = function(target){
            attackDetected.call(this);
            return this._build(target);
        }
    }
    

};
