import { useMutation } from "@apollo/client/react";
import { Button, Flex, Modal, Stack, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import { RENT_PRODUCT } from "../../../services/mutations/transactionMutations";
import { rentProductSchema } from "../../../validators/transactionValidators";
import { GET_PRODUCT } from "../../../services/queries/productQueries";
import { yupResolver } from "mantine-form-yup-resolver";

export default function ProductRentModal({
    opened,
    onClose,
    product,
    currentUserUid,
    onSuccess,
}) {
    const form = useForm({
        initialValues: {
            rentStartDate: null,
            rentEndDate: null,
        },
        validate: yupResolver(rentProductSchema),
    });

    const [rentProduct, { loading: rentLoading }] = useMutation(RENT_PRODUCT, {
        onCompleted: (data) => {
            if (data?.rentProduct?.success) {
                notifications.show({
                    title: "Success!",
                    message:
                        data.rentProduct.message ||
                        "Product rented successfully!",
                    color: "green",
                });
                form.reset();
                onClose();
                if (onSuccess) onSuccess();
            }
        },
        onError: (error) => {
            notifications.show({
                title: "Rental Failed",
                message:
                    error.message ||
                    "An error occurred while renting the product",
                color: "red",
            });
        },
        refetchQueries: [
            { query: GET_PRODUCT, variables: { uid: product?.uid } },
        ],
    });

    const handleSubmit = (values) => {
        rentProduct({
            variables: {
                rentProductInput: {
                    productUid: product.uid,
                    renterUid: currentUserUid,
                    rentStartsAt: dayjs(values.rentStartDate).toISOString(),
                    rentEndsAt: dayjs(values.rentEndDate).toISOString(),
                },
            },
        });
    };

    const handleClose = () => {
        if (!rentLoading) {
            form.reset();
            onClose();
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title="Rental Period"
            centered
            size="md"
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                    <Text size="sm" c="dimmed">
                        Select the rental period for{" "}
                        <strong>{product?.title}</strong>
                    </Text>

                    <DateInput
                        label="From"
                        placeholder="dd/mm/yyyy"
                        minDate={new Date()}
                        valueFormat="DD/MM/YYYY"
                        clearable
                        disabled={rentLoading}
                        {...form.getInputProps("rentStartDate")}
                    />

                    <DateInput
                        label="To"
                        placeholder="dd/mm/yyyy"
                        minDate={form.values.rentStartDate || new Date()}
                        valueFormat="DD/MM/YYYY"
                        clearable
                        disabled={rentLoading}
                        {...form.getInputProps("rentEndDate")}
                    />

                    {product?.rentalPrice && (
                        <Text size="sm" fw={500}>
                            Rental Price: ${product.rentalPrice}
                            {product.rentalType && ` / ${product.rentalType}`}
                        </Text>
                    )}

                    <Flex gap="sm" justify="flex-end" mt="md">
                        <Button
                            variant="subtle"
                            color="gray"
                            onClick={handleClose}
                            disabled={rentLoading}
                            type="button"
                        >
                            Go Back
                        </Button>
                        <Button
                            color="indigo"
                            loading={rentLoading}
                            type="submit"
                        >
                            Confirm Rent
                        </Button>
                    </Flex>
                </Stack>
            </form>
        </Modal>
    );
}
