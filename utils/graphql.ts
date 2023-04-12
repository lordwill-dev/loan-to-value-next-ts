/* eslint-disable import/prefer-default-export */
import { GraphQLClient } from 'graphql-request';
import { CalculatorProps } from '@/types';

export const calculatorRequest = async ({ query, endpoint }: CalculatorProps): Promise<any> => {
  const client = new GraphQLClient(endpoint || process.env.NEXT_PUBLIC_LTV_API_URL);
  return client.request(query);
};
