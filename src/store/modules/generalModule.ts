import { Vue } from "vue-property-decorator"
import { Action, getModule, Module, VuexModule } from "vuex-module-decorators"
import { IRemoteData } from "@/interfaces/IStocks"
import store from "@/store/store"
import { stocksModule } from "@/store/modules/stocksModule"
import { portfolioModule } from "@/store/modules/portfolioModule"

@Module({ dynamic: true, store, name: "general", namespaced: true })
class GeneralModule extends VuexModule {
  @Action
  async loadData() {
    // @ts-ignore
    const response = await Vue.http.get("data.json")
    const data: IRemoteData = await response.json()

    if (data) {
      const { stocks, funds, stockPortfolio } = data
      const portfolio = { stocks: stockPortfolio, funds }

      stocksModule.SET_STOCKS(stocks)
      portfolioModule.SET_PORTFOLIO(portfolio)
    }
  }
}

export const generalModule = getModule(GeneralModule)
