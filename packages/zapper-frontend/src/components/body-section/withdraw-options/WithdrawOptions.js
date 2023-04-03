import "./WithdrawOptions.css";
import React from 'react';
import WithdrawText from "./WithdrawText";
import WithdrawButton from "./WithdrawButton";

/**@info Component in charge of rendering everything related to the withdrawal of funds */

function WithdrawOptions() {
  return (
    <div>
        <WithdrawText/>
        <WithdrawButton/>
    </div>
  )
}

export default WithdrawOptions;
