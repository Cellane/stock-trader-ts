<template>
  <div>
    <h1>Trade or view your portfolio</h1>
    <p>You may save & load your data</p>
    <p>Click on “End day” to begin a new day!</p>
    <hr />
    <p>Your funds: {{ funds | currency }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { portfolioModule } from "@/store/modules/portfolioModule"

@Component
export default class Home extends Vue {
  private get funds(): number {
    return portfolioModule.funds
  }
}
</script>
