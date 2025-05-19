import { useMemo, useRef } from "react";
import { RegisterApi } from "../../../api/RegisterApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getRegisterSchema } from "../utils/register.schema";
import { useMutation } from "react-query";
import type { IRegisterForm } from "../utils/register.types";
import type { ControlledDropdownOptionItem } from "../../../components/ControlledDropdown/controlledDropdown.types";
import type { Toast } from "primereact/toast";

const useRegister = () => {
  const registerApi = useMemo(() => new RegisterApi(), []);
  const toast = useRef<Toast>(null);

  const formControl = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: yupResolver(getRegisterSchema()),
  });

  const handleSubmit = formControl.handleSubmit((form) => {
    submitRegisterMutation.mutate(form as IRegisterForm);
  });

  const submitRegisterMutation = useMutation({
    mutationFn: async (form: IRegisterForm) => {
      return await registerApi.register(form);
    },
    onSuccess: () => handleSuccess(),
    onError: () => handleError(),
  });

  const handleSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Registro",
      detail: "Obrigado pelo seu contato! Alguém de nossa equipe entrará em contato em breve.",
      life: 10000,
    });
    formControl.reset();
  };

  const handleError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Registro",
      detail: "Ocorreu um erro ao registrar o usuário!",
      life: 10000,
    });
  };

  const knowAboutOptions: ControlledDropdownOptionItem[] = [
    { label: "Internet", value: "INTERNET" },
    { label: "Evento", value: "EVENT" },
    { label: "Recomendado", value: "REFERRED" },
    { label: "Outro", value: "OTHER" },
  ];

  return {
    form: {
      formControl: formControl,
      submit: handleSubmit,
      knowAboutOptions,
    },
    toast
  };
};

export default useRegister;
