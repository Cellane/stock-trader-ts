<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>(Price: {{ stock.price }})</small>
        </h3>
      </div>

      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            class="form-control"
            :class="{ danger: insufficientFunds }"
            placeholder="Quantity"
            v-model.number="quantity"
          />
        </div>
        <div class="pull-right">
          <button
            class="btn btn-success"
            :disabled="buyDisabled"
            @click="buyStock"
          >
            {{ insufficientFunds ? "Too much" : "Buy" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { IStock } from "@/interfaces/IStocks"
import { portfolioModule } from "@/store/modules/portfolioModule"

@Component
export default class StocksStock extends Vue {
  @Prop({ required: true })
  private stock!: IStock

  private quantity: number = 0

  private buyStock() {
    const order = {
      stockId: this.stock.id,
      quantity: this.quantity,
      stockPrice: this.stock.price
    }

    portfolioModule.buyStock(order)
    this.quantity = 0
  }

  private get funds(): number {
    return portfolioModule.funds
  }

  private get insufficientFunds(): boolean {
    return this.quantity * this.stock.price > this.funds
  }

  private get buyDisabled(): boolean {
    return (
      this.insufficientFunds ||
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
