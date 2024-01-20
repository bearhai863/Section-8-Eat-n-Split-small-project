import React from "react";
import { Button } from "./Button";

export function Friend({ friend, onSelect, selectedFriend }) {
	const activeBillUi = selectedFriend?.id === friend.id;

	return (
		<li>
			<img
				src={
					friend.image ? friend.image : "default profile picture.webp"
				}
				alt={friend.name}
			/>
			<h3>{friend.name}</h3>
			{friend.balance > 0 && (
				<p className="green">
					{friend.name} owes you {friend.balance}$
				</p>
			)}
			{friend.balance < 0 && (
				<p className="red">
					you owes {friend.name} {Math.abs(friend.balance)}$
				</p>
			)}
			{friend.balance === 0 && <p>You and {friend.name} are even</p>}
			<Button
				anyFunction={() => {
					onSelect(friend);
				}}
			>
				{activeBillUi ? "Close" : "Select"}
			</Button>
		</li>
	);
}
