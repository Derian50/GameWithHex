var cvs = document.getElementById('canvas')
var ctx = cvs.getContext("2d")
var width = 1280,
    height = 720
cvs.width = width
cvs.height = height

var emptyHex = new Image()
emptyHex.src = 'assets/emptyHex.png'
emptyHex.onload = function(){
    drawHex()
}


var typeHex = []

var activeHexX, activeHexY
var createHexArr = function(){
    for(var i = 0; i < 40; i++){
        typeHex[i] = []
        for(var j = 0; j < 16; j++){
            if((i%2) === (j%2)){ //чёт-чёту, нечёт-нечёту
                typeHex[i][j] = 0
            }else{
                typeHex[i][j] = -1
            }
        }
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
var whatHexIsClicked2 = function(x, y){
    if((x + y) % 2 === 1) x--
    if(activeHexX === x && activeHexY === y){
        ctx.clearRect(0,0,width,height)
        drawHex()
        activeHexX = -1
        activeHexY = -1
        return
    }else{
        checkDist(activeHexX, activeHexY, x, y)
    }
    activeHexX = x
    activeHexY = y
    ctx.clearRect(0,0,width,height)
    ctx.fillRect(32*activeHexX+32, 48*activeHexY+32, 8, 8)
    drawHex()
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
var checkDist = function(activeHexX, activeHexY, toHexX, toHexY){
    var q = 0
    if(activeHexY === toHexY){
        q = Math.abs(activeHexX - toHexX)
    }else if(activeHexX === toHexX){
        q = Math.abs(activeHexY - toHexY)*2
    }else{
        q = Math.abs(activeHexX - toHexX) + Math.abs(activeHexY - toHexY)
    }
    
    console.log(q)
    if(q === 2){
        console.log('dist: 1')
    }else if(q === 4){
        console.log('dist: 2')
    }else if(q === 6){
        console.log('dist: 3')
    }else if(q === 8){
        console.log('dist: 4')
    }
    if(q !== 0){
        moveUnit(activeHexX, activeHexY, toHexX, toHexY, q, 2)
    }
}
var moveUnit = function(hexX, hexY, toHexX, toHexY, dist, speed){
  /*   console.log('move')
    x = 0
    y = 0
    toX = 0
    toY = 0
    if(hexY % 2){
        x += 16
    }
    if(toHexY % 2){
        toX += 16
    }
    y += hexY*48
    x += hexX*64
    toY += toHexY*48
    toX += toHexX*64
    oneStepX = (toX - x) / (60*speed)
    oneStepY = (toY - y) / (60*speed)
    moveStep(hexX, hexY, toHexX, toHexY, dist, speed)
     */

}
createHexArr()
var count = 0
/* var moveStep = function(x,y,oneStepX, oneStepY, dist, speed){
    count++
    if(count <= dist*60){
    setTimeout(function r(){
        x+=oneStepX
        y+=oneStepY
        ctx.fillRect(x, y, 8, 8)
        moveStep(x,y,oneStepX, oneStepY, dist, speed)
    }, 1000/60)     
    }
} */