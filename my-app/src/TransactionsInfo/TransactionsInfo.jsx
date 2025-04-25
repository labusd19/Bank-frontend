import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/base";

function TransactionsInfo() {
  const [transaction, setTransaction] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTransaction = async () => {
    const token = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
    }

    try {
      const { data } = await api.get(`/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransaction(data);
    } catch (error) {
      console.error("Error fetching transaction: ", error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Transaction details
        </h2>

        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <h3 className="font-bold text-lg mb-1">Sender</h3>
            <p>Name: {transaction.Sender?.User?.fullname}</p>
            <p>Bank account: {transaction.sender_account_id}</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-1">Reciver</h3>
            <p>Name: {transaction.Reciver?.User?.fullname}</p>
            <p>Bank account: {transaction.reciver_account_id}</p>
          </div>
        </div>

        <div className="border-t pt-4 text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Amont:</span> {transaction.amount}{" "}
            RSD
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {transaction.description || "No description."}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {transaction.createdAt &&
              new Date(transaction.createdAt).toLocaleString("sr-RS", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TransactionsInfo;
