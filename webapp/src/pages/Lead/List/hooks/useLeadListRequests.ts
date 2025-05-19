import { useEffect, useMemo, useState } from "react";
import { LeadApi } from "../../../../api/LeadApi";
import { useQuery } from "react-query";
import type { ILeadViewModel } from "../../../../types/lead.types";
import type { AxiosError } from "axios";
import type {
  PageableRequest,
  PageableResult,
} from "../../../../types/base.types";

const useLeadListRequests = () => {
  const leadApi = useMemo(() => new LeadApi(), []);
  const [leadItems, setLeadItems] = useState<ILeadViewModel[]>([]);
  const [pageableResult, setPageableResult] = useState<PageableResult>();
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [first, setFirst] = useState<number>(0);

  const [filter, setFilter] = useState<PageableRequest>({
    page: page,
    size: pageSize,
  });

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      page: page,
      size: pageSize,
    }));
  }, [page, pageSize]);

  const leadsRequest = useQuery(
    [leadApi.pageableListQueryKey, { filter }],
    async () =>
      await leadApi.pageableList<PageableRequest, ILeadViewModel>(filter),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        console.log(response);
        setPageableResult(response.data.pageable);
        setPageSize(response.data.size);
        setTotalElements(response.data.totalElements);
        setTotalPages(response.data.totalPages);
        setLeadItems(response.data.content);
      },
    }
  );

  const handleFilterClear = () => {
    setFilter((prev) => ({ ...prev, page: 0, filter: "" }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (filter: any) => {
    setFilter((prev) => ({ ...prev, page: 0, filter: filter.target.value }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNextPageItems = (page: any) => {
    setFirst(page.first);
    setPage(page.page);
    setPageSize(page.rows);
  };

  const leadsData = {
    error: leadsRequest.error as AxiosError,
    isError: leadsRequest.isError,
    isLoading: leadsRequest.isLoading || leadsRequest.isFetching,
    items: leadItems ?? [],
  };

  return {
    requests: {
      isLoading: leadsData.isLoading,
      pageableResult,
      totalElements,
      totalPages,
      pageSize,
      items: leadsData.items,
      first,
      filter: filter.filter,
      handleNextPageItems,
      handleFilterChange,
      handleFilterClear,
    },
  };
};

export default useLeadListRequests;
