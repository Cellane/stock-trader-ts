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
