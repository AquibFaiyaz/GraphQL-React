import { useState } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
}

type MutationTuples<TData, TVariables> = [
  (variables?: TVariables | undefined) => Promise<void>,
  State<TData>
];

export const useMutation = <TData = any, TVariables = any>(
  query: string
): MutationTuples<TData, TVariables> => {
  const [state, setState] = useState<State<TData>>({
    data: null,
  });

  const fetchDel = async (variables?: TVariables) => {
    try {
      const { data } = await server.fetch<TData, TVariables>({
        query,
        variables,
      });
      setState({ data });
    } catch (error) {
      setState({ data: null });
    }
  };
  return [fetchDel, state];
};
