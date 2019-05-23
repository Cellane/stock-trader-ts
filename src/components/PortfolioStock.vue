<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>
            (Price: {{ stock.price }} | Quantity: {{ stock.quantity }})
          </small>
        </h3>
      </div>

      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            class="form-control"
            :class="{ danger: insufficientQuantity }"
            placeholder="Quantity"
            v-model.number="quantity"
          />
        </div>
        <div class="pull-right">
          <button
            class="btn btn-info"
            :disabled="sellDisabled"
            @click="sellStock"
          >
            {{ insufficientQuantity ? "Too much" : "Sell" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { IPortfolioStock } from "@/interfaces/IStocks"
import { portfolioModule } from "@/store/modules/portfolioModule"

@Component
export default class StocksStock extends Vue {
  @Prop({ required: true })
  private stock!: IPortfolioStock

  private quantity: number = 0

  private sellStock() {
    const order = {
      stockId: this.stock.id,
      quantity: this.quantity,
      stockPrice: this.stock.price
    }

    portfolioModule.sellStock(order)
    this.quantity = 0
  }

  private get insufficientQuantity(): boolean {
    return this.quantity > this.stock.quantity
  }

  private get sellDisabled(): boolean {
    return (
      this.insufficientQuantity ||
      this.quantity <= 0 ||
      !Number.isInteger(this.quantity)
    )
  }
}
</script>

<style scoped>
.danger {
  border: 1px solid red;
}
</style>
