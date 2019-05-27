export interface IOwnedStock {
  id: number
  quantity: number
}

export interface IStock {
  id: number
  name: string
  price: number
}

export interface IPortfolioStock extends IStock {
  quantity: number
}

export interface IPortfolio {
  stocks: IPortfolioStock[]
  funds: number
}

export interface IRemoteData {
  funds: number
  stockPortfolio: IPortfolioStock[]
  stocks: IStock[]
}
