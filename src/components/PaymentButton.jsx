import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import StripeService from "../services/stripe.service";

const PaymentButton = ({ cartItems }) => {
  const { user } = useContext(AuthContext);
  const handleCheckOut = () => {
    StripeService.createCheckOutSession({
      cartItems,
      email: user.email,
    }).then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    });
  };

  return (
    <div>
      <button
        className="btn btn-md bg-red text-white px-8 py-1"
        onClick={() => handleCheckOut()}
      >
        Process CheckOut
      </button>
    </div>
  );
};

export default PaymentButton;
