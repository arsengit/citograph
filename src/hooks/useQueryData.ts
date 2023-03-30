import { useQueryClient } from 'react-query';

/**
 * Get query data from the query client
 * @param TData is the type of the data returned by the query
 * @param name is the name of the query
 */
export const useQueryData = <TData = unknown>(name: string) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<TData>(name);
};
