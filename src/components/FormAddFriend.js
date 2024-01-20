import React, { useState } from "react";
import { Button } from "./Button";

export function FormAddFriend({ onAddFriend }) {
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