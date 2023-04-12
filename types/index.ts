export type LoanToValue = {
  depositValue: number;
  purchasePrice: number;
}

export type CalculatorProps = {
  query: string;
  endpoint?: string;
}

export type PercentParams = {
  baseValue: number;
  percent: number
}
