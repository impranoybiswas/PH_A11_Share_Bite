import React, { useState } from "react";
import DonationButton from "../components/DonationButton";
import CountUp from "react-countup";
import useAuth from "../hooks/useAuth";

export default function Donations() {
  const [amount, setAmount] = useState(0);

  const { loading } = useAuth();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full overflow-hidden">
      <div
        data-aos="fade-right"
        className="border-[1px] border-secondary/30 rounded-lg overflow-hidden p-4 shadow-sm bg-secondary/10 flex items-center gap-5"
      >
        <img
          className="size-30 lg:size-40 rounded-full shadow-sm"
          src="https://i.ibb.co.com/8L5KLJ8L/money.gif"
        />
        <div className="flex-1">
          <h1 className="text-xl lg:text-3xl font-semibold text-secondary mb-3">
            Thank You!
          </h1>
          <div className="text-2xl lg:text-4xl font-semibold text-blue-500 pt-2">
          <CountUp start={0} end={56421} duration={3} />+ BDT
          </div>
          <p className="text-sm lg:text-lg text-accent/90">
            Donations by Great Hearted Peoples.
          </p>
        </div>
      </div>

      <div
        data-aos="fade-left"
        className="border-[1px] border-secondary/30 rounded-lg overflow-hidden p-4 shadow-sm bg-secondary/10 flex items-center gap-5 flex-col md:flex-row justify-center"
      >
        <img
          className="size-30 lg:size-40 rounded-full shadow-sm"
          src="https://i.ibb.co.com/vCQPps8H/alms.gif"
        />
        <div className="flex-1">
          <h1 className="text-xl lg:text-3xl font-semibold text-secondary mb-3 text-center">
            Donate Us
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              className="input w-full input-secondary"
              type="number"
              name="amount"
              placeholder="Enter Amount"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <DonationButton disabled={loading} amount={amount} />
          </form>
        </div>
      </div>
    </div>
  );
}
