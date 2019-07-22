import React from 'react'

function PostListItem(props) {
	return (
		<li>
			{props.value}
		</li>
	)
}

export default class PostList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const numbers = this.props.numbers;
		const listItems = numbers.map((number) => {
				return (
					<PostListItem key={number.toString()} value={number} />
				);
			})
		return <ul>{listItems}</ul>
	}
}