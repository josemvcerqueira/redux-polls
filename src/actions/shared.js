import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receivePolls } from "./polls";
import { setAuthedUser } from "./authedUser";

console.log(receiveUsers);

const AUTHED_ID = "tylermcginnis";

// Action creator
export function handleInitialData() {
	return dispatch => {
		return getInitialData().then(({ users, polls }) => {
			dispatch(receiveUsers(users));
			dispatch(receivePolls(polls));
			dispatch(setAuthedUser(AUTHED_ID));
		});
	};
}
