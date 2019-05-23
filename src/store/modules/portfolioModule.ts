import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators"
import store from "@/store/store"
import { stocksModule } from "@/store/modules/stocksModule"
import { IOrder } from "@/interfaces/IOrders"
import { IOwnedStock, IPortfolioStock } from "@/interfaces/IStocks"

export interface IPortfolioState {
  funds: number
  portfolio: IPortfolioStock[]
}

@Module({ dynamic: true, store, name: "portfolio", namespaced: true })
class PortfolioModule extends VuexModule implements IPortfolioState {
  private _funds: number = 10000
  private _stocks: IOwnedStock[] = []

  @Mutation
  private BUY_STOCK(order: IOrder) {
    const { stockId, quantity, stockPrice } = order
    const record = this._stocks.find(element => element.id === stockId)

    if (record) {
      record.quantity += quantity
    } else {
      this._stocks.push({
        id: stockId,
        quantity
      })
    }

    this._funds -= quantity * stockPrice
  }

  @Mutation
  private SELL_STOCK(order: IOrder) {
    const { stockId, quantity, stockPrice } = order
    const record = this._stocks.find(Element => Element.id === stockId)!

    if (record.quantity > quantity) {
      record.quantity -= quantity
    } else {
      this._stocks.splice(this._stocks.indexOf(record), 1)
    }

    this._funds += quantity * stockPrice
  }

  @Action({ commit: "BUY_STOCK" })
  public buyStock(order: IOrder): IOrder {
    return order
  }

  @Action({ commit: "SELL_STOCK" })
  public sellStock(order: IOrder): IOrder {
    return order
  }

  public get funds(): number {
    return this._funds
  }

  public get portfolio(): IPortfolioStock[] {
    return this._stocks.map(stock => {
      const record = stocksModule.stocks.find(
        element => element.id === stock.id
      )!

      return {
        id: stock.id,
        quantity: stock.quantity,
        name: record.name,
        price: record.price
      }
    })
  }
}

export const portfolioModule = getModule(PortfolioModule)
