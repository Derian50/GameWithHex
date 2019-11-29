var cvs = document.getElementById('canvas')
var ctx = cvs.getContext("2d")
var width = 1280,
    height = 720
cvs.width = width
cvs.height = height

var emptyHex = new Image()
emptyHex.src = 'assets/emptyHex.png'

var falseHex = new Image()
falseHex.src = 'assets/FalseHex.png'

emptyHex.onload = function(){
    drawHex()
}

var yourSide = 'Blue'
var typeHex = []
var unitsArr = []
var activeHexX = -1, activeHexY = -1
var falseHexX = -1, falseHexY = -1, timerFalseHex = -1
var TIMEFALSEHEX = 5

var arrows = [

]
var units = [
    {
        id: 0,
        type: 'Cavalery',
        speed: 4,
        color: '#4671D5',
        active: false,
        x: 64,
        y: 48*3+32,
        hexX: 9,
        hexY: 1,
        finalHexX: 1,
        finalHexY: 3,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Blue',
        inCooldown: false,
        canMove: true,
        cooldown: null
    },
    {
        id: 1,
        type: 'Cavalery',
        speed: 4,
        color: '#CD0074',
        active: false,
        x: 4*32+32,
        y: 48*2+32,
        hexX: 11,
        hexY: 1,
        finalHexX: 4,
        finalHexY: 2,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Blue',
        inCooldown: false,
        canMove: true,
        cooldown: null
    },
    {
        id: 2,
        type: 'Cavalery',
        speed: 4,
        color: '#CD0074',
        active: false,
        x: 32*8+32,
        y: 48*2+32,
        hexX: 13,
        hexY: 1,
        finalHexX: 8,
        finalHexY: 2,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Blue',
        inCooldown: false,
        canMove: true,
        cooldown: null
    },
    {
        id: 3,
        type: 'Cavalery',
        speed: 4,
        color: '#CD0074',
        active: false,
        x: 2*32+32,
        y: 48*0+32,
        hexX: 15,
        hexY: 1,
        finalHexX: 2,
        finalHexY: 0,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Blue',
        inCooldown: false,
        canMove: true,
        cooldown: null
    },
    {
        id: 4,
        type: 'Archer',
        speed: 2,
        color: '#3914AF',
        active: false,
        x: 4*32+32,
        y: 48*0+32,
        hexX: 10,
        hexY: 0,
        finalHexX: 4,
        finalHexY: 0,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Blue',
        inCooldown: false,
        canMove: true,
        cooldown: null,
        haveArrow: false
    },
    {
        id: 5,
        type: 'Archer',
        speed: 2,
        color: '#3914AF',
        active: false,
        x: 4*32+32,
        y: 48*0+32,
        hexX: 12,
        hexY: 0,
        finalHexX: 4,
        finalHexY: 0,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Blue',
        inCooldown: false,
        canMove: true,
        cooldown: null,
        haveArrow: false
    },
    {
        id: 6,
        type: 'Archer',
        speed: 2,
        color: '#3914AF',
        active: false,
        x: 4*32+32,
        y: 48*0+32,
        hexX: 14,
        hexY: 0,
        finalHexX: 4,
        finalHexY: 0,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Blue',
        inCooldown: false,
        canMove: true,
        cooldown: null,
        haveArrow: false
    },
    {
        id: 6,
        type: 'Archer',
        speed: 2,
        color: '#3914AF',
        active: false,
        x: 4*32+32,
        y: 48*0+32,
        hexX: 16,
        hexY: 0,
        finalHexX: 4,
        finalHexY: 0,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Blue',
        inCooldown: false,
        canMove: true,
        cooldown: null,
        haveArrow: false
    },
    {
        id: 6,
        type: 'Archer',
        speed: 2,
        color: '#3914AF',
        active: false,
        x: 4*32+32,
        y: 48*0+32,
        hexX: 8,
        hexY: 0,
        finalHexX: 4,
        finalHexY: 0,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Blue',
        inCooldown: false,
        canMove: true,
        cooldown: null,
        haveArrow: false
    },
    {
        id: 7,
        type: 'Archer',
        speed: 2,
        color: '#FF14AF',
        active: false,
        x: 5*32+32,
        y: 48*3+32,
        hexX: 14,
        hexY: 8,
        finalHexX: 5,
        finalHexY: 3,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Red',
        inCooldown: false,
        canMove: true,
        cooldown: null,
        haveArrow: false
    },
    {
        id: 9,
        type: 'Archer',
        speed: 2,
        color: '#FF14AF',
        active: false,
        x: 5*32+32,
        y: 48*3+32,
        hexX: 10,
        hexY: 8,
        finalHexX: 5,
        finalHexY: 3,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Red',
        inCooldown: false,
        canMove: true,
        cooldown: null,
        haveArrow: false
    },
    {
        id: 9,
        type: 'Archer',
        speed: 2,
        color: '#FF14AF',
        active: false,
        x: 5*32+32,
        y: 48*3+32,
        hexX: 12,
        hexY: 8,
        finalHexX: 5,
        finalHexY: 3,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Red',
        inCooldown: false,
        canMove: true,
        cooldown: null,
        haveArrow: false
    },
    {
        id: 3,
        type: 'Cavalery',
        speed: 4,
        color: '#CD0074',
        active: false,
        x: 2*32+32,
        y: 48*0+32,
        hexX: 7,
        hexY: 7,
        finalHexX: 2,
        finalHexY: 0,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Red',
        inCooldown: false,
        canMove: true,
        cooldown: null
    },
    {
        id: 3,
        type: 'Cavalery',
        speed: 4,
        color: '#CD0074',
        active: false,
        x: 2*32+32,
        y: 48*0+32,
        hexX: 5,
        hexY: 7,
        finalHexX: 2,
        finalHexY: 0,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Red',
        inCooldown: false,
        canMove: true,
        cooldown: null
    },
    {
        id: 3,
        type: 'Cavalery',
        speed: 4,
        color: '#CD0074',
        active: false,
        x: 2*32+32,
        y: 48*0+32,
        hexX: 4,
        hexY: 6,
        finalHexX: 2,
        finalHexY: 0,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Red',
        inCooldown: false,
        canMove: true,
        cooldown: null
    },
    {
        id: 3,
        type: 'Cavalery',
        speed: 4,
        color: '#CD0074',
        active: false,
        x: 2*32+32,
        y: 48*0+32,
        hexX: 19,
        hexY: 7,
        finalHexX: 2,
        finalHexY: 0,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Red',
        inCooldown: false,
        canMove: true,
        cooldown: null
    },
    {
        id: 3,
        type: 'Cavalery',
        speed: 4,
        color: '#CD0074',
        active: false,
        x: 2*32+32,
        y: 48*0+32,
        hexX: 17,
        hexY: 7,
        finalHexX: 2,
        finalHexY: 0,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Red',
        inCooldown: false,
        canMove: true,
        cooldown: null
    },
    {
        id: 3,
        type: 'Cavalery',
        speed: 4,
        color: '#CD0074',
        active: false,
        x: 2*32+32,
        y: 48*0+32,
        hexX: 20,
        hexY: 6,
        finalHexX: 2,
        finalHexY: 0,
        move: false,
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Red',
        inCooldown: false,
        canMove: true,
        cooldown: null
    },
    
]
var createArrs = function(){
    for(var i = 0; i < 40; i++){
        
        typeHex[i] = []
        unitsArr[i] = []
        for(var j = 0; j < 16; j++){
            if((i%2) === (j%2)){ //чёт-чёту, нечёт-нечёту
                typeHex[i][j] = 0
                unitsArr[i][j] = 0
            }else{
                typeHex[i][j] = -1
                unitsArr[i][j] = -1
            }
        }
    }
}
createUnitsArr = function(){
    for(var i = 0; i < units.length; i++){
        units[i].id = i
        units[i].finalHexX = units[i].hexX
        units[i].finalHexY = units[i].hexY
        units[i].x = units[i].hexX*32+32
        units[i].y = units[i].hexY*48+32
    }
}
var drawHex = function(){
    for(var i = 0; i < 40; i++){
        for(var j = 0; j < 16; j++){
            if((i%2) === (j%2)){
                ctx.drawImage(emptyHex, 32*i, 48*j)
            }
        }
    }
}
window.onmousedown = function(e){
    this.whatHexIsClicked(e.offsetX, e.offsetY)
    
}
var checkIsSimpleHex = function(x,y){
    for(var i = 0; i < 16; i++){
        if(((y - i*48) > 16) && ((y - i*48) < 48)){
            col = Math.floor(x/32)
            row = Math.floor(y/48)
            whatHexIsClicked2(col,row)
            return true
        }
    }
    return false
}
var isEnemyInThisHex = function(x,y){
    for(var i = 0; i < units.length; i++){
        if(units[i].hexX === x && units[i].hexY === y && units[i].side !== yourSide){
            return true
        }
    }
}
var isUnitsInThisHex = function(x,y){
    for(var i = 0; i < units.length; i++){
        if(units[i].hexX === x && units[i].hexY === y && units[i].side === yourSide){
            return true
        }
    }
}
var meleeMoveOrAttack = function(currentHexX, currentHexY, x, y){
    var dist = checkDist(currentHexX, currentHexY, x, y)
    var unitsIndex = whatIsIndex(currentHexX, currentHexY)
    if(canThisUnitGoToThisHex(currentHexX, currentHexY, x, y, dist)){
        units[unitsIndex].active = false
        activeHexX = -1
        activeHexY = -1
        createMovePath(currentHexX, currentHexY, x, y, dist)
    }else{
        falseHexX = x
        falseHexY = y
        timerFalseHex = TIMEFALSEHEX
    }
    
    
}
var createArrowAndShot = function(currentHexX, currentHexY, toHexX, toHexY, dist, unitIndex){
    index = arrows.length
    arrows.push({})
    arrows[index].id = index
    arrows[index].x = currentHexX*32+32
    arrows[index].y = currentHexY*48+32
    arrows[index].toX = toHexX*32+32
    arrows[index].toY = toHexY*48+32
    arrows[index].toHexX = toHexX
    arrows[index].toHexY = toHexY
    arrows[index].speed = units[unitIndex].speed
    var deltaStepX = (arrows[index].toX-arrows[index].x)/60
    var deltaStepY = (arrows[index].toY-arrows[index].y)/60
    arrows[index].stepX = (arrows[index].speed/dist)*deltaStepX
    arrows[index].stepY = (arrows[index].speed/dist)*deltaStepY
}
var rangerMoveOrAttack = function(currentHexX, currentHexY, x, y){
    var dist = checkDist(currentHexX, currentHexY, x, y)
    var unitIndex = whatIsIndex(currentHexX, currentHexY)
    if(canThisUnitGoToThisHex(currentHexX, currentHexY, x, y, dist)){
        units[unitIndex].active = false
        activeHexX = -1
        activeHexY = -1

        if(isEnemyInThisHex(x,y) && units[whatIsIndex(x,y)].side !== yourSide){
            units[unitIndex].inCooldown = true
            units[unitIndex].cooldown += (600/units[unitIndex].speed)*dist
            createArrowAndShot(currentHexX, currentHexY, x,y, dist, unitIndex)
            //здесь я ссыльнусь в след раз на новую функцию, которая будет делать стрелу и запускать её
        }else{   
            createMovePath(currentHexX, currentHexY, x, y, dist)
        }
    }else{
        units[unitIndex].active = true
        
        falseHexX = x
        falseHexY = y
        timerFalseHex = TIMEFALSEHEX
    }




}
var whatHexIsClicked2 = function(x, y){
    if((x + y) % 2 === 1) x--
    if((activeHexX === x && activeHexY === y) || x < 0 || y < 0){
        units[whatIsIndex(activeHexX,activeHexY)].active = false
        activeHexX = -1
        activeHexY = -1
        return
    }
    if(isUnitsInThisHex(x,y) && units[whatIsIndex(x,y)].side === yourSide && units[whatIsIndex(x,y)].canMove){
        if(activeHexX !== -1){
            units[whatIsIndex(activeHexX, activeHexY)].active = false
        }
        units[whatIsIndex(x,y)].active = true
       
        activeHexX = x
        activeHexY = y
    }else if(activeHexX !== -1 && activeHexY !== -1 && !isUnitsInThisHex(x,y)){
        units[whatIsIndex(activeHexX, activeHexY)].active = false
        if(units[whatIsIndex(activeHexX, activeHexY)].type === 'Archer'){
            rangerMoveOrAttack(activeHexX, activeHexY, x, y)
        }else if(units[whatIsIndex(activeHexX, activeHexY)].type === 'Cavalery'){
            meleeMoveOrAttack(activeHexX, activeHexY, x, y)
        }
        
    }
}
var whatHexIsClicked = function(x, y){
    if(checkIsSimpleHex(x,y)) return
    var row, col
    col = Math.floor(x/32)
    row = Math.floor(y/16)
        
    for(var i = 0; i < 8; i++){
        if(row >= -1+i*6  && row <= 4+i*6){
            row = i
        }
    }
    dir = 0
    //тут начинается магия, которую я сам не пойму через несколько дней
    x = x - col*32
    y = y - row*64 - 32*row
    row *= 2

    if((col % 2 === 1) && y <= 16){
        dir = 2
    }else if((col % 2 === 1) && y >= 48){
        dir = 1
        y-=48
    }else if((col % 2 === 0) && y <= 16){
        dir = 3
    }else if((col % 2 === 0) && y >= 48){
        dir = 4
        y-=48
    }
    if(dir === 2){ // 2 четверть
        x = -(x)
        y = (-y)*2
        if(x > y){
            whatHexIsClicked2(col, row)
        } else {
            whatHexIsClicked2(++col, --row)
        }
    }else if (dir === 1){ // 1 четверть
        x = 32 - x
        y = y * 2
        if(x > y){
            whatHexIsClicked2(col, row)
        } else {
            whatHexIsClicked2(++col, ++row)
        }
    }else if(dir === 3){  //3 четверть
        x = -(32 - x)
        y = (-y)*2
         if(x > y){
            whatHexIsClicked2(col, row)
        } else {
            whatHexIsClicked2(--col, --row)
        }
    }else if (dir === 4){ //4 четверть
        x = x
        y = y*2
         if(x > y){
            whatHexIsClicked2(col, row)
        } else {
            whatHexIsClicked2(--col, ++row)
        }
    }
}
var checkDist = function(currentHexX, currentHexY, toHexX, toHexY){
    var q = 0
    if(currentHexY === toHexY){
        q = Math.abs(currentHexX - toHexX)
    }else if(currentHexX === toHexX){
        q = Math.abs(currentHexY - toHexY)*2
    }else if(Math.abs(currentHexY - toHexY) > Math.abs(currentHexX - toHexX)){
       q = Math.abs(currentHexY - toHexY)*2
    } else{
        q = Math.abs(currentHexX - toHexX) + Math.abs(currentHexY - toHexY)
    }

        q = Math.ceil(q/2)
        return q
    
}
var whatIsSpeed = function(hexX, hexY){
    for(var i = 0; i < units.length; i++){
        if(hexX === units[i].hexX && hexY === units[i].hexY){
            return units[i].speed
        }
    }
}
var whatIsIndex = function(hexX, hexY){
    for(var i = 0; i < units.length; i++){
        if(hexX === units[i].hexX && hexY === units[i].hexY){
            return i
        }
    }
}

var makeNewStepInThePath = function(currentX, currentY, toHexX, toHexY, currentArrId){
    //Путин не смотри сюда
    //Страшно
    if(isEnemyInThisHex(currentX, currentY) && units[whatIsIndex(currentX, currentY)].side !== yourSide){
        arrPaths[currentArrId][0] += 1
    }
    deltaX = toHexX - currentX
    deltaY = toHexY - currentY
    if(currentX === toHexX && currentY === toHexY){
    }else if(deltaX === deltaY && deltaX > 0 && deltaY > 0){
        arrPaths[currentArrId].push(currentX+1, currentY+1)
        makeNewStepInThePath(currentX+1, currentY+1, toHexX, toHexY, currentArrId)
    }else if(-deltaX === deltaY  && deltaX < 0 && deltaY > 0){
        arrPaths[currentArrId].push(currentX-1, currentY+1)
        makeNewStepInThePath(currentX-1, currentY+1, toHexX, toHexY, currentArrId)
    }else if(deltaX === -deltaY  && deltaX > 0 && deltaY < 0){
        arrPaths[currentArrId].push(currentX+1, currentY-1)
        makeNewStepInThePath(currentX+1, currentY-1, toHexX, toHexY, currentArrId)
    }else if(deltaX === deltaY  && deltaX < 0 && deltaY < 0){
        arrPaths[currentArrId].push(currentX-1, currentY-1)
        makeNewStepInThePath(currentX-1, currentY-1, toHexX, toHexY, currentArrId)
    }else if(deltaX > 2 && deltaY > 0){
        arrPaths.push(0, arrPaths[currentArrId].slice())
        arrPaths[currentArrId].push(currentX+2, currentY)
        arrPaths[arrPaths.length-1].push(currentX+1, currentY+1)
        makeNewStepInThePath(currentX+1, currentY+1, toHexX, toHexY, arrPaths.length-1)
        makeNewStepInThePath(currentX+2, currentY, toHexX, toHexY, currentArrId)
    }else if(deltaX > 2 && deltaY < 0){
        arrPaths.push(0, arrPaths[currentArrId].slice())
        arrPaths[currentArrId].push(currentX+2, currentY)
        arrPaths[arrPaths.length-1].push(currentX+1, currentY-1)
        makeNewStepInThePath(currentX+1, currentY-1, toHexX, toHexY, arrPaths.length-1)
        makeNewStepInThePath(currentX+2, currentY, toHexX, toHexY, currentArrId)
    }else if(deltaX < -2 && deltaY > 0){
        arrPaths.push(0, arrPaths[currentArrId].slice())
        arrPaths[currentArrId].push(currentX-2, currentY)
        arrPaths[arrPaths.length-1].push(currentX-1, currentY+1)
        makeNewStepInThePath(currentX-1, currentY+1, toHexX, toHexY, arrPaths.length-1)
        makeNewStepInThePath(currentX-2, currentY, toHexX, toHexY, currentArrId)
    }else if(deltaX < -2 && deltaY < 0){
        arrPaths.push(0, arrPaths[currentArrId].slice())
        arrPaths[currentArrId].push(currentX-2, currentY)
        arrPaths[arrPaths.length-1].push(currentX-1, currentY-1)
        makeNewStepInThePath(currentX-1, currentY-1, toHexX, toHexY, arrPaths.length-1)
        makeNewStepInThePath(currentX-2, currentY, toHexX, toHexY, currentArrId)
    }else if(deltaY === 0 && deltaX > 0){
        arrPaths[currentArrId].push(currentX+2, currentY)
        makeNewStepInThePath(currentX+2, currentY, toHexX, toHexY, currentArrId)
    }else if(deltaY === 0 && deltaX < 0){
        arrPaths[currentArrId].push(currentX-2, currentY)
        makeNewStepInThePath(currentX-2, currentY, toHexX, toHexY, currentArrId)
    }else if(deltaX === 0 && deltaY < 0){
        arrPaths.push(0, arrPaths[currentArrId].slice())
        arrPaths[currentArrId].push(currentX+1, currentY-1)
        arrPaths[arrPaths.length-1].push(currentX-1, currentY-1)
        makeNewStepInThePath(currentX-1, currentY-1, toHexX, toHexY, arrPaths.length-1)
        makeNewStepInThePath(currentX+1, currentY-1, toHexX, toHexY, currentArrId)
    }else if(deltaX === 0 && deltaY > 0){
        arrPaths.push(0, arrPaths[currentArrId].slice())
        arrPaths[currentArrId].push(currentX+1, currentY+1)
        arrPaths[arrPaths.length-1].push(currentX-1, currentY+1)
        makeNewStepInThePath(currentX-1, currentY+1, toHexX, toHexY, arrPaths.length-1)
        makeNewStepInThePath(currentX+1, currentY+1, toHexX, toHexY, currentArrId)
    }else if((deltaX === 1 || deltaX === 2) && deltaY > 0){
        arrPaths.push(0, arrPaths[currentArrId].slice())
        arrPaths[currentArrId].push(currentX+1, currentY+1)
        arrPaths[arrPaths.length-1].push(currentX-1, currentY+1)
        makeNewStepInThePath(currentX-1, currentY+1, toHexX, toHexY, arrPaths.length-1)
        makeNewStepInThePath(currentX+1, currentY+1, toHexX, toHexY, currentArrId)
    }else if((deltaX === 1 || deltaX === 2) && deltaY < 0){
        arrPaths.push(0, arrPaths[currentArrId].slice())
        arrPaths[currentArrId].push(currentX+1, currentY-1)
        arrPaths[arrPaths.length-1].push(currentX-1, currentY-1)
        makeNewStepInThePath(currentX-1, currentY-1, toHexX, toHexY, arrPaths.length-1)
        makeNewStepInThePath(currentX+1, currentY-1, toHexX, toHexY, currentArrId)
    }else if((deltaX === -1 || deltaX === -2)  && deltaY > 0){
        arrPaths.push(0, arrPaths[currentArrId].slice())
        arrPaths[currentArrId].push(currentX+1, currentY+1)
        arrPaths[arrPaths.length-1].push(currentX-1, currentY+1)
        makeNewStepInThePath(currentX-1, currentY+1, toHexX, toHexY, arrPaths.length-1)
        makeNewStepInThePath(currentX+1, currentY+1, toHexX, toHexY, currentArrId)
    }else if((deltaX === -1 || deltaX === -2)  && deltaY < 0){
        arrPaths.push(0, arrPaths[currentArrId].slice())
        arrPaths[currentArrId].push(currentX+1, currentY-1)
        arrPaths[arrPaths.length-1].push(currentX-1, currentY-1)
        makeNewStepInThePath(currentX-1, currentY-1, toHexX, toHexY, arrPaths.length-1)
        makeNewStepInThePath(currentX+1, currentY-1, toHexX, toHexY, currentArrId)
    }

}
var canThisUnitGoToThisHex = function(currentHexX, currentHexY, toHexX, toHexY, dist){
    unitIndex = whatIsIndex(currentHexX, currentHexY)
    if((units[unitIndex].speed-Math.ceil(units[unitIndex].cooldown/(600/units[unitIndex].speed))) < dist){
        return false
    }else{
        return true
    }
}
var createMovePath = function(hexX, hexY, toHexX, toHexY, dist){
    unitIndex = whatIsIndex(hexX, hexY)
    if(!canThisUnitGoToThisHex(hexX, hexY, toHexX, toHexY, dist)){
        falseHexX = toHexX
        falseHexY = toHexY
        timerFalseHex = TIMEFALSEHEX
        return
    }
   
    resultPath = []
    resultCountOfEnemy = 0
    resultArrIndex = 0
    arrPaths = [[0]]
        currentX = hexX
        currentY = hexY
        deltaX = toHexX - currentX
        deltaY = toHexY - currentY
        makeNewStepInThePath(currentX, currentY, toHexX, toHexY, 0)
        for(var i = 0; i < arrPaths.length; i++){
            if(arrPaths[i][0] > resultCountOfEnemy){
                resultCountOfEnemy = arrPaths[i][0]
                resultArrIndex = i
            }
        }
        resultPath = arrPaths[resultArrIndex].slice(1)
        for(var i = 0; i < resultPath.length; i++){
            if(i % 2) units[unitIndex].stepToY.push(resultPath[i])
            if(!(i % 2)) units[unitIndex].stepToX.push(resultPath[i])
        }
        sentUnit(toHexX, toHexY, dist)
        
}
var sentUnit = function(toHexX, toHexY, dist){
    units[unitIndex].move = true
    units[unitIndex].globalToX = toHexX
    units[unitIndex].globalToY = toHexY
    units[unitIndex].cooldown += dist*600/units[unitIndex].speed
}
var moveUnits = function(){
    for(var i = 0; i < units.length; i++){
        if(units[i].move){
            var oneStepX, oneStepY
            if(Math.round(units[i].x) === units[i].stepToX[0]*32+32 && Math.round(units[i].y) === units[i].stepToY[0]*48+32){
                units[i].hexX = units[i].stepToX[0]
                units[i].hexY = units[i].stepToY[0]
                units[i].stepToX.shift()
                units[i].stepToY.shift()
                if(units[i].stepToX.length === 0){
                    units[i].move = false
                    units[i].inCooldown = true
                    checkCollision(i)
                    break
                } 
            }
            deltaX = (units[i].stepToX[0] - units[i].hexX) * 32
            deltaY = (units[i].stepToY[0] - units[i].hexY) * 48
            oneStepX = deltaX/60*units[i].speed
            oneStepY = deltaY/60*units[i].speed
            units[i].x += oneStepX
            units[i].y += oneStepY
        }
    }
}
var checkCooldown = function(){
    for(var i = 0; i < units.length; i++){
        if(units[i].inCooldown){
            units[i].cooldown--
            if(units[i].cooldown < 1) units[i].inCooldown = false
        }
    }
}
var eatUnit = function(index){
    units.splice(index, 1)

}
var checkCollision = function(unitWhoEat){
    for(var i = 0; i < units.length; i++){
        for(var j = 0; j < units.length; j++){
            if(unitWhoEat > -1){
                if(units[unitWhoEat].hexX === units[j].hexX && units[unitWhoEat].hexY === units[j].hexY && !units[j].move && units[unitWhoEat].side !== units[j].side){
                    eatUnit(j)
                    return
                }
            }
            if(units[i].move){
                if(i !== j && units[i].hexX === units[j].hexX && units[i].hexY === units[j].hexY && !units[j].move && units[i].side !== units[j].side){
                    eatUnit(j) 
                    return  
            }
            }
            
        }
    }
}
var renderBattery = function(){
    for(var i = 0; i < units.length; i++){
        var t = 600/units[i].speed
        var countPower = units[i].speed-Math.ceil(units[i].cooldown/t)
        var k = t/6
        for(var j = 0; j <= countPower; j++){
            if(j !== countPower){
                ctx.fillStyle = ctx.fillStyle = 'rgba(29, 176, 0, 0.5)'
                ctx.fillRect(units[i].x+16, units[i].y + 10 - 8*j, 13, 6)
            }else if(units[i].cooldown % t){
                ctx.fillStyle = 'rgba(255,142,0,0.5)'
                ctx.fillRect(units[i].x+16, (units[i].y + 10 - 8*j) + (units[i].cooldown - (units[i].speed-1 - countPower)*t)/k, 13, 6 - (units[i].cooldown - (units[i].speed-1 - countPower)*t)/k)
            }
        }
    }
}
var checkFalseHex = function(){
    if(falseHexX !== -1 && falseHexY !== -1 && timerFalseHex > 0){
        ctx.drawImage(falseHex, 32*falseHexX, 48*falseHexY)
        timerFalseHex--
        if(timerFalseHex <= 0){
            falseHexX = -1
            falseHexY = -1
        }
    }
}
var moveAndCheckArrows = function(){
    for(var i = 0; i < arrows.length; i++){
        arrows[i].x += arrows[i].stepX
        arrows[i].y += arrows[i].stepY
        if(arrows[i].toX === Math.round(arrows[i].x) && arrows[i].toY === Math.round(arrows[i].y)){
            if(isEnemyInThisHex(arrows[i].toHexX, arrows[i].toHexY)){
                eatUnit(whatIsIndex(arrows[i].toHexX, arrows[i].toHexY))
            }
            arrows.splice(i, 1)
        }
    }
}
var renderArrows = function(){
    for(var i = 0; i < arrows.length; i++){
        ctx.fillRect(arrows[i].x, arrows[i].y, 4, 4)
    }
}
var renderUnits = function(){
    for(var i = 0; i < units.length; i++){
        if(units[i].active && units[i].side === "Blue"){
            units[i].color = '#67E300'
        } else if(units[i].side === "Blue"){
            units[i].color = '#4671D5'
        }
        ctx.fillStyle = units[i].color
        ctx.fillRect(units[i].x, units[i].y, 8, 8)
        renderBattery()
    }
    ctx.fillStyle = '#000000'
    
}
var mainLoop = function(){
    ctx.clearRect(0, 0, width, height)
    moveAndCheckArrows()
    renderArrows()
    checkCooldown()
    checkCollision()
    moveUnits()
    checkFalseHex()
    renderUnits()
    drawHex()
    requestAnimationFrame(mainLoop)
}
mainLoop()
createArrs()
createUnitsArr()