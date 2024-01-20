import React from "react";
import { Friend } from "./Friend";

export function FriendList({ friendList, onSelect, selectedFriend }) {
	const friends = friendList;
	return (
		<ul>
			{friends.map((friend) => (
				<Friend friend={friend} key={friend.id} onSelect={onSelect} selectedFriend={selectedFriend} />
			))}
		</ul>
	);
}
