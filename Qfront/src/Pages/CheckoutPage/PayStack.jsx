import React from "react";
import {
  usePaystackPayment,
  PaystackButton,
  PaystackConsumer,
} from "react-paystack";

const config = {
  reference: new Date().getTime(),
  email: "user@example.com",
  amount: 20000,
  publicKey: "pk_test_dsdfghuytfd2345678gvxxxxxxxxxx",
};

const PaystackHookExample = () => {
  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <button
        onClick={() => {
          initializePayment();
        }}
      >
        Paystack Hooks
      </button>
    </div>
  );
};

const PayStack = () => {
  const componentProps = {
    ...config,
    text: "Paystack Button",
    onSuccess: () => null,
    onClose: () => null,
  };

  return (
    <div className="d-flex">
      <PaystackHookExample />
      <PaystackButton {...componentProps} />
      <PaystackConsumer {...componentProps}>
        {({ initializePayment }) => (
          <button onClick={() => initializePayment()}>Paystack Consumer</button>
        )}
      </PaystackConsumer>
    </div>
  );
};

export default PayStack;
