import React, { useState } from "react";
import { Button } from "./Button";

export function FormSplitBill({ selectedFriend, onBalance }) {
	const [bill, setBill] = useState("");
	const [myExpense, setMyExpense] = useState("");
	const friendExpense = bill - myExpense || "";
	const [whoPaid, setWhoPaid] = useState("user");
	const balance = whoPaid === "user" ? friendExpense : -myExpense;
	// whoPaid === "user" ? bill - myExpense : (bill - friendExpense) * -1;

	function handleSubmit(e) {
		e.preventDefault();
		if (!bill || !myExpense) return;

		onBalance(balance);

		setBill("");
		setMyExpense("");
		setWhoPaid("user");
	}

	return (
		<form className="form-split-bill" onSubmit={handleSubmit}>
			<h2>Split a bill with {selectedFriend.name}</h2>

			<label>💰 Bill value</label>
			<input
				type="text"
				value={bill}
				onChange={(e) => setBill(Number(e.target.value))}
			/>

			<label>🧑 Your expense</label>
			<input
				type="text"
				value={myExpense}
				onChange={(e) =>
					setMyExpense(
						Number(e.target.value) > bill
							? myExpense
							: Number(e.target.value)
					)
				}
			/>

			<label>👫 {selectedFriend.name}'s expense</label>
			<input type="text" value={friendExpense} disabled />

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
