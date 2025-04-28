import { useEffect, useState } from "react";
import api from "../api/base";
import { useNavigate } from "react-router-dom";

function Transfer() {
  const [accounts, setAccounts] = useState([]);
  const [sender, setSender] = useState("");
  const [reciver, setReciver] = useState("");
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const getSendersAccounts = async () => {
    const token = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
    }

    try {
      const { data } = await api.get("/bank-account", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(data);
    } catch (error) {
      console.error(error);
      setError("Error fetching users accounts");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
    }

    if (!sender || !reciver || !amount) {
      setError("All fields except description are required!");
      return;
    }

    try {
      await api.post(
        "/transactions",
        {
          sender_account_id: sender,
          reciver_account_id: reciver,
          amount: amount,
          description: description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSender("");
      setReciver("");
      setAmount(null);
      setDescription("");
      setError("");
      setSuccessMessage("Transaction successful! 🎉");

      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (error) {
      setError("Internal server error!");
      console.error(error);
    }
  };

  useEffect(() => {
    getSendersAccounts();
    console.log(sender);
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center text-gray-800 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">New Transfer</h1>

        {/* Error message display */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Success message display */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sender Account Dropdown */}
          <div>
            <label className="block mb-1 font-semibold">Sender Account</label>
            <select
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full text-gray-400 border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a sender account</option>
              {accounts.map((account) => (
                <option
                  key={account.id}
                  value={account.accountNumber}
                  className="text-black"
                >
                  {account.accountNumber} - {account.balance} RSD
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Receiver Account</label>
            <input
              type="text"
              value={reciver}
              onChange={(e) => setReciver(e.target.value)}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter receiver account ID"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Amount (RSD)</label>
            <input
              type="number"
              value={amount ?? ""}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter description"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 text-lg font-semibold rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 transition"
          >
            <span className="text-2xl">💸</span> Transfer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Transfer;
