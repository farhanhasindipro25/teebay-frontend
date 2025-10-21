import { Alert, Stack } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import TransactionCard from "./TransactionCard";

export default function TransactionList({
    transactions,
    viewType,
    emptyMessage,
}) {
    if (!transactions || transactions.length === 0) {
        return (
            <Alert
                icon={<IconAlertCircle size={16} />}
                title="No transactions"
                color="blue"
                variant="light"
            >
                {emptyMessage}
            </Alert>
        );
    }

    return (
        <Stack gap="md">
            {transactions.map((transaction) => (
                <TransactionCard
                    key={transaction.uid}
                    transaction={transaction}
                    viewType={viewType}
                />
            ))}
        </Stack>
    );
}
