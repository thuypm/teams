<template>
     <div id="menuCall" style="z-index: 2">
        <span class="btn btn-success">30:20</span>
        <button
          v-on:click="setVideo(!camera, micro)"
          type="button"
          class="btn mn btn-outline-dark"
        >
          <i
            :class="{ 'fa-video': camera, 'fa-video-slash': !camera }"
            class="fa fa-lg"
          ></i>
        </button>
        <button
          v-on:click="setVideo(camera, !micro)"
          type="button"
          class="btn mn btn-outline-dark"
        >
          <i
            :class="{ 'fa-microphone': micro, 'fa-microphone-slash': !micro }"
            class="fa fa-lg"
          ></i>
        </button>
        <button
          @click="shareScreen"
          :disabled="!canShareScreen"
          type="button"
          class="btn mn btn-outline-dark"
        >
          <i class="fas fa-desktop fa-lg"></i>
        </button>
        <button
          v-on:click="changeOpt(1)"
          type="button"
          :class="{ 'btn-outline-dark': !chatOpt, 'btn-dark': chatOpt }"
          class="btn mn"
        >
          <i class="fas fa-comments fa-lg"></i>
        </button>
        <button
          v-on:click="changeOpt(2)"
          type="button"
          :class="{ 'btn-outline-dark': !listOpt, 'btn-dark': listOpt }"
          class="btn mn"
        >
          <i class="fa fa-user fa-lg"></i>
        </button>
        <button
          onclick="location.href = '/';"
          type="button"
          class="btn mn btn-danger"
        >
          <i class="fa fa-phone fa-lg"></i>
        </button>
      </div>
</template>