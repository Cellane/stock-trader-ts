<template>
  <div>
    <PortfolioStock
      v-for="stock in ownedStocks"
      :key="stock.id"
      :stock="stock"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import PortfolioStock from "@/components/PortfolioStock.vue"
import { IPortfolioStock } from "@/interfaces/IStocks"
import { portfolioModule } from "@/store/modules/portfolioModule"

@Component({
  components: { PortfolioStock }
})
export default class Portfolio extends Vue {
  private get ownedStocks(): IPortfolioStock[] {
    return portfolioModule.portfolio
  }
}
</script>
