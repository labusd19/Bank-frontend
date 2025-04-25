import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/base";

function BankAccount() {
  const { id } = useParams();
  const [bankAccount, setBankAccount] = useState({});
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const fetchBankAccount = async () => {
    const token = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await api.get(`/bank-account/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBankAccount(data);
    } catch (error) {
      console.error("Error fetching bank account: ", error);
    }
  };

  const fetchAccountsTransactions = async () => {
    const token = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await api.get(`/bank-account/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const sortedTransactions = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTransactions(sortedTransactions);
    } catch (error) {
      console.error("Error fetching transactions!", error);
    }
  };

  useEffect(() => {
    fetchBankAccount();
    fetchAccountsTransactions();
  }, [id]);

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center text-gray-800 p-4">
      {transactions.length > 0 ? (
        <div className="bg-white p-6 rounded-xl shadow w-full max-w-4xl">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Transactions for Account #{bankAccount.accountNumber}
          </h1>
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Sender</th>
                <th className="p-2 border">Receiver</th>
                <th className="p-2 border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="text-center hover:bg-gray-50"
                  onClick={() => navigate(`/transactions/${transaction.id}`)}
                >
                  <td className="p-2 border">
                    {new Date(transaction.createdAt).toLocaleString("sr-RS", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="p-2 border">
                    {transaction.sender_account_id}
                  </td>
                  <td className="p-2 border">
                    {transaction.reciver_account_id}
                  </td>
                  <td
                    className={`p-2 border border-black font-semibold ${
                      bankAccount.accountNumber ===
                      transaction.sender_account_id
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {transaction.amount} RSD
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-lg text-gray-500 text-center">
          There are no transactions on this bank account!
        </p>
      )}
    </div>
  );
}

export default BankAccount;
