var cvs = document.getElementById('canvas')
var ctx = cvs.getContext('2d')
var width = 0,
    height = 0
cvs.width = width
cvs.height = height

var container = document.getElementById('container')
var inputName = document.getElementById('inputName')
var inputMap = document.getElementById('inputMap')
var mapType = document.getElementById('mapType')
var createGame = document.getElementById('createGame')
var saveName = document.getElementById('saveName')

var mapType_1x1 = document.getElementById('mapType_1x1')
var mapType_2x2 = document.getElementById('mapType_2x2')
var mapType_3x3 = document.getElementById('mapType_3x3')
var mapType_4x4 = document.getElementById('mapType_4x4')
var mapType_2x2x2 = document.getElementById('mapType_2x2x2')
var mapType_2x2x2x2 = document.getElementById('mapType_2x2x2x2')
var mapType_FFA = document.getElementById('mapType_FFA')
var playersCountArr = []
for(var i = 2; i <= 12; i++){
    playersCountArr.push(document.getElementById('playersCount_' + i))
}
var playersCount = document.getElementById('playersCount')
var blockPlayersCount = document.getElementById('blockPlayersCount')

var mapSize_Duel = document.getElementById('mapSize_Duel' )
var mapSize_VerySmall = document.getElementById('mapSize_VerySmall' )
var mapSize_Small = document.getElementById('mapSize_Small')
var mapSize_Medium = document.getElementById('mapSize_Medium')
var mapSize_Large = document.getElementById('mapSize_Large')
var mapSize_VeryLarge = document.getElementById('mapSize_VeryLarge')

var mapSize = document.getElementById('mapSize')
var mapPlayerCount = document.getElementById('mapPlayerCount')
var table = document.getElementById('table')

var tbody = document.getElementById('tbody')
var connectButton = document.getElementById('connectButton')

var infoAboutGame = {
    id: 0,
    name: inputMap.value,
    currentPlayersCount: 1,
    playersCount: 2,
    gameType: '1x1',
    mapSize: 'Duel',
    host: inputName.value
}
var currentRoomsTable = []
var countGames = 0
var roomsData = []

var selectedRoomId = 0

socket.emit('pageIsLoad')
socket.on('setRoomsData', function(myRoomsData, gamesCount){
    countGames = gamesCount
    
    infoAboutGame.id = countGames
    roomsData = myRoomsData.slice()
    createTable()
    createIdTable()
    createSpectrator()
})


var createIdTable = function(){
    
    currentRoomsTable = []
    for(var i = 0; i < roomsData.length; i++){
        var a = document.getElementById(roomsData[i][0])
        currentRoomsTable.push(a)
    }
}
var getCanICoonnectToThisRoom = function(id){
    for(var i = 0; i < roomsData.length; i++){
        if(roomsData[i][0] == id){
            if(roomsData[i][2] < roomsData[i][3]){
                return true
            }else{
                return false
            }
        }
    }
}
var createSpectrator = function(){

    for(var i = 0; i < currentRoomsTable.length; i++){
        currentRoomsTable[i].onclick = function(e){
            roomId = e.path[1].id
            selectedRoomId = roomId
        }
    }
    
}
/* 
currentRoomsTable[0].onclick = function(){
    console.log('Ты кликнул на меня,')
} */
//Отслеживать нажатия на кнопочки
//Очень много отслеживать(
if(localStorage.getItem('name')){
    inputName.value = localStorage.getItem('name')
}
connectButton.onclick = function(){
    if(getCanICoonnectToThisRoom(selectedRoomId)){
        socket.emit('connectToRoom', selectedRoomId, inputName.value)
        console.log('Типа присоединился')
    }
}
saveName.onclick = function(){
    localStorage.clear()
    localStorage.setItem('name', inputName.value)
}
createGame.onclick = function(){
    infoAboutGame.host = inputName.value
    infoAboutGame.name = inputMap.value
    makeGame()
}
mapType_1x1.onclick = function(){
    showMapSize()
    mapType.innerHTML = '1x1'
    infoAboutGame.gameType = '1x1'
    blockPlayersCount.className = 'row d-none'
    infoAboutGame.playersCount = 2
}
mapType_2x2.onclick = function(){
    showMapSize('Duel')
    mapType.innerHTML = '2x2'
    infoAboutGame.gameType = '2x2'
    blockPlayersCount.className = 'row d-none'
    infoAboutGame.playersCount = 4
}
mapType_3x3.onclick = function(){
    showMapSize('Very Small')
    mapType.innerHTML = '3x3'
    infoAboutGame.gameType = '3x3'
    blockPlayersCount.className = 'row d-none'
    infoAboutGame.playersCount = 6
}
mapType_4x4.onclick = function(){
    showMapSize('Small')
    mapType.innerHTML = '4x4'
    infoAboutGame.gameType = '4x4'
    blockPlayersCount.className = 'row d-none'
    infoAboutGame.playersCount = 8
}
mapType_2x2x2.onclick = function(){
    showMapSize('Very Small')
    mapType.innerHTML = '2x2x2'
    infoAboutGame.gameType = '2x2x2'
    blockPlayersCount.className = 'row d-none'
    infoAboutGame.playersCount = 6
}
mapType_2x2x2x2.onclick = function(){
    showMapSize('Small')
    mapType.innerHTML = '2x2x2x2'
    infoAboutGame.gameType = '2x2x2x2'
    blockPlayersCount.className = 'row d-none'
    infoAboutGame.playersCount = 8
}
mapType_FFA.onclick = function(){
    showMapSize('All')
    mapType.innerHTML = 'FFA'
    infoAboutGame.gameType = 'FFA'
    blockPlayersCount.className = 'row block'
}

mapSize_Duel.onclick = function(){
    mapSize.innerHTML = 'Duel'
    infoAboutGame.mapSize = 'Duel'
    showPlayersCount(2)
}
mapSize_VerySmall.onclick = function(){
    mapSize.innerHTML = 'VerySmall'
    infoAboutGame.mapSize = 'VerySmall'
    showPlayersCount(4)
}
mapSize_Small.onclick = function(){
    mapSize.innerHTML = 'Small'
    infoAboutGame.mapSize = 'Small'
    showPlayersCount(6)
}
mapSize_Medium.onclick = function(){
    mapSize.innerHTML = 'Medium'
    infoAboutGame.mapSize = 'Medium'
    showPlayersCount(8)
}
mapSize_Large.onclick = function(){
    mapSize.innerHTML = 'Large'
    infoAboutGame.mapSize = 'Large'
    showPlayersCount(10)
}
mapSize_VeryLarge.onclick = function(){
    mapSize.innerHTML = 'VeryLarge'
    infoAboutGame.mapSize = 'VeryLarge'
    showPlayersCount(12)
}
var showMapSize = function(mapSizeName){
    mapSize_Duel.className = 'dropdown-item d-block'
    mapSize_VerySmall.className = 'dropdown-item d-block'
    mapSize_Small.className = 'dropdown-item d-block'
    mapSize_Medium.className = 'dropdown-item d-block'
    mapSize_Large.className = 'dropdown-item d-block'
    mapSize_VeryLarge.className = 'dropdown-item d-block'

    switch(mapSizeName){

        case 'Duel':
            mapSize.innerHTML = 'Very Small'
            infoAboutGame.mapSize = 'Very Small'
            mapSize_Duel.className = 'dropdown-item d-none'
            break
        case 'Very Small':
            
            mapSize.innerHTML = 'Small'
            infoAboutGame.mapSize = 'Small'
            mapSize_Duel.className = 'dropdown-item d-none'
            mapSize_VerySmall.className = 'dropdown-item d-none'
            break
        case 'Small':
            
            mapSize.innerHTML = 'Medium'
            infoAboutGame.mapSize = 'Medium'
            mapSize_Duel.className = 'dropdown-item d-none'
            mapSize_VerySmall.className = 'dropdown-item d-none'
            mapSize_Small.className = 'dropdown-item d-none'
            break
        case 'Medium':
            
            mapSize.innerHTML = 'Large'
            infoAboutGame.mapSize = 'Large'
            mapSize_Duel.className = 'dropdown-item d-none'
            mapSize_VerySmall.className = 'dropdown-item d-none'
            mapSize_Small.className = 'dropdown-item d-none'
            mapSize_Medium.className = 'dropdown-item d-none'
            break
        case 'Large':
            
            mapSize.innerHTML = 'Very Large'
            infoAboutGame.mapSize = 'Very Large'
            mapSize_Duel.className = 'dropdown-item d-none'
            mapSize_VerySmall.className = 'dropdown-item d-none'
            mapSize_Small.className = 'dropdown-item d-none'
            mapSize_Medium.className = 'dropdown-item d-none'
            mapSize_Large.className = 'dropdown-item d-none'
            break
        default:
            break;
        
    }
}
playersCountArr[0].onclick = function(){
    infoAboutGame.playersCount = 2
    playersCount.innerHTML = '2'
}
playersCountArr[1].onclick = function(){
    infoAboutGame.playersCount = 3
    playersCount.innerHTML = '3'
}
playersCountArr[2].onclick = function(){
    infoAboutGame.playersCount = 4
    playersCount.innerHTML = '4'
}
playersCountArr[3].onclick = function(){
    infoAboutGame.playersCount = 5
    playersCount.innerHTML = '5'
}
playersCountArr[4].onclick = function(){
    infoAboutGame.playersCount = 6
    playersCount.innerHTML = '6'
}
playersCountArr[5].onclick = function(){
    infoAboutGame.playersCount = 7
    playersCount.innerHTML = '7'
}
playersCountArr[6].onclick = function(){
    infoAboutGame.playersCount = 8
    playersCount.innerHTML = '8'
}
playersCountArr[7].onclick = function(){
    infoAboutGame.playersCount = 9
    playersCount.innerHTML = '9'
}
playersCountArr[8].onclick = function(){
    infoAboutGame.playersCount = 10
    playersCount.innerHTML = '10'
}
playersCountArr[9].onclick = function(){
    infoAboutGame.playersCount = 11
    playersCount.innerHTML = '11'
}
playersCountArr[10].onclick = function(){
    infoAboutGame.playersCount = 12
    playersCount.innerHTML = '12'
}


var showPlayersCount = function(maxPlayersCount){
    for(var i = 0; i < 10; i++){
        playersCountArr[i].className = 'dropdown-item d-none'
    }
    for(var i = 0; i < maxPlayersCount-2; i++){
        playersCountArr[i].className = 'dropdown-item d-block'
    }
}


var createTable = function(){
    tbody.innerHTML = ''
    for(var i = 0; i < roomsData.length; i++){
        var tr = document.createElement('tr')
        tr.id = roomsData[i][0]
        for(var j = 1; j < 7; j++){
            var td = document.createElement('td')
            if(j === 2){
                td.innerHTML = roomsData[i][j] + '/' + roomsData[i][j+1]
                j++
            }else{
                td.innerHTML = roomsData[i][j]
            }
            tr.append(td)
        }
        tbody.append(tr)
    }
}

var makeGame = function(){
    
    if(infoAboutGame.name.length > 16){
        infoAboutGame.name = infoAboutGame.name.slice(0, 16)
    }
    if(infoAboutGame.host.length > 16){
        infoAboutGame.host = infoAboutGame.host.slice(0, 16)
    }
    
    console.log('Типа создал страницу')
    infoAboutGame = Object.values(infoAboutGame)
    socket.emit('createRoom', infoAboutGame)
}
