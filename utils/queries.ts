import { LoanToValue } from '@/types';

export const LOAN_TO_VALUE = ({ depositValue, purchasePrice }: LoanToValue) => `{
    loanToValueCalc(depositValue: ${depositValue}, purchasePrice: ${purchasePrice}) {
      result
    }
  }`;

export const OTHERS = '';
