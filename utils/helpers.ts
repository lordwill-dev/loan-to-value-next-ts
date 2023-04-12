import { PercentParams } from '@/types/';

export const calculatePercentageValue = ({ baseValue, percent }: PercentParams) => (baseValue * percent) / 100;
