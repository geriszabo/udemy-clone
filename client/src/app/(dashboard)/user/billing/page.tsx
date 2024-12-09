"use client"

import { Loading } from "@/components/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { useGetTransactionsQuery } from "@/state/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

const UserBillingPage = () => {
  const [paymentType, setPaymentType] = useState("all");
  const { user, isLoaded } = useUser();

  const { data: transactions, isLoading: isLoadingTransactions } =
    useGetTransactionsQuery(user?.id || "", {
      skip: !isLoaded || !user,
    });

  const filteredData =
    transactions?.filter(
      (transaction) =>
        paymentType === "all" || transaction.paymentProvider === paymentType
    ) || [];

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to view your billing information</div>;

  return (
    <div className="billing">
    <div className="billing__container">
      <h2 className="billing__title">Payment History</h2>
      <div className="billing__filters">
          <Select value={paymentType} onValueChange={setPaymentType}>
            <SelectTrigger className="billing__select">
              <SelectValue placeholder="Payment Type"/>
            </SelectTrigger>
            <SelectContent className="billing__select-content">
              {selectItems.map((item) => (
                <SelectItem
                  key={item.value}
                  className="billing__select-item"
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="billing__grid">
          {isLoadingTransactions ? (
            <Loading />
          ) : (
            <Table className="billing__table">
              <TableHeader className="billing__table-header-row">
                <TableRow className="billing__table-row">
                  {tableHeads.map((tableHead) => (
                    <TableHead key={tableHead} className="billing__table-cell">
                      {tableHead}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="billing__table-body">
                {filteredData.length > 0 ? (
                  filteredData.map((transaction) => (
                    <TableRow
                      key={transaction.transactionId}
                      className="billing__table-row"
                    >
                      <TableCell className="billing__table-cell">
                        {new Date(transaction.dateTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="billing__table-cell billing__amount">
                        {formatPrice(transaction.amount)}
                      </TableCell>
                      <TableCell className="billing__table-cell">
                        {transaction.paymentProvider}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="billing__table-row">
                    <TableCell className="billing__table-cell" colSpan={3}>
                      No transaction to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBillingPage;

const selectItems = [
  {
    label: "All Types",
    value: "all",
  },
  {
    label: "Paypal",
    value: "paypal",
  },
  {
    label: "Stripe",
    value: "stripe",
  },
];

const tableHeads = ["Date", "Amount", "Payment Method"];
