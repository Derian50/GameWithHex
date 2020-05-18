
var cvs = document.getElementById('canvas')
var ctx = cvs.getContext("2d")
var width = 1600,
    height = 900
cvs.width = width
cvs.height = height

var emptyHex = new Image()
emptyHex.src = 'assets/emptyHex.png'

var falseHex = new Image()
falseHex.src = 'assets/FalseHex.png'

var mistHex = new Image()
mistHex.src = 'assets/mistHex.png'

var plainHex = new Image()
plainHex.src = 'assets/plainHex.png'

var forestHex = new Image()
forestHex.src = 'assets/forestHex.png'

var beachHex = new Image()
beachHex.src = 'assets/beachHex.png'

var hillHex = new Image()
hillHex.src = 'assets/hillHex.png'

var mountainHex = new Image()
mountainHex.src = 'assets/mountainHex.png'

var waterHex = new Image()
waterHex.src = 'assets/waterHex.png'



var yourSide = 'Blue'
var typeHex = []
var hexArr = null
var unitsArr = []
var buildsArr = []
var HEXWIDTH = 50
var HEXHEIGHT = 20
var activeHexX = -1, activeHexY = -1, activeType = null
var falseHexX = -1, falseHexY = -1, timerFalseHex = -1
var TIMEFALSEHEX = 5
var mapEditor = true
var currentEditorColor = 'rgb(147, 200, 83)'
var currentEditorColorName = 'plain'
var arrows = [

]
var builds = [
    {
        id: 0,
        type: 'Castle',
        side: 'Blue',
        active: false,
        color: '#808080',
        speed: 1,
        x: 222,
        y: 222,
        hexX: 8,
        hexY: 6,
        makeUnit: false,
        makeUnitType: null,
        makeUnitTimeToEnd: null,
        range: 3,
        inCooldown: false,
        cooldownAttack: null,
        canAttack: true
    },
    {
        id: 0,
        type: 'Castle',
        side: 'Blue',
        active: false,
        color: '#808080',
        x: 222,
        y: 222,
        speed: 1,
        hexX: 10,
        hexY: 6,
        makeUnit: false,
        makeUnitType: null,
        makeUnitTimeToEnd: null,
        range: 3,
        cooldownAttack: null,
        canAttack: true
    },
    {
        id: 0,
        type: 'Barrack',
        side: 'Blue',
        active: false,
        color: '#808080',
        x: 222,
        y: 222,
        speed: 1,
        hexX: 10,
        hexY: 4,
        makeUnit: false,
        makeUnitType: null,
        makeUnitTimeToEnd: null,
        range: 3,
        cooldownAttack: null,
        canAttack: true
    },
    {
        id: 0,
        type: 'RifleRange',
        side: 'Blue',
        active: false,
        color: '#808080',
        x: 222,
        y: 222,
        speed: 1,
        hexX: 12,
        hexY: 4,
        makeUnit: false,
        makeUnitType: null,
        makeUnitTimeToEnd: null,
        range: 3,
        cooldownAttack: null,
        canAttack: true
    },
    {
        id: 0,
        type: 'Stable',
        side: 'Blue',
        active: false,
        color: '#808080',
        x: 222,
        y: 222,
        speed: 1,
        hexX: 14,
        hexY: 4,
        makeUnit: false,
        makeUnitType: null,
        makeUnitTimeToEnd: null,
        range: 3,
        cooldownAttack: null,
        canAttack: true
    },
    {
        id: 0,
        type: 'House',
        side: 'Blue',
        active: false,
        color: '#808080',
        x: 222,
        y: 222,
        speed: 1,
        hexX: 16,
        hexY: 4,
        makeUnit: false,
        makeUnitType: null,
        makeUnitTimeToEnd: null,
        range: 3,
        cooldownAttack: null,
        canAttack: true
    }

]
var units = [
    {
        id: 0,
        type: 'Worker',
        speed: 2,
        color: '#4671D5',
        active: false,
        x: 64,
        y: 48*3+32,
        hexX: 21,
        hexY: 7,
        finalHexX: 1,
        finalHexY: 3,
        move: false,
        direction: 'down-right',
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
        direction: 'down-left',
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
        direction: 'right',
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
        direction: 'left',
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
        direction: 'down',
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
        range: 2,
        color: '#3914AF',
        active: false,
        x: 4*32+32,
        y: 48*0+32,
        hexX: 10,
        hexY: 10,
        finalHexX: 4,
        finalHexY: 0,
        move: false,
        direction: 'down',
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
        range: 2,
        color: '#3914AF',
        active: false,
        x: 4*32+32,
        y: 48*0+32,
        hexX: 12,
        hexY: 10,
        finalHexX: 4,
        finalHexY: 0,
        move: false,
        direction: 'down',
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
        range: 2,
        color: '#3914AF',
        active: false,
        x: 4*32+32,
        y: 48*0+32,
        hexX: 14,
        hexY: 10,
        finalHexX: 4,
        finalHexY: 0,
        move: false,
        direction: 'down',
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
        range: 2,
        color: '#3914AF',
        active: false,
        x: 4*32+32,
        y: 48*0+32,
        hexX: 16,
        hexY: 10,
        finalHexX: 4,
        finalHexY: 0,
        move: false,
        direction: 'down',
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
        type: 'Scout',
        speed: 3,
        color: '#0A61B3',
        active: false,
        x: 0*32+32,
        y: 48*0+32,
        hexX: 0,
        hexY: 0,
        finalHexX: 0,
        finalHexY: 0,
        move: false,
        direction: 'down',
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
        type: 'Spear',
        speed: 2,
        color: '#0A61B3',
        active: false,
        x: 0*32+32,
        y: 48*0+32,
        hexX: 2,
        hexY: 0,
        finalHexX: 0,
        finalHexY: 0,
        move: false,
        direction: 'down',
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
        type: 'Skirmisher',
        speed: 2,
        range: 3,
        color: '#0A61B3',
        active: false,
        x: 0*32+32,
        y: 48*0+32,
        hexX: 2,
        hexY: 4,
        finalHexX: 0,
        finalHexY: 0,
        move: false,
        direction: 'down',
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
        type: 'Dragoon',
        speed: 4,
        range: 3,
        color: '#0A61B3',
        active: false,
        x: 0*32+32,
        y: 48*0+32,
        hexX: 6,
        hexY: 4,
        finalHexX: 0,
        finalHexY: 0,
        move: false,
        direction: 'down',
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
        range: 2,
        color: '#3914AF',
        active: false,
        x: 4*32+32,
        y: 48*0+32,
        hexX: 8,
        hexY: 0,
        finalHexX: 4,
        finalHexY: 0,
        move: false,
        direction: 'down',
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
        range: 2,
        color: '#FF14AF',
        active: false,
        x: 5*32+32,
        y: 48*3+32,
        hexX: 14,
        hexY: 8,
        finalHexX: 5,
        finalHexY: 3,
        move: false,
        direction: 'down',
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
        range: 2,
        color: '#FF14AF',
        active: false,
        x: 5*32+32,
        y: 48*3+32,
        hexX: 10,
        hexY: 8,
        finalHexX: 5,
        finalHexY: 3,
        move: false,
        direction: 'down',
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
        range: 2,
        color: '#FF14AF',
        active: false,
        x: 5*32+32,
        y: 48*3+32,
        hexX: 12,
        hexY: 8,
        finalHexX: 5,
        finalHexY: 3,
        move: false,
        direction: 'down',
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
        direction: 'down',
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
        direction: 'down',
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
        direction: 'down',
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
        direction: 'down',
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
        direction: 'down',
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
        direction: 'down',
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
/* var createHexArrs = function(){
    for(var i = 0; i < HEXWIDTH; i++){
        hexArr[i] = []
        for(var j = 0; j < HEXWIDTH; j++){
            if((i%2) === (j%2)){ //чёт-чёту, нечёт-нечёту

                hexArr[i][j] = {
                    groundType: '', //равнина, лес, холм, горы, вода
                    haveRiver: false,
                    visible: false
                }
            }
        }
    }
} */
socket.emit('getMapInfo')
socket.on('setMapInfo', function(newHexArr){
    console.log('Я получил данные о хексах')
    hexArr = newHexArr
    startGame()
})
var updateVisible = function(){
    for(var i = 0; i < HEXWIDTH; i++){
        for(var j = 0; j < HEXHEIGHT; j++){
            if((i%2) == (j%2)){
                hexArr[i][j].visible = true
            }
        }
    }
    for(var i = 0; i < units.length; i++){
        if(units[i].side !== yourSide) continue
        var x = units[i].hexX
        var y = units[i].hexY
        startX = x-4
        startY = y-2
        for(var j = startX; j < startX+9; j++){
            for(var k = startY; k < startY+5; k++){
                if(j >= 0 && k >= 0 && j < HEXWIDTH && k < HEXHEIGHT && (j%2 == k%2)){
                    if(checkDist(x,y,j,k) < 3){
                        hexArr[j][k].visible = true
                    }
                }
            }
        }
    }
    for(var i = 0; i < builds.length; i++){
        if(builds[i].side !== yourSide) continue
        var x = builds[i].hexX
        var y = builds[i].hexY
        startX = x-5
        startY = y-3
        for(var j = startX; j < startX+11; j++){
            for(var k = startY; k < startY+7; k++){
                if(j >= 0 && k >= 0 && j < HEXWIDTH && k < HEXHEIGHT && (j%2 == k%2)){
                    if(builds[i].type == 'Castle'){
                        if(checkDist(x,y,j,k) < 4){
                            hexArr[j][k].visible = true
                        }
                    }else{
                        if(checkDist(x,y,j,k) < 2){
                            hexArr[j][k].visible = true
                        }
                    }
                }
            }
        }
    }
}
var createArrs = function(){
    for(var i = 0; i < HEXWIDTH; i++){
        
        typeHex[i] = []
        unitsArr[i] = []
        for(var j = 0; j < HEXHEIGHT; j++){
            if((i%2) === (j%2)){ 
                typeHex[i][j] = 0
                unitsArr[i][j] = 0
            }else{
                typeHex[i][j] = -1
                unitsArr[i][j] = -1
            }
        }
    }
}
var createUnitsArr = function(){
    for(var i = 0; i < units.length; i++){
        units[i].id = i
        units[i].finalHexX = units[i].hexX
        units[i].finalHexY = units[i].hexY
        units[i].x = units[i].hexX*32+32
        units[i].y = units[i].hexY*48+32
        units[i].direction = 'right'
    }
}
var createBuildsArr = function(){
    for(var i = 0; i < builds.length; i++){
        builds[i].id = i
        builds[i].x = builds[i].hexX*32+32
        builds[i].y = builds[i].hexY*48+32
    }
}
var drawHex = function(){
    for(var i = 0; i < HEXWIDTH; i++){
        for(var j = 0; j < HEXHEIGHT; j++){
            if((i%2) === (j%2)){        
                if(!hexArr[i][j].visible){
                    ctx.drawImage(mistHex, 32*i, 48*j)
                }else if(hexArr[i][j].groundType == 'plain'){
                    ctx.drawImage(plainHex, 32*i, 48*j)
                }else if(hexArr[i][j].groundType == 'forest'){
                    ctx.drawImage(forestHex, 32*i, 48*j)
                }else if(hexArr[i][j].groundType == 'hill'){
                    ctx.drawImage(hillHex, 32*i, 48*j)
                }else if(hexArr[i][j].groundType == 'beach'){
                    ctx.drawImage(beachHex, 32*i, 48*j)
                }else if(hexArr[i][j].groundType == 'mountain'){
                    ctx.drawImage(mountainHex, 32*i, 48*j)
                }else if(hexArr[i][j].groundType == 'water'){
                    ctx.drawImage(waterHex, 32*i, 48*j)
                }
                ctx.drawImage(emptyHex, 32*i, 48*j)
            }
        }
    }
}
window.onmousedown = function(e){
    if(this.mapEditor){
       if(e.offsetX > 1500 && e.offsetX < 1564){
           if(e.offsetY > 148 && e.offsetY < 212){
            this.currentEditorColor = 'rgb(147, 200, 83)'
            this.currentEditorColorName = 'plain'
           }else if(e.offsetY > 212 && e.offsetY < 276){
            this.currentEditorColor = 'rgb(31, 116, 16)'
            this.currentEditorColorName = 'forest'
           }else if(e.offsetY > 276 && e.offsetY < 340){
            this.currentEditorColor = 'rgb(255, 255, 130)'
            this.currentEditorColorName = 'beach'
           }else if(e.offsetY > 340 && e.offsetY < 404){
            this.currentEditorColor = 'rgb(176, 129, 21)'
            this.currentEditorColorName = 'hill'
           }else if(e.offsetY > 404 && e.offsetY < 468){
            this.currentEditorColor = 'rgb(105, 24, 4)'
            this.currentEditorColorName = 'mountain'
           }else if(e.offsetY > 468 && e.offsetY < 532){
            this.currentEditorColor = 'rgb(0, 6, 104)'
            this.currentEditorColorName = 'water'
           }
       }
    }
    this.whatHexIsClicked(e.offsetX, e.offsetY)
    
}
var checkIsSimpleHex = function(x,y){
    for(var i = 0; i < HEXHEIGHT*2; i++){
        if(((y - i*48) > 16) && ((y - i*48) < 48)){
            col = Math.floor(x/32)
            row = Math.floor(y/48)
            whatHexIsClicked2(col,row)
            return true
        }
    }
    return false
}
var isCastleInThisHex = function(x,y){
    for(var i = 0; i < builds.length; i++){
        if(builds[i].hexX === x && builds[i].hexY === y && builds[i].type == 'Castle'){
            return true
        }
    }
}
var isEnemyInThisHex = function(x,y){
    for(var i = 0; i < units.length; i++){
        if(units[i].hexX === x && units[i].hexY === y && units[i].side !== yourSide){
            return true
        }
    }
}
var isBuildsInThisHex = function(x,y){
    for(var i = 0; i < builds.length; i++){
        if(builds[i].hexX === x && builds[i].hexY === y){
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
var castleAttack = function(currentHexX, currentHexY, x, y){
    if(isEnemyInThisHex(x, y)){
        var dist = checkDist(currentHexX, currentHexY, x, y)
        if(dist <= 3 && !builds[whatIsBuildIndex(currentHexX, currentHexY)].inCooldown){
            builds[whatIsBuildIndex(currentHexX, currentHexY)].cooldownAttack = 600
            builds[whatIsBuildIndex(currentHexX, currentHexY)].inCooldown = true
            createArrowAndShot(currentHexX, currentHexY, x, y, dist, 3, 'justArrow')
            activeType = null
            activeHexX = -1
            activeHexY = -1
        }else{
            
            builds[whatIsBuildIndex(currentHexX, currentHexY)].active = true
            activeType = 'build'
            falseHexX = x
            falseHexY = y
            timerFalseHex = TIMEFALSEHEX
        }
    }else{
            activeType = null
            activeHexX = -1
            activeHexY = -1
    }
}
var meleeMoveOrAttack = function(currentHexX, currentHexY, x, y){
    var dist = checkDist(currentHexX, currentHexY, x, y)
    var unitsIndex = whatIsUnitIndex(currentHexX, currentHexY)
    if(canThisUnitGoToThisHex(currentHexX, currentHexY, x, y, dist)){
        units[unitsIndex].active = false
        activeHexX = -1
        activeHexY = -1
        activeType = null
        createMovePath(currentHexX, currentHexY, x, y, dist)
    }else{
        units[unitsIndex].active = true
        activeType = 'unit'
        falseHexX = x
        falseHexY = y
        timerFalseHex = TIMEFALSEHEX
    }
    
    
}
var createArrowAndShot = function(currentHexX, currentHexY, toHexX, toHexY, dist, speed, type){
    if(type == 'dartArrow'){
        if(dist == 1){
            toHexX += (toHexX - currentHexX)*2
            toHexY += (toHexY - currentHexY)*2
        }else if(dist == 2){
            toHexX += (toHexX - currentHexX)/2
            toHexY += (toHexY - currentHexY)/2
        }
        dist = 3
    }
    index = arrows.length
    arrows.push({})
    arrows[index].id = index
    arrows[index].type = type
    arrows[index].x = currentHexX*32+32
    arrows[index].y = currentHexY*48+32
    arrows[index].toX = toHexX*32+32
    arrows[index].toY = toHexY*48+32
    arrows[index].toHexX = toHexX
    arrows[index].toHexY = toHexY
    arrows[index].speed = speed
    var deltaStepX = (arrows[index].toX-arrows[index].x)/60
    var deltaStepY = (arrows[index].toY-arrows[index].y)/60
    arrows[index].stepX = (arrows[index].speed/dist)*deltaStepX
    arrows[index].stepY = (arrows[index].speed/dist)*deltaStepY
}
var workerMove = function(currentHexX, currentHexY, x, y){
    var dist = checkDist(currentHexX, currentHexY, x, y)
    var unitIndex = whatIsUnitIndex(currentHexX, currentHexY)
    if(canThisUnitGoToThisHex(currentHexX, currentHexY, x, y, dist) && !isEnemyInThisHex(x,y)){
        units[unitIndex].active = false
        activeType = null
        activeHexX = -1
        activeHexY = -1
        createMovePath(currentHexX, currentHexY, x, y, dist)
    }else{
        units[unitIndex].active = true
        activeType = 'unit'
        falseHexX = x
        falseHexY = y
        timerFalseHex = TIMEFALSEHEX
    }
}
var rangerMoveOrAttack = function(currentHexX, currentHexY, x, y){
    var dist = checkDist(currentHexX, currentHexY, x, y)
    var unitIndex = whatIsUnitIndex(currentHexX, currentHexY)
    if(isEnemyInThisHex(x,y) && units[whatIsUnitIndex(x,y)].side !== yourSide && dist <= units[unitIndex].range && 600-units[unitIndex].cooldown >= 600/units[unitIndex].speed){
        units[unitIndex].active = false
        activeHexX = -1
        activeHexY = -1
        activeType = null
        
        if(isEnemyInThisHex(x,y) && units[whatIsUnitIndex(x,y)].side !== yourSide && rangerCanAttack(currentHexX, currentHexY, x, y, dist, units[unitIndex].speed)){
            units[unitIndex].inCooldown = true
            units[unitIndex].cooldown += (600/units[unitIndex].speed)
            if(units[unitIndex].type == 'Archer' || units[unitIndex].type == 'Dragoon'){
                createArrowAndShot(currentHexX, currentHexY, x, y, dist, units[unitIndex].speed, 'justArrow')
            } else if(units[unitIndex].type == 'Skirmisher'){
                createArrowAndShot(currentHexX, currentHexY, x, y, dist, units[unitIndex].speed, 'dartArrow')
            }
        }
        else{
            falseHexX = x
            falseHexY = y
            timerFalseHex = TIMEFALSEHEX
        }
    }else if(canThisUnitGoToThisHex(currentHexX, currentHexY, x, y, dist)){
        
        units[unitIndex].active = false
        activeType = null
        activeHexX = -1
        activeHexY = -1
        createMovePath(currentHexX, currentHexY, x, y, dist)
    }else{
        units[unitIndex].active = true
        activeType = 'unit'
        falseHexX = x
        falseHexY = y
        timerFalseHex = TIMEFALSEHEX
    }




}
var rangerCanAttack = function(currentHexX, currentHexY, toHexX, toHexY, dist, speed){
    
    var deltaStepX = ((toHexX*32+32)-(currentHexX*32+32))/60
    var deltaStepY = ((toHexY*48+32)-(currentHexY*48+32))/60
    var stepX = speed/dist*deltaStepX/3
    var stepY = speed/dist*deltaStepY/3
    var tempArrowX = currentHexX*32+32
    var tempArrowY = currentHexY*48+32
    for(var i = 0; i < dist/speed*60*3; i++){
        tempArrowX += stepX
        tempArrowY += stepY
        for(var j = 0; j < builds.length; j++){
            if(builds[j].x == Math.round(tempArrowX) && builds[j].y == Math.round(tempArrowY) && builds[j].type == 'Castle'){
                return false
            }
        }
    }
    return true
}
var whatIsDirection = function(currentHexX, currentHexY, toHexX, toHexY){
    deltaX = toHexX - currentHexX
    deltaY = toHexY - currentHexY
    if(deltaY == 0 && deltaX == 2){
        return 'right'
    }else if(deltaY == 0 && deltaX == -2){
        return 'left'
    }else if(deltaY == 1 && deltaX == 1){
        return 'down-right'
    }else if(deltaY == 1 && deltaX == -1){
        return 'down-left'
    }else if(deltaY == -1 && deltaX == 1){
        return 'up-right'
    }else if(deltaY == -1 && deltaX == -1){
        return 'up-left'
    }
}
var whatHexIsClicked2 = function(x, y){
    
    if((x + y) % 2 === 1) x--
    if(mapEditor){

        hexArr[x][y].groundType = currentEditorColorName
        socket.emit('editMapInfo', hexArr)
        return
    }
    if((activeHexX === x && activeHexY === y) || x < 0 || y < 0){
        if(activeType === 'build'){
            builds[whatIsBuildIndex(activeHexX,activeHexY)].active = false
        }else if(activeType === 'unit'){
            units[whatIsUnitIndex(activeHexX,activeHexY)].active = false
        }
        activeType = null   
        activeHexX = -1
        activeHexY = -1
        return
    }
    if(isUnitsInThisHex(x,y) && units[whatIsUnitIndex(x,y)].side === yourSide && units[whatIsUnitIndex(x,y)].canMove && units[whatIsUnitIndex(x,y)].move === false){
        if(activeHexX !== -1){   
            if(activeType === 'build'){
                builds[whatIsBuildIndex(activeHexX,activeHexY)].active = false
            }else if(activeType === 'unit'){
                units[whatIsUnitIndex(activeHexX,activeHexY)].active = false
            }
        }
        units[whatIsUnitIndex(x,y)].active = true
        activeType = 'unit'
        activeHexX = x
        activeHexY = y
        
    }else if(isBuildsInThisHex(x,y) && builds[whatIsBuildIndex(x,y)].side === yourSide && (!builds[whatIsBuildIndex(x,y)].makeUnit || builds[whatIsBuildIndex(x,y)].canAttack)){
        if(activeHexX !== -1){      
            if(activeType === 'build'){
                builds[whatIsBuildIndex(activeHexX,activeHexY)].active = false
            }else if(activeType === 'unit'){
                units[whatIsUnitIndex(activeHexX,activeHexY)].active = false
            }
        }
        builds[whatIsBuildIndex(x,y)].active = true
        activeType = 'build'
        activeHexX = x
        activeHexY = y

    }else if(activeHexX !== -1 && activeHexY !== -1 && !isUnitsInThisHex(x,y) && !isBuildsInThisHex(x,y)){
          
        if(activeType === 'build'){
            builds[whatIsBuildIndex(activeHexX,activeHexY)].active = false            
            if(builds[whatIsBuildIndex(activeHexX, activeHexY)].type === 'Castle'){
                castleAttack(activeHexX, activeHexY, x, y)
            }
            activeType = null
            activeHexX = -1
            activeHexY = -1
        }else if(activeType === 'unit'){
            units[whatIsUnitIndex(activeHexX,activeHexY)].active = false
            activeType = null
            if(units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'Archer' || units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'Skirmisher' || units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'Dragoon'){
                rangerMoveOrAttack(activeHexX, activeHexY, x, y)
            }else if(units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'Cavalery' || units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'Scout' || units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'Spear'){
                meleeMoveOrAttack(activeHexX, activeHexY, x, y)
            }else if(units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'Worker'){
                workerMove(activeHexX, activeHexY, x, y)
            }
        }
    }
}
var whatHexIsClicked = function(x, y){
    if(checkIsSimpleHex(x,y)) return
    var row, col
    col = Math.floor(x/32)
    row = Math.floor(y/16)
        
    for(var i = 0; i < HEXHEIGHT; i++){
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
var whatIsBuildIndex = function(hexX, hexY){
    for(var i = 0; i < builds.length; i++){
        if(hexX === builds[i].hexX && hexY === builds[i].hexY){
            return i
        }
    }
}
var whatIsUnitIndex = function(hexX, hexY){
    for(var i = 0; i < units.length; i++){
        if(hexX === units[i].hexX && hexY === units[i].hexY){
            return i
        }
    }
}

var makeNewStepInThePath = function(currentX, currentY, toHexX, toHexY, currentArrId, type){
    if(type == 'Range'){
        unitIndex = whatIsUnitIndex(currentX, currentY)
        dist = checkDist(currentX, currentY, toHexX, toHexY)
        speed = units[unitIndex].speed
        countOfEnemy = 0
        
        startX = currentX
        startY = currentY

        var tempFunc = function(arr){
            x = arr[0]
            y = arr[1]
            tempArr = [x,y,[],[],[],[],[],[]]
            tempArr[2].push(x+2, y)
            tempArr[3].push(x-2, y)
            tempArr[4].push(x+1, y+1)
            tempArr[5].push(x+1, y-1)
            tempArr[6].push(x-1, y+1)
            tempArr[7].push(x-1, y-1)
            return tempArr
        }
        tempArrPaths = [startX, startY]
        tempArrPaths = tempFunc([tempArrPaths[0], tempArrPaths[1]]) // первый шаг
        for(var i = 2; i < 8; i++){ // второй шаг
            tempArrPaths[i] = tempFunc([tempArrPaths[i][0], tempArrPaths[i][1]])
            for(var j = 2; j < 8; j++){ // третий шаг
                tempArrPaths[i][j] = tempFunc([tempArrPaths[i][j][0], tempArrPaths[i][j][1]])
                for(var k = 2; k < 8; k++){ // четвертый шаг      
                    tempArrPaths[i][j][k] = tempFunc([tempArrPaths[i][j][k][0], tempArrPaths[i][j][k][1]])

                }
            }
        }
        return tempArrPaths
    }else{

    
    
        //Путин не смотри сюда
        //Страшно
        if(isEnemyInThisHex(currentX, currentY) && units[whatIsUnitIndex(currentX, currentY)].side !== yourSide){
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
}
var canThisUnitGoToThisHex = function(currentHexX, currentHexY, toHexX, toHexY, dist){
    unitIndex = whatIsUnitIndex(currentHexX, currentHexY)
    if((units[unitIndex].speed-Math.ceil(units[unitIndex].cooldown/(600/units[unitIndex].speed))) < dist){
        return false
        
    }else{
        for(var i = 0; i < units.length; i++){
            if(units[i].globalToX == toHexX && units[i].globalToY == toHexY){
                return false
            }
        }
        return true
    }
}
var createMovePath = function(hexX, hexY, toHexX, toHexY, dist){
    unitIndex = whatIsUnitIndex(hexX, hexY)
    if(!canThisUnitGoToThisHex(hexX, hexY, toHexX, toHexY, dist)){
        falseHexX = toHexX
        falseHexY = toHexY
        timerFalseHex = TIMEFALSEHEX
        return
    }
   
    resultPath = []
    resultCountOfEnemy = 0
    resultArrIndex = -1
    arrPaths = [[0]]
    currentX = hexX
    currentY = hexY
    deltaX = toHexX - currentX
    deltaY = toHexY - currentY
    
    if(units[whatIsUnitIndex(hexX, hexY)].type === 'Archer' || units[whatIsUnitIndex(hexX, hexY)].type === 'Skirmisher' || units[whatIsUnitIndex(hexX, hexY)].type === 'Dragoon' || units[whatIsUnitIndex(hexX, hexY)].type === 'Worker'){
        arrPaths = makeNewStepInThePath(currentX, currentY, toHexX, toHexY, 0, 'Range')
        result = []
        currentDist = 999
        out: for(var i = 2; i < 8; i++){
            if(isEnemyInThisHex(arrPaths[i][0], arrPaths[i][1])) continue
            if(toHexX == arrPaths[i][0] && toHexY == arrPaths[i][1] && currentDist > 1){
                result = [arrPaths[i][0], arrPaths[i][1]]
                currentDist = 1
                break
            }
            for(var j = 2; j < 8; j++){
                if(isEnemyInThisHex(arrPaths[i][j][0], arrPaths[i][j][1])) continue
                if(toHexX == arrPaths[i][j][0] && toHexY == arrPaths[i][j][1]  && currentDist > 2){
                    result = [arrPaths[i][0], arrPaths[i][1], arrPaths[i][j][0], arrPaths[i][j][1]]
                    currentDist = 2
                    break
                }
                for(var k = 2; k < 8; k++){
                    if(isEnemyInThisHex(arrPaths[i][j][k][0], arrPaths[i][j][k][1])) continue
                    if(toHexX == arrPaths[i][j][k][0] && toHexY == arrPaths[i][j][k][1] && currentDist > 3){
                        result = [arrPaths[i][0], arrPaths[i][1], arrPaths[i][j][0], arrPaths[i][j][1], arrPaths[i][j][k][0], arrPaths[i][j][k][1]]
                        currentDist = 3
                        break
                    }
                    for(var z = 2; z < 8; z++){
                        if(isEnemyInThisHex(arrPaths[i][j][k][z][0], arrPaths[i][j][k][z][1])) continue
                        if(toHexX == arrPaths[i][j][k][z][0] && toHexY == arrPaths[i][j][k][z][1] && currentDist > 4){
                            result = [arrPaths[i][0], arrPaths[i][1], arrPaths[i][j][0], arrPaths[i][j][1], arrPaths[i][j][k][0], arrPaths[i][j][k][1], arrPaths[i][j][k][z][0], arrPaths[i][j][k][z][1]]
                            currentDist = 4
                            break
                        }
                    }
                }
            }
        }
        dist = currentDist
        
        var t = 600/units[unitIndex].speed
        var countPower = units[unitIndex].speed-Math.ceil(units[unitIndex].cooldown/t)
        if(countPower < dist){
            activeHexX = hexX
            activeHexY = hexY
            activeType = 'unit'
            units[unitIndex].active = true
            falseHexX = toHexX
            falseHexY = toHexY
            timerFalseHex = TIMEFALSEHEX
            return
        }
        result.unshift(0)
        arrPaths = []
        arrPaths.push(result)
        resultArrIndex = 0

    }else if(units[whatIsUnitIndex(hexX, hexY)].type === 'Cavalery' || units[whatIsUnitIndex(hexX, hexY)].type === 'Scout' || units[whatIsUnitIndex(hexX, hexY)].type === 'Spear'){
        makeNewStepInThePath(currentX, currentY, toHexX, toHexY, 0, 'Melee')
        resultArrIndex = 0
        for(var i = 0; i < arrPaths.length; i++){
            if(arrPaths[i][0] > resultCountOfEnemy){
                resultCountOfEnemy = arrPaths[i][0]
                resultArrIndex = i
            }
        }
    }
    if(resultArrIndex > -1){
        resultPath = arrPaths[resultArrIndex].slice(1)
        for(var i = 0; i < resultPath.length; i++){
            if(i % 2) units[unitIndex].stepToY.push(resultPath[i])
            if(!(i % 2)) units[unitIndex].stepToX.push(resultPath[i])
        }
        sentUnit(toHexX, toHexY, dist)
    }else{
        falseHexX = toHexX
        falseHexY = toHexY
        timerFalseHex = TIMEFALSEHEX
    }
        
}
var sentUnit = function(toHexX, toHexY, dist){
    units[unitIndex].move = true
    units[unitIndex].globalToX = toHexX
    units[unitIndex].globalToY = toHexY
    units[unitIndex].cooldown += dist*600/units[unitIndex].speed
    units[unitIndex].direction = whatIsDirection(units[unitIndex].hexX, units[unitIndex].hexY, units[unitIndex].stepToX[0], units[unitIndex].stepToY[0])
}

var SpearEatEnemyIfCan = function(x, y){
    for(var i = 0; i < units.length; i++){
        if(units[i].hexX == x && units[i].hexY == y && units[i].side != yourSide){
            fight(whatIsUnitIndex(x,y),i)
            //eatUnit(i)
            return true
        }
    }
}
var moveUnits = function(){
    for(var i = 0; i < units.length; i++){
        if(units[i].move){
            if(units[i].type === 'Spear'){
                if(SpearEatEnemyIfCan(units[i].stepToX[0], units[i].stepToY[0])){
                    if(units[i].stepToX.length == 1){ 
                        units[i].globalToX = units[i].hexX
                        units[i].globalToY = units[i].hexY
                        units[i].stepToX.shift()
                        units[i].stepToY.shift()
                        units[i].move = false
                        units[i].inCooldown = true
                        checkCollision(i)
                        break
                    }
                }
            }
            var oneStepX, oneStepY
            if(Math.round(units[i].x) === units[i].stepToX[0]*32+32 && Math.round(units[i].y) === units[i].stepToY[0]*48+32){
                units[i].hexX = units[i].stepToX[0]
                units[i].hexY = units[i].stepToY[0]
                units[i].stepToX.shift()
                units[i].stepToY.shift()
                updateVisible()
                if(units[i].stepToX.length === 0){
                    units[i].move = false
                    units[i].inCooldown = true
                    checkCollision(i)
                    break
                } 
                units[i].direction = whatIsDirection(units[i].hexX, units[i].hexY, units[i].stepToX[0], units[i].stepToY[0])
                break
                
                
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
    for(var i = 0; i < builds.length; i++){
        if(builds[i].inCooldown){
            builds[i].cooldownAttack--
            if(builds[i].cooldownAttack < 1) builds[i].inCooldown = false
        }
    }
}
var fight = function(unitIndexAttack, unitIndexDefend, isArrow){
    if(isArrow){
        if(unitIndexDefend == 'Worker' || unitIndexDefend == 'Scout'){
            eatUnit(unitIndexDefend)
        }else{
            chance = 0.75
            if(isAttackerWinInTheFight(chance)){
                eatUnit(unitIndexDefend)
            }
        }
        return
    }
    typeAttack = null //сзади, сбоку, спереди(front, flank, back)
    attackerDir = units[unitIndexAttack].direction
    defenderDir = units[unitIndexDefend].direction
    attackerType = units[unitIndexAttack].type
    defenderType = units[unitIndexDefend].type

    if(
    (attackerDir == 'right' && defenderDir == 'left') ||
    (attackerDir == 'left' && defenderDir == 'right') ||
    (attackerDir == 'down-right' && defenderDir == 'up-left') ||
    (attackerDir == 'down-left' && defenderDir == 'up-right') ||
    (attackerDir == 'up-right' && defenderDir == 'down-left') ||
    (attackerDir == 'up-left' && defenderDir == 'down-right')
    ){
        typeAttack = 'front'
    }else if(
    (attackerDir == 'right' && (defenderDir == 'up-left' || defenderDir == 'down-left')) ||
    (attackerDir == 'left' && (defenderDir == 'up-right' || defenderDir == 'down-right')) ||
    (attackerDir == 'down-right' && (defenderDir == 'left' || defenderDir == 'up-right')) ||
    (attackerDir == 'down-left' && (defenderDir == 'right' || defenderDir == 'up-left')) ||
    (attackerDir == 'up-right' && (defenderDir == 'left' || defenderDir == 'down-right')) ||
    (attackerDir == 'up-left' && (defenderDir == 'right' || defenderDir == 'down-left'))
    ){
        typeAttack = 'flank'
    }else{
        typeAttack = 'back'
    }
    attackerChanceToWin = getChanceToWin(typeAttack, attackerType, defenderType)
    if(isAttackerWinInTheFight(attackerChanceToWin)){
        eatUnit(unitIndexDefend)
    }else{
        eatUnit(unitIndexAttack)
    }

}
var isAttackerWinInTheFight = function(chance){
    if(Math.random() < chance){
        return true
    }else{
        return false
    }
}
var getChanceToWin = function(typeAttack, attackerType, defenderType){
    
    chance = 0.5
    
    if(typeAttack == 'back') chance += 0.5
    if(typeAttack == 'flank') chance += 0.25
    if(defenderType == 'Worker') chance += 0.25
    if(defenderType == 'Dragoon' && (attackerType == 'Cavalery' || attackerType == 'Spear')) chance += 0.5
    if(defenderType == 'Dragoon' && attackerType == 'Scout') chance -= 0.25
    if(attackerType == 'Spear' && defenderType == 'Cavalery') chance += 0.5
    if(attackerType == 'Cavalery' && defenderType == 'Spear' && typeAttack == 'front') chance += -0.5
    if(attackerType == 'Cavalery' && defenderType == 'Spear' && typeAttack == 'flank') chance += -0.25
    if(attackerType == 'Cavalery' && defenderType == 'Spear' && typeAttack == 'back') chance += 0.5
    if(attackerType == 'Cavalery' && defenderType == 'Scout') chance += 0.25
    if(attackerType == 'Scout' && defenderType == 'Cavalery') chance += -0.25
    if(defenderType == 'Archer' || defenderType == 'Skirmisher') chance += 0.5
    if(chance > 1) chance = 1
    if(chance < 0) chance = 0
    return chance
}
var eatUnit = function(index){
    units.splice(index, 1)

}
var checkCollision = function(unitWhoEat){
    for(var i = 0; i < units.length; i++){
        for(var j = 0; j < units.length; j++){
            if(unitWhoEat > -1){
                if(units[unitWhoEat].hexX === units[j].hexX && units[unitWhoEat].hexY === units[j].hexY && !units[j].move && units[unitWhoEat].side !== units[j].side){
                    fight(unitWhoEat,j)
                    //eatUnit(j)
                    return
                }
            }
            if(units[i].move){
                if(i !== j && units[i].hexX === units[j].hexX && units[i].hexY === units[j].hexY && !units[j].move && units[i].side !== units[j].side){
                    fight(unitWhoEat,j)
                    //eatUnit(j)
                    return
            }
            }
        }
    }
}
var renderBattery = function(){
    for(var i = 0; i < builds.length; i++){
        if(builds[i].type === 'Castle'){
            var t = 600/builds[i].speed
            var countPower = builds[i].speed-Math.ceil(builds[i].cooldownAttack/t)
            var k = t/6
            for(var j = 0; j <= countPower; j++){
                if(j !== countPower){
                    
                    ctx.fillStyle = ctx.fillStyle = 'rgba(29, 176, 0, 0.5)'
                    ctx.fillRect(builds[i].x+16, builds[i].y + 10 - 8*j, 13, 6)
                }else if(builds[i].cooldownAttack % t){
                    ctx.fillStyle = 'rgba(255,142,0,0.5)'
                    ctx.fillRect(builds[i].x+16, (builds[i].y + 10 - 8*j) + (builds[i].cooldownAttack - (builds[i].speed-1 - countPower)*t)/k, 13, 6 - (builds[i].cooldownAttack - (builds[i].speed-1 - countPower)*t)/k)
                }
            }
        }
    }
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
        
        if(arrows[i].type == 'dartArrow'){
            for(var j = 0; j < units.length; j++){
                if(Math.round(arrows[i].x) == Math.round(units[j].x) && Math.round(arrows[i].y) == Math.round(units[j].y)){
                    eatUnit(j)
                    break
                }
            }
        }
        if(arrows[i].toX === Math.round(arrows[i].x) && arrows[i].toY === Math.round(arrows[i].y)){
            if(isEnemyInThisHex(arrows[i].toHexX, arrows[i].toHexY)){
                if(arrows[i].speed > 2){
                    eatUnit(whatIsUnitIndex(arrows[i].toHexX, arrows[i].toHexY))
                }else{
                    fight(null, whatIsUnitIndex(arrows[i].toHexX, arrows[i].toHexY), true)
                }
                
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
var renderBuilds = function(){
    for(var i = 0; i < builds.length; i++){
        if(builds[i].side == 'Blue'){
            if(builds[i].active){
                builds[i].color = '#4671D5'
            }else{
                builds[i].color = '#808080'
            }
            ctx.fillStyle = builds[i].color
            ctx.fillRect(builds[i].x, builds[i].y, 8, 8)
            renderBattery()
        }
    }
    ctx.fillStyle = '#000000'
}
var renderEditButton = function(){
    for(var i = 0; i < 8; i++){
        switch(i){
            case 0:
                ctx.fillStyle = currentEditorColor
                break
            case 1:
                ctx.fillStyle = 'rgba(147, 200, 83, 0)'
                break
            case 2:
                ctx.fillStyle = 'rgb(147, 200, 83)'
                break
            case 3:
                ctx.fillStyle = 'rgb(31, 116, 16)'
                break
            case 4:
                ctx.fillStyle = 'rgb(255, 255, 130)'
                break
            case 5:
                ctx.fillStyle = 'rgb(176, 129, 21)'
                break
            case 6:
                ctx.fillStyle = 'rgb(105, 24, 4)'
                break
            case 7:
                ctx.fillStyle = 'rgb(0, 6, 104)'
                break
            
        }
        ctx.fillRect(1500,20+i*64,64,64)
        
    }
}
var renderUnits = function(){
    for(var i = 0; i < units.length; i++){
        if(units[i].active && units[i].side === "Blue"){
            units[i].color = '#67E300'
        } else if(units[i].side === "Blue"){
            units[i].color = '#190772'
        }else if(units[i].active && units[i].side === "Red"){
            units[i].color = '#A2145F'
        } else if(units[i].side === "Red"){
            units[i].color = '#9F0013'
        }
        ctx.fillStyle = units[i].color
        switch(units[i].direction){
            case 'right':
                ctx.fillRect(units[i].x+10, units[i].y+2, 4, 4)
                break;

            case 'left':
                ctx.fillRect(units[i].x-10, units[i].y+2, 4, 4)
                break;

            case 'down-right':
                ctx.fillRect(units[i].x+7, units[i].y+7+2, 4, 4)
                break;

            case 'down-left':
                ctx.fillRect(units[i].x-7, units[i].y+7+2, 4, 4)
                break;

            case 'up-right':
                ctx.fillRect(units[i].x+7, units[i].y-7+2, 4, 4)
                break;

            case 'up-left':
                ctx.fillRect(units[i].x-7, units[i].y-7+2, 4, 4)
                break;
        }
        ctx.fillRect(units[i].x, units[i].y, 8, 8)
        renderBattery()
    }
    ctx.fillStyle = '#000000'
    
}
var startGame = function(){
    //createArrs()
    

    //createHexArrs()
    createUnitsArr()
    createBuildsArr()
    updateVisible()
    mainLoop()
}
var mainLoop = function(){
    ctx.clearRect(0, 0, width, height)
    
    if(mapEditor){
        renderEditButton()
    }
    drawHex()
    moveAndCheckArrows()
    renderArrows()
    checkCooldown()
    checkCollision()
    moveUnits()
   // renderUnits()
  //  renderBuilds()
    checkFalseHex()
    requestAnimationFrame(mainLoop)
}
