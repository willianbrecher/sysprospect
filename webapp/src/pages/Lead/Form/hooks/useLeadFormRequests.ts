import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { LeadApi } from "../../../../api/LeadApi";
import type { ILeadViewModel } from "../../../../types/lead.types";
import type { IFormProps } from "../../../../types/form.types";
import type { ILeadForm, ILeadFormSchema } from "../utils/leadForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getLeadSchema } from "../utils/leadForm.schema";
import type { ControlledDropdownOptionItem } from "../../../../components/ControlledDropdown/controlledDropdown.types";

const useLeadFormRequests = (props: IFormProps) => {
  const { type } = props;
  const leadApi = useMemo(() => new LeadApi(), []);
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const defaultValues = {
    name: "",
    phone: "",
    email: "",
    knowAbout: null,
    amount: 1,
    createdAt: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(getLeadSchema()),
  });

	const handleSubmit = methods.handleSubmit((form) => {
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
    onError: (err) => handleQueryError(err as string),
    refetchOnWindowFocus: false,
  });

  const createLeadMutation = useMutation({
    mutationFn: async (form: ILeadForm) => {
      return await leadApi.create<ILeadForm, ILeadViewModel>(form);
    },
    onSuccess: () => handleMutationSuccess("createdSuccessfully"),
    onError: (err) => handleMutationError(err as string),
  });

  const updateLeadMutation = useMutation({
    mutationFn: async (form: ILeadForm) => {
      return await leadApi.update(form, id);
    },
    onSuccess: () => handleMutationSuccess("updatedSuccessfully"),
    onError: (err) => handleMutationError(err as string),
  });

  const isLoading =
    leadQuery.isLoading ||
    createLeadMutation.isLoading ||
    updateLeadMutation.isLoading;

  const handleQuerySuccess = (data: ILeadViewModel) => {
    methods.reset(data);
  };

  const handleQueryError = (message: string) => {
    console.error(message);
  };

  const handleMutationSuccess = (message: string) => {
    queryClient.invalidateQueries(leadApi.pageableListQueryKey).then();

    handleClose();

    if (typeof message === "string") {
      //Message.success(message);
    }

    if (typeof message === "object") {
      //Message.success(translate(message));
    }
  };

  const handleMutationError = (message: string) => {
    handleClose();

    if (typeof message === "string") {
      //Message.error(message);
    }

    if (typeof message === "object") {
      //Message.error(translate(message));
    }
  };

  const knowAboutOptions: ControlledDropdownOptionItem[] = [
    { label: "Internet", value: "INTERNET" },
    { label: "Evento", value: "EVENT" },
    { label: "Recomendado", value: "REFERRED" },
    { label: "Outro", value: "OTHER" },
  ];  

  return {
    form: {
      methods: methods,
      isLoading: isLoading,
      submit: handleSubmit,
      close: handleClose,
      type: type,
      knowAboutOptions
    },
  };
};

export default useLeadFormRequests;
