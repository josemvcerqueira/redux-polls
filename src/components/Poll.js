import React, { Component } from "react";
import { connect } from "react-redux";
import { getPercentage } from "../utils/helpers";

const getVoteKeys = () => ["aVotes", "bVotes", "cVotes", "dVotes"];

class Poll extends Component {
	handleAnswer = answer => {
		const { poll, authedUser } = this.props;
		this.answered = true;

		console.log("add Answer", answer);
	};
	render() {
		if (this.props.poll === null) {
			return <p>This poll does not exist</p>;
		}

		const { poll, vote, authorVatar } = this.props;

		const totalVotes = getVoteKeys().reduce(
			(acc, key) => acc + poll[key].length,
			0
		);

		return (
			<div className="poll-container">
				<h1 className="question">{poll.question}</h1>
				<div className="poll-author">
					By <img src={authorVatar} alt="Author's avatar" />
				</div>
				<ul>
					{["aText", "bText", "cText", "dText"].map(key => {
						const count = poll[key[0] + "Votes"].length;

						return (
							<li
								onclick={() => {
									if (vote === null && !this.answered) {
										this.handleAnswer(key[0]);
									}
								}}
								key={key}
								className={`option ${
									vote === key[0] ? "chosen" : ""
								}`}
							>
								{vote === null ? (
									poll[key]
								) : (
									<div className="result">
										<span>{poll[key]}</span>
										<span>
											{getPercentage(count, totalVotes)}%
											({count})
										</span>
									</div>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

function mapStateToProps({ authedUser, polls, users }, { match }) {
	const { id } = match.params;
	const poll = polls[id];

	if (!poll) {
		return {
			pull: null
		};
	}

	const vote = getVoteKeys().reduce((vote, key) => {
		if (vote !== null) {
			return vote[0];
		}

		return poll[key].includes(authedUser) ? key : vote;
	}, null);

	return {
		poll,
		vote,
		authedUser,
		authorVatar: users[poll.author].avatarURL
	};
}

export default connect(mapStateToProps)(Poll);
