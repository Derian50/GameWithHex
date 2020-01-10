var socket = io.connect();
roomsData = []


socket.on('setRoomsData', function(myRoomsData){
    roomsData = myRoomsData.slice()
})
socket.on('loadPage', function(pageName){
    console.log(pageName)
    include('/js/' + pageName + '.js')
})

function include(url) {
    
    console.log(url)
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    //loop()
}
/* function loop(){
    console.log('Loseeser')
    requestAnimationFrame(loop)
} */