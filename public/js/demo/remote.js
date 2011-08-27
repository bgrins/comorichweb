$(function(){
   var socket = io.connect();
   socket.emit('remote-identify', { id: $('body').data('id') });

   $('a').click(function(){
    socket.emit(this.id); 
    return false;
   });
});
