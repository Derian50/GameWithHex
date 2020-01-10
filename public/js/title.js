var cvs = document.getElementById('canvas')
var ctx = cvs.getContext("2d")
var width = 1280,
    height = 640
cvs.width = width
cvs.height = height
console.log(roomsData)




var renderButton = function(){
    ctx.strokeRect(895, 520, 360, 80)
    ctx.font = 'normal 48px Comic Sans MS'
    ctx.fillText('Подключиться', 900, 580)
}
var renderCarcass = function(){
    ctx.strokeRect(450, 40, 820, 450)
    ctx.strokeRect(450, 90, 820, 0)
    ctx.strokeRect(700, 40, 0, 450)
    ctx.strokeRect(800, 40, 0, 450)
    ctx.strokeRect(900, 40, 0, 450)
    ctx.strokeRect(1050, 40, 0, 450)
    ctx.strokeRect(1150, 40, 0, 450)
    for(var i = 0; i < roomsData.length; i++){
        ctx.strokeRect(450, 140+50*i, 820, 0)
    }}
var renderText = function(){
    ctx.font = 'normal 24px Comic Sans MS'
    ctx.fillText('Название', 500, 70)
    ctx.fillText('Игроки', 704, 70)
    ctx.fillText('Тип', 830, 70)
    ctx.fillText('Карта', 940, 70)
    ctx.fillText('Время', 1065, 70)
    ctx.fillText('Хост', 1175, 70)
    for(var i = 0; i < roomsData.length; i++){
        ctx.fillText(roomsData[i][0], 460, 120+50*i, 240)
        ctx.fillText(roomsData[i][1] + '/' + roomsData[i][2], 720, 120+50*i, 121)
        ctx.fillText(roomsData[i][3], 830, 120+50*i, 105)
        ctx.fillText(roomsData[i][4], 940, 120+50*i, 70)
        ctx.fillText(roomsData[i][5], 1065, 120+50*i), 105
        ctx.fillText(roomsData[i][6], 1175, 120+50*i, 75)
    }
}
var render = function(){
    renderCarcass()
    renderText()
    renderButton()
}
var mainLoop = function(){
    render()
    requestAnimationFrame(mainLoop)
}
mainLoop()