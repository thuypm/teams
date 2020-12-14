<template>
<div class="vid">
  <div>
    <img
      :src="API_HOST + 'user/' + usr.username + '.jpg'"
      class="usr_img rounded-circle"
    />
    <p style="padding-top: 15px; margin: 0">{{ usr.username }}</p>
  </div>
  </div>
</template>
<script>
export default {
    props:[""],
}
</script>