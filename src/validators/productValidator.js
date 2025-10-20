import * as yup from "yup";

export const productSchema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required")
        .max(100, "Title cannot exceed 100 characters"),

    categories: yup
        .array()
        .of(yup.string().required())
        .min(1, "At least one category is required"),

    description: yup
        .string()
        .required("Description is required")
        .max(1000, "Description cannot exceed 1000 characters"),

    price: yup
        .number()
        .typeError("Price must be a number")
        .required("Price is required")
        .positive("Price must be greater than 0"),

    rentalPrice: yup
        .number()
        .typeError("Rental price must be a number")
        .required("Rental price is required")
        .positive("Rental price must be greater than 0"),

    rentalType: yup
        .string()
        .oneOf(["HOURLY", "DAILY", "WEEKLY", "MONTHLY"], "Invalid rental type")
        .required("Rental type is required"),
});
