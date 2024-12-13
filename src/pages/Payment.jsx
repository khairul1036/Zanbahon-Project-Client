import React, { useContext, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { RideId, TotalFareAmount } = location.state || {};
  const { UserId } = useContext(AuthContext);

  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiredMonth, setExpiredMonth] = useState("");
  const [expiredYear, setExpiredYear] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [bkashNumber, setBkashNumber] = useState("");
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const generateTransactionId = () => {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base 36
    const randomString = Math.random().toString(36).substring(2, 10); // Generate a random alphanumeric string
    return `TXN-${timestamp}-${randomString}`; // Format the TransactionId
  };

  const formatCardNumber = (number) => {
    return number.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
  };

  const isCardValid = () => {
    return (
      cardholder.length >= "5" &&
      cardNumber.length === 20 &&
      expiredMonth !== "" &&
      expiredYear !== "" &&
      securityCode.length === 3
    );
  };

  const isBkashValid = () => {
    return bkashNumber.length === 11 && isTermsChecked;
  };

  const handleCardSubmit = () => {
    alert(`Card Payment Successful\nCardholder: ${cardholder}`);
    Swal.fire("Payment Successful", "Your payment has been processed.", "success").then(() => {
      navigate("/");
    });
  };

  const handleBkashSubmit = () => {
    const paymentRideShare = {
      SenderId: UserId,
      Amount: TotalFareAmount,
      PaymentMethod: paymentMethod,
      TransactionId: generateTransactionId(),
    };

    if (paymentRideShare) {
      // Store user details in the database
      fetch("http://localhost/zanbahon-server/payments.php", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(paymentRideShare),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            Swal.fire("Payment Successful", "Your payment has been processed.", "success").then(() => {
              navigate("/");
            });
          } else {
            Swal.fire("Payment Failed", "There was an issue with your payment.", "error").then(() => {
              navigate("/");
            });
          }
        })
        .catch((error) => {
          Swal.fire("Error", "An unexpected error occurred.", "error").then(() => {
            navigate("/");
          });
        });
    }
  };

  return (
    <>
      <div className="max-w-sm mx-auto mt-10">
        {/* Payment Method Switch */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-full text-white ${paymentMethod === "bkash" ? "bg-pink-600" : "bg-gray-400"}`}
            onClick={() => setPaymentMethod("bkash")}
          >
            bKash Payment
          </button>
          <button
            className={`px-4 py-2 rounded-full text-white ${paymentMethod === "card" ? "bg-blue-600" : "bg-gray-400"}`}
            onClick={() => setPaymentMethod("card")}
          >
            Card Payment
          </button>
        </div>

        {/* Bkash Payment Form */}
        {paymentMethod === "bkash" && (
          <div id="bkash" className="p-6 shadow-lg rounded-lg bg-pink-600 text-white">
            <div className="text-center">
              <img
                src="https://freelogopng.com/images/all_img/1656235654bkash-logo-white.png"
                alt="Bkash Logo"
                className="mx-auto w-20 mb-4"
              />
              <h1 className="text-2xl font-bold">bKash Payment</h1>
            </div>
            <div className="bg-pink-700 p-4 rounded-lg my-4 text-sm">
              <p>
                <strong>Merchant:</strong> Zanbahon
              </p>
              <p>
                <strong>Merchant ID:</strong> 21279615
              </p>
              <p className="flex items-center gap-2">
                <strong>Amount:</strong>
                <span className="flex items-center gap-2 text-lg font-bold">
                  {TotalFareAmount} <FaBangladeshiTakaSign className="text-lg font-bold" />
                </span>
              </p>
            </div>
            <input
              type="text"
              className="block w-full px-5 py-2 mb-3 border-none rounded-lg bg-pink-50 text-gray-800 placeholder-gray-500 shadow-lg focus:ring focus:outline-none"
              placeholder="e.g. 01XXXXXXXXX"
              maxLength="11"
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
            />
            <div className="flex items-start mb-4">
              <input
                type="checkbox"
                id="terms"
                className="mt-1.5 mr-2 w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring focus:ring-offset-0 focus:ring-pink-500"
                checked={isTermsChecked}
                onChange={(e) => setIsTermsChecked(e.target.checked)}
              />
              <label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <span className="underline cursor-pointer">terms and conditions</span>
              </label>
            </div>
            <div className="flex justify-between gap-4">
              <button
                className={`w-1/2 px-4 py-2 text-white rounded-full bg-pink-700 hover:bg-pink-800 focus:ring focus:ring-offset-2 focus:ring-pink-500 ${
                  !isBkashValid() && "cursor-not-allowed opacity-50"
                }`}
                disabled={!isBkashValid()}
                onClick={handleBkashSubmit}
              >
                Proceed
              </button>
              <button
                className="w-1/2 px-4 py-2 text-white rounded-full bg-gray-700 hover:bg-gray-800 focus:ring focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => navigate("/")}
              >
                Close
              </button>
            </div>
            <p className="text-center mt-4 text-xs opacity-75">© 16247</p>
          </div>
        )}

        {/* Card Payment Form */}
        {paymentMethod === "card" && (
          <div className="p-4 shadow-lg rounded-lg bg-white">
            <h2 className="text-xl font-semibold mb-4 text-center">Card Payment</h2>
            <div>
              <div className="mb-3 flex justify-center">
                <div className="px-2">
                  <label htmlFor="type1" className="flex items-center cursor-pointer">
                    <img
                      src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                      className="h-8 ml-3"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div>
              <input
                type="text"
                className="block w-full px-5 py-2 mb-3 border rounded-lg bg-gray-50 shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder="Card holder"
                maxLength="22"
                value={cardholder}
                onChange={(e) => setCardholder(e.target.value)}
              />
              <input
                type="text"
                className="block w-full px-5 py-2 mb-3 border rounded-lg bg-gray-50 shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder="Card number"
                maxLength="19"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              />
              <div className="grid grid-cols-2 gap-2 mb-3">
                <select
                  className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-gray-50 shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  value={expiredMonth}
                  onChange={(e) => setExpiredMonth(e.target.value)}
                >
                  <option value="" disabled>
                    MM
                  </option>
                  {[...Array(12).keys()].map((month) => (
                    <option key={month} value={String(month + 1).padStart(2, "0")}>
                      {String(month + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-gray-50 shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  value={expiredYear}
                  onChange={(e) => setExpiredYear(e.target.value)}
                >
                  <option value="" disabled>
                    YY
                  </option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={2024 + i}>
                      {2024 + i}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                className="block w-full px-5 py-2 mb-3 border rounded-lg bg-gray-50 shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder="Security code"
                maxLength="3"
                value={securityCode}
                onFocus={() => setCardSide("back")}
                onBlur={() => setCardSide("front")}
                onChange={(e) => setSecurityCode(e.target.value)}
              />
              <button
                className={`w-full px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:ring focus:outline-none ${
                  !isCardValid() && "cursor-not-allowed opacity-50"
                }`}
                disabled={!isCardValid()}
                onClick={handleCardSubmit}
              >
                Pay Now
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Payment;
