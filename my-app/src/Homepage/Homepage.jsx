import { useEffect, useState } from "react";
import api from "../api/base";
import { useNavigate, Link } from "react-router-dom";

function Homepage() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const navigate = useNavigate();

  const fetchBankAccounts = async () => {
    const token = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await api.get("/bank-accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBankAccounts(data);
    } catch (error) {
      console.error("Error fetching bank account: ", error);
    }
  };

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center text-gray-800">
      <div className="bg-white border border-gray-300 w-full max-w-md rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          My bank accounts
        </h1>
        {bankAccounts.length > 0 ? (
          <ul className="space-y-4">
            {bankAccounts.map((account) => (
              <li key={account.id}>
                <Link
                  to={`/bank-account/${account.id}`}
                  className="block bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-gray-100"
                >
                  <p className="mb-1">
                    <span className="font-medium">Account number:</span>{" "}
                    {account.accountNumber}
                  </p>
                  <p>
                    <span className="font-medium">Balance:</span>{" "}
                    {account.balance} RSD
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">You have no bank account!</p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
