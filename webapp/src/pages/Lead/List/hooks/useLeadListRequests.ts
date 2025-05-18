import { useMemo, useState } from "react";
import { LeadApi } from "../../../../api/LeadApi";
import { useQuery } from "react-query";
import type { ILeadViewModel } from "../../../../types/lead.types";
import type { LeadListRequest } from "../utils/leadList.types";
import type { AxiosError } from "axios";
import type { PageableResult } from "../../../../types/base.types";

const useLeadListRequests = () => {
  const leadApi = useMemo(() => new LeadApi(), []);
  const [leadItems, setLeadItems] = useState<ILeadViewModel[]>([]);
  const [pageableResult, setPageableResult] = useState<PageableResult>();
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [filter, setFilter] = useState<LeadListRequest>({
    page: 0,
    size: 5,
    //sort: ["name"]
  });

  const leadsRequest = useQuery(
    [leadApi.pageableListQueryKey, { filter }],
    async () =>
      await leadApi.pageableList<LeadListRequest, ILeadViewModel>(filter),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setPageableResult(response.data.pageable);
        setTotalElements(response.data.totalElements);
        setTotalPages(response.data.totalPages);
        setLeadItems(response.data.content);
      },
    }
  );

  const leadsData = {
    error: leadsRequest.error as AxiosError,
    isError: leadsRequest.isError,
    isLoading: leadsRequest.isLoading || leadsRequest.isFetching,
    items: leadItems ?? []
  };

  return {
    requests: {
      pageableResult,
      totalElements,
      totalPages,
      items: leadsData.items,
    },
  };
};

export default useLeadListRequests;
