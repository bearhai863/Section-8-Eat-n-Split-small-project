import React, { useState } from "react";
import { FormAddFriend } from "./components/FormAddFriend";
import { Button } from "./components/Button";
import { FriendList } from "./components/FriendList";
import { FormSplitBill } from "./components/FormSplitBill";

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

export default function App() {
	const [friendList, setFriendList] = useState(initialFriends);
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [currSelection, setCurrSelection] = useState(null);

	function handleAddFriend(newFriend) {
		setFriendList((currFriendlist) => [...currFriendlist, newFriend]);
		handleShowAddFriend();
	}

	function handleShowAddFriend() {
		setShowAddFriend((curr) => !curr);
		setCurrSelection(null);
	}

	function handleSelection(friend) {
		setCurrSelection((curr) => (curr?.id === friend.id ? null : friend));
		setShowAddFriend(false);
	}

	function handleBalance(balance) {
		setFriendList((currFriendlist) =>
			currFriendlist.map((friend) =>
				friend.id === currSelection.id
					? { ...friend, balance: balance }
					: friend
			)
		);
		setCurrSelection(null);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendList
					friendList={friendList}
					selectedFriend={currSelection}
					onSelect={handleSelection}
				/>
				{showAddFriend && (
					<FormAddFriend onAddFriend={handleAddFriend} />
				)}
				<Button anyFunction={handleShowAddFriend}>
					{showAddFriend ? "Close" : "Add Friend"}
				</Button>
			</div>
			<div>
				{currSelection && (
					<FormSplitBill
						selectedFriend={currSelection}
						onBalance={handleBalance}
					/>
				)}
			</div>
		</div>
	);
}
