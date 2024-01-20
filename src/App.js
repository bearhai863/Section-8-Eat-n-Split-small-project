import React, { useState } from "react";

export default function App() {
	const [friendList, setFriendList] = useState([]);
	const [currSelection, setCurrSelection] = useState("id");
	const currActive = friendList.find((friend) => friend.id === currSelection);

	function handleAddFriend(newFriend) {
		setFriendList((currFriendlist) => [...currFriendlist, newFriend]);
	}

	function handleSelection(id) {
		setCurrSelection(id);
	}

	function handleBalance(balance) {
		setFriendList((currFriendlist) =>
			currFriendlist.map((friend) =>
				friend.id === currSelection
					? { ...friend, balance: balance }
					: friend
			)
		);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendList
					friendList={friendList}
					onSelect={handleSelection}
				/>
				<FormAddFriend onAddFriend={handleAddFriend} />
				<Button>Add friend</Button>
			</div>
			<div>
				{currActive && (
					<FormSplitBill
						currActive={currActive}
						onBalance={handleBalance}
					/>
				)}
			</div>
		</div>
	);
}

function FriendList({ friendList, onSelect }) {
	const friends = friendList;
	return (
		<ul>
			{friends.map((friend) => (
				<Friend friend={friend} key={friend.id} onSelect={onSelect} />
			))}
		</ul>
	);
}

function Friend({ friend, onSelect }) {
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
			<Button anyFunction={() => onSelect(friend.id)}>Select</Button>
		</li>
	);
}

function Button({ children, anyFunction }) {
	return (
		<button className="button" onClick={anyFunction}>
			{children}
		</button>
	);
}

function FormAddFriend({ onAddFriend }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState("");

	function handleSubmit(e) {
		e.preventDefault();

		const newFriend = {
			id: Math.random(),
			name,
			image,
			balance: 0,
		};

		onAddFriend(newFriend);
		setName("");
		setImage("");
	}

	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label>👫 Friend</label>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<label>📸 Image URL</label>
			<input
				type="text"
				placeholder="(optional)"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>

			<Button>Add</Button>
		</form>
	);
}

function FormSplitBill({ currActive, onBalance }) {
	const [bill, setBill] = useState("");
	const [myExpense, setMyExpense] = useState("");
	const [whoPaid, setWhoPaid] = useState("user");
	const friendExpense = bill - myExpense;
	const balance =
		whoPaid === "user" ? bill - myExpense : (bill - friendExpense) * -1;

	return (
		<form
			className="form-split-bill"
			onSubmit={(e) => {
				e.preventDefault();
				onBalance(balance);
				setBill("");
				setMyExpense("");
				setWhoPaid("user");
			}}
		>
			<h2>Split a bill with {currActive.name}</h2>

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
				onChange={(e) => setMyExpense(Number(e.target.value))}
			/>

			<label>👫 {currActive.name}'s expense</label>
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
				<option value="friend">{currActive.name}</option>
			</select>

			<Button>Split bill</Button>
		</form>
	);
}
