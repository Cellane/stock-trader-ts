<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Stock Trader</router-link>
      </div>

      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link to="/portfolio" active-class="active" tag="li">
            <a>Portfolio</a>
          </router-link>
          <router-link to="/stocks" active-class="active" tag="li">
            <a>Stocks</a>
          </router-link>
        </ul>
        <strong class="navbar-text navbar-right"
          >Funds: {{ funds | currency }}</strong
        >
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#" @click="endDay">End day</a></li>
          <li
            class="dropdown"
            :class="{ open: isDropdownOpen }"
            @click="isDropdownOpen = !isDropdownOpen"
          >
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Save / load <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a href="#" @click="saveData">Save data</a></li>
              <li><a href="#" @click="loadData">Load data</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { IRemoteData } from "@/interfaces/IStocks"
import { portfolioModule } from "@/store/modules/portfolioModule"
import { stocksModule } from "@/store/modules/stocksModule"
import { generalModule } from "@/store/modules/generalModule"

@Component
export default class Header extends Vue {
  private isDropdownOpen: boolean = false

  private endDay() {
    stocksModule.randomizeStocks()
  }

  private async saveData() {
    const data: IRemoteData = {
      funds: portfolioModule.funds,
      stockPortfolio: portfolioModule.portfolio,
      stocks: stocksModule.stocks
    }

    await this.$http.put("data.json", data)
  }

  private async loadData() {
    await generalModule.loadData()
  }

  private get funds(): number {
    return portfolioModule.funds
  }
}
</script>
