import * as yup from "yup";
import dayjs from "dayjs";

export const rentProductSchema = yup.object().shape({
    rentStartDate: yup
        .date()
        .required("Start date is required")
        .typeError("Please select a valid start date")
        .test("not-in-past", "Start date cannot be in the past", (value) => {
            if (!value) return false;
            const today = dayjs().startOf("day");
            const start = dayjs(value).startOf("day");
            return start.isAfter(today) || start.isSame(today);
        }),

    rentEndDate: yup
        .date()
        .required("End date is required")
        .typeError("Please select a valid end date")
        .test(
            "is-after-start",
            "End date must be after start date",
            function (value) {
                const { rentStartDate } = this.parent;
                if (!value || !rentStartDate) return false;

                const start = dayjs(rentStartDate).startOf("day");
                const end = dayjs(value).startOf("day");

                return end.isAfter(start);
            }
        ),
});
