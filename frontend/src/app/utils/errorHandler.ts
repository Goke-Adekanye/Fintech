import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const errorHandler = (e: any) => {
  toast(e || e.message, {
    type: "error",
  });
};
