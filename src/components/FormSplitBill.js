import React, { useState } from "react";
import { Button } from "./Button";

export function FormSplitBill({ selectedFriend, onBalance }) {
	const [bill, setBill] = useState("");
	const [myExpense, setMyExpense] = useState("");
	const friendExpense = bill - myExpense;
	const [whoPaid, setWhoPaid] = useState("user");
	const displayCondition = !bill && !myExpense;
	const balance =
		whoPaid === "user" ? bill - myExpense : (bill - friendExpense) * -1;

	return (
		<form
			className="form-split-bill"
			onSubmit={(e) => {
				e.preventDefault();
				if (displayCondition) return;
				onBalance(balance);
				setBill("");
				setMyExpense("");
				setWhoPaid("user");
			}}
		>
			<h2>Split a bill with {selectedFriend.name}</h2>

			<label>💰 Bill value</label>
			<input
				type="text"
				value={bill}
				onChange={(e) => setBill(Number(e.target.value))}
                required
			/>

			<label>🧑 Your expense</label>
			<input
				type="text"
				value={myExpense}
				onChange={(e) => setMyExpense(Number(e.target.value))}
                required
			/>

			<label>👫 {selectedFriend.name}'s expense</label>
			<input
				type="text"
				value={friendExpense === 0 ? "" : friendExpense}
				disabled
			/>

			<label>🤑 Who is paying the bill</label>
			<select
				value={whoPaid}
				onChange={(e) => setWhoPaid(e.target.value)}
			>
				<option value="user">Me</option>
				<option value="friend">{selectedFriend.name}</option>
			</select>

			<Button>Split bill</Button>
		</form>
	);
}
