import { toast } from "react-toastify";

export const errorHandler = (e: any) => {
  toast(e, {
    type: "error",
  });
};
