import * as yup from "yup";

export const rentProductSchema = yup.object().shape({
    rentStartDate: yup
        .date()
        .required("Start date is required")
        .min(new Date(), "Start date cannot be in the past")
        .typeError("Please select a valid start date"),
    rentEndDate: yup
        .date()
        .required("End date is required")
        .min(yup.ref("rentStartDate"), "End date must be after start date")
        .typeError("Please select a valid end date"),
});
