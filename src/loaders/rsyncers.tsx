import { QueryClient } from "@tanstack/react-query";
import { components } from "schema/main";
import { client } from "utils/api/client";
import { Params } from "react-router-dom";
import { parseDate} from "utils/generic"

const getRsyncerData = async (sessionId: string) => {
  
  const response = await client.get(`sessions/${sessionId}/rsyncers`);

  if (response.status !== 200) {
    return null;
  }
  
  return response.data;
};

const queryBuilder = (sessionId: string = "0") => {
    return {
        queryKey: ["sessionId", sessionId],
        queryFn: () => getRsyncerData(sessionId),
        staleTime: 60000,
    };
    };

export const rsyncerLoader =
    (queryClient: QueryClient) => async (params: Params) => {
        const singleQuery = queryBuilder(params.sessionId);
        return ((await queryClient.getQueryData(singleQuery.queryKey)) ?? (await queryClient.fetchQuery(singleQuery)));
    };

