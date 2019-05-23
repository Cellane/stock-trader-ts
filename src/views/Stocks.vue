<template>
  <div>
    <StocksStock v-for="stock in stocks" :key="stock.id" :stock="stock" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import StocksStock from "@/components/StocksStock.vue"
import { IStock } from "@/interfaces/IStocks"
import { stocksModule } from "@/store/modules/stocksModule"

@Component({
  components: { StocksStock }
})
export default class Stocks extends Vue {
  private get stocks(): IStock[] {
    return stocksModule.stocks
  }
}
</script>
