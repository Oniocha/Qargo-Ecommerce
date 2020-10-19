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
        Paystack Hooks Implementation
      </button>
    </div>
  );
};

const PayStack = ({ products }) => {
  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: () => null,
    onClose: () => null,
  };

  return (
    <div>
      <PaystackHookExample />
      <PaystackButton {...componentProps} />
      <PaystackConsumer {...componentProps}>
        {({ initializePayment }) => (
          <button onClick={() => initializePayment()}>
            Paystack Consumer Implementation
          </button>
        )}
      </PaystackConsumer>
    </div>
  );
};

export default PayStack;
