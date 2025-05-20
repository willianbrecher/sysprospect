import { useMemo, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { LeadApi } from "../../../../api/LeadApi";
import {
  HowKnowAbout,
  type ILeadViewModel,
} from "../../../../types/lead.types";
import type { IFormProps } from "../../../../types/form.types";
import type { ILeadForm } from "../utils/leadForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getLeadSchema } from "../utils/leadForm.schema";
import type { ControlledDropdownOptionItem } from "../../../../components/ControlledDropdown/controlledDropdown.types";
import type { Toast } from "primereact/toast";

const useLeadFormRequests = (props: IFormProps) => {
  const { type } = props;
  const leadApi = useMemo(() => new LeadApi(), []);
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const toast = useRef<Toast>(null);

  const defaultValues = {
    name: "",
    phone: "",
    email: "",
    knowAbout: HowKnowAbout.OTHER,
    amount: 1,
    createdAt: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(getLeadSchema()) as any,
  });

  const handleSubmit = methods.handleSubmit((form) => {
    console.info(form);
    if (type === "edit") {
      updateLeadMutation.mutate(form as ILeadForm);
    }
  });

  const handleClose = () => {
    navigate("/Leads");
  };

  const leadQuery = useQuery({
    queryKey: [leadApi.getByIdQueryKey],
    queryFn: async () => await leadApi.getById<ILeadViewModel>(id),
    onSuccess: (response) => handleQuerySuccess(response.data),
    onError: () => handleQueryError(),
    refetchOnWindowFocus: false,
  });

  const updateLeadMutation = useMutation({
    mutationFn: async (form: ILeadForm) => {
      return await leadApi.update(form, id);
    },
    onSuccess: () => handleMutationSuccess(),
    onError: () => handleMutationError(),
  });

  const isLoading = leadQuery.isLoading || updateLeadMutation.isLoading;

  const handleQuerySuccess = (data: ILeadViewModel) => {
    methods.reset(data);
  };

  const handleQueryError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Lead",
      detail: "An error occurred while loading the lead!",
      life: 10000,
    });
  };

  const handleMutationSuccess = () => {
    queryClient.invalidateQueries(leadApi.pageableListQueryKey).then();

    toast.current?.show({
      severity: "success",
      summary: "Lead",
      detail: "Lead updated with success!",
      life: 10000,
    });
    handleClose();
  };

  const handleMutationError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Lead",
      detail: "An error occurred while lead update!",
      life: 10000,
    });
    handleClose();
  };

  const knowAboutOptions: ControlledDropdownOptionItem[] = [
    { label: "Internet", value: "INTERNET" },
    { label: "Event", value: "EVENT" },
    { label: "Referred", value: "REFERRED" },
    { label: "Other", value: "OTHER" },
  ];

  return {
    form: {
      methods: methods,
      isLoading: isLoading,
      submit: handleSubmit,
      close: handleClose,
      type: type,
      knowAboutOptions,
    },
  };
};

export default useLeadFormRequests;
