var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
var path = require('path')
// Отслеживание порта
server.listen(3000)
var countGames = 0
// Отслеживание url адреса и отображение нужной HTML страницы
app.get('/', function(request, respons) {	
	app.use(express.static(path.join(__dirname, '/public')))
	respons.sendFile(__dirname + '/index.html')
})

// Массив со всеми подключениями
connections = []
// Массив со всеми комнатами, которые еще не запустились (внутри айдишники участников)
roomsId = []
// Массив со всеми играми, которые уже идут (внутри айдишники участников)
gamesId = []
// Массив с информацией о всех объектах
gamesData = []
// Массив с инфой о комнатах
//[Название, Кол-во игроков, макс кол-во игроков, тип игры, карта, дата создания, хост]
roomsData = [] 
roomsDataAboutPlayers = []
roomsDataAboutSockets = []
// Функция, которая сработает при подключении к странице
// Считается как новый пользователь
io.sockets.on('connection', function(socket) {
	
	console.log("Успешное соединение")
	console.log(countGames)
	// Добавление нового соединения в массив
	connections.push(socket)
	socket.emit('loadPage', 'title')
	socket.on('pageIsLoad', function(){
		socket.emit('setRoomsData', roomsData, countGames)
	})
	socket.on('connectToRoom', function(roomId, name){
		for(var i = 0; i < roomsData.length; i++){
			if(roomId == roomsData[i][0]){
				roomsData[i][2]++
				roomsDataAboutPlayers[i].push(name)
				roomsDataAboutSockets[i].push(socket)	
				io.sockets.emit('setRoomsData', roomsData, countGames)
			}
		}
		console.log('Присоединился тип')
		console.log(roomsData)
		console.log(roomsDataAboutPlayers)
		console.log(roomsDataAboutSockets)
	})
	socket.on('createRoom', function(data){
		countGames++
		roomsData.push(data)
		roomsDataAboutPlayers.push([data[0], data[6]])
		roomsDataAboutSockets.push([data[0], socket]) //data[0] - это айдишник комнаты
		io.sockets.emit('setRoomsData', roomsData, countGames)
	})
	// Функция, которая срабатывает при отключении от сервера
	socket.on('disconnect', function(data) {
		// Удаления пользователя из массива
		connections.splice(connections.indexOf(socket), 1)
		console.log("Отключились")
	})
})