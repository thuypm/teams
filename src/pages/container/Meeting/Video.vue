<template>
     <div class="row flex-row">
      <div class="you vid">
        <div v-if="!camera">
          <img :src="API_HOST+'user/'+username+'.jpg'" class="usr_img rounded-circle" />
          <p style="padding-top: 15px; margin:0">{{username}}</p>
        </div>
        <video class="rounded" v-else id="video" :srcObject.prop="videoUser" muted autoplay></video>
      </div>
     </div>
</template>
<script>
export default {
    
}
</script>