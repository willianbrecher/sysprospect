import * as yup from "yup";
import { HowKnowAbout } from "../../../types/lead.types";

export const getRegisterSchema = () => {
  return yup.object({
    name: yup.string().required("Name is required!"),
    phone: yup.string().required("Phone is required!"),
    email: yup.string().email("Invalid email!").required("Email is required!"),
    knowAbout: yup
      .mixed<HowKnowAbout>()
      .oneOf(
        Object.values(HowKnowAbout).map((e) => e as HowKnowAbout),
        "This field is required!"
      )
      .required("This field is required!"),
  });
};
