import React from "react";

const index = () => {
  return (
    <div
      className="checkout-success min-h-[80vh] max-w-[800px] m-auto w-full flex flex-col items-center justify-center
    "
    >
      <h2 className="text-3xl mb-4 text-green-300">Check out Successful</h2>
      <p>Your order might take sometime to process</p>
      <p>Check your order status at your profile after about 10 mins.</p>
      <p>
        In case of any inquiries contact the support at{" "}
        <strong>support@se-shop.com</strong>{" "}
      </p>
    </div>
  );
};

export default index;
