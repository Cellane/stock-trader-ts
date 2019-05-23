<template>
  <div id="app" class="container">
    <Header />
    <div class="row">
      <div class="col-md-12">
        <transition name="slide" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Header from "@/components/Header.vue"
import { stocksModule } from "@/store/modules/stocksModule"

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {
  created() {
    stocksModule.initStocks()
  }
}
</script>

<style>
body {
  padding: 30px;
}

.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
