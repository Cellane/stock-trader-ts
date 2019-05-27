import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators"
import stocks from "@/data/stocks"
import { IStock } from "@/interfaces/IStocks"
import store from "@/store/store"

export interface IStocksState {
  stocks: IStock[]
}

@Module({ dynamic: true, store, name: "stocks", namespaced: true })
class StocksModule extends VuexModule implements IStocksState {
  private _stocks: IStock[] = []

  @Mutation
  SET_STOCKS(stocks: IStock[]) {
    this._stocks = stocks
  }

  @Mutation
  private RND_STOCKS() {
    this._stocks.forEach(stock => {
      stock.price = Math.round(stock.price * (Math.random() + 0.5))
    })
  }

  @Action({ commit: "SET_STOCKS" })
  public initStocks(): IStock[] {
    return stocks
  }

  @Action({ commit: "RND_STOCKS" })
  public randomizeStocks() {}

  public get stocks(): IStock[] {
    return this._stocks
  }
}

export const stocksModule = getModule(StocksModule)
