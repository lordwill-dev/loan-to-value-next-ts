import { GraphQLClient } from 'graphql-request';
import { CalculatorProps } from '@/types';

const calculatorRequest = async ({ query, endpoint }: CalculatorProps): Promise<any> => {
  const client = new GraphQLClient(endpoint || process.env.NEXT_PUBLIC_LTV_API_URL);
  return client.request(query);
};

export default calculatorRequest;
