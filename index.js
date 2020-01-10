var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
var path = require('path')
// Отслеживание порта
server.listen(3000)

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
roomsData = [['Derian', 1, 2, '1x1', 'small', '21:22', 'Derian'],['012345678901234', 1, 2, '1x1', 'normal', '21:22', 'SergeyZ'],['НУБЫ СЮДА', 4, 12, 'ffa', 'large', '21:10', 'kot_1111'] ] //[Название, Кол-во игроков, макс кол-во игроков, тип игры, карта, дата создания, хост]

// Функция, которая сработает при подключении к странице
// Считается как новый пользователь
io.sockets.on('connection', function(socket) {
	console.log("Успешное соединение")
	// Добавление нового соединения в массив
	connections.push(socket)
	socket.emit('loadPage', 'title')
	socket.emit('setRoomsData', roomsData)
	
	// Функция, которая срабатывает при отключении от сервера
	socket.on('disconnect', function(data) {
		// Удаления пользователя из массива
		connections.splice(connections.indexOf(socket), 1)
		console.log("Отключились")
	})
})