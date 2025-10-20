export const GetDateInDayMonthYearFormat = (isoString) => {
    const date = new Date(isoString);
    return date
        .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "2-digit",
        })
        .replace(".", "-");
};
