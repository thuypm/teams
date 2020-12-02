
<template>
 <div>
     <video :srcObject.prop="video" autoplay></video>
 </div>
</template>
<script>
import io from 'socket.io-client';
var socket = io.connect(process.env.API_HOST);
export default {
     name: "index",
     data() {
    return {
    video: Object
    };
     },
     created()
     {
         console.log('creat');
         socket.emit('join', 'thuypm', '5e9b0099bbaa8511c445bfd6');

         socket.on('video', (stream)=>{
             console.log(stream);
             this.video = stream;
             
         })
     }

}
</script>
<style  scoped>

</style>