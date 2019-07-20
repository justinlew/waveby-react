import React, { Component } from 'react'
import { connect } from 'react-redux'
// import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux'
import { logout } from '../actions'
// import { createBottomTabNavigator, withNavigation } from 'react-navigation'
import Post from './Post'
// import { styles } from './common/styles'
import { fetchPosts } from '../actions/post'
// import AddPost from './Posts/AddPost'

class Home extends Component {
	// static navigationOptions = ({navigation}) => {
	// 	const { params } = navigation.state
	// 	return {
	// 		headerTitle: "Waveby",
	// 		headerRight: (
	// 			<Button
	// 				onPress={() => params.logout()}
	// 				title="Logout"
	// 				color="blue"
	// 			/>
	// 	)}
	// }

	constructor(props) {
		super(props)
		this.state = {
			user: {
				_id: "",
				email: ""
			},
			posts: []
		}
		this.logout = this.logout.bind(this)
		// this.props.navigation.setParams({logout: this.logout})
	}

	logout = () => {
		this.props.logout()
	}

	componentDidMount() {
		this.props.fetchPosts()
	}

	render() {
		const { posts } = this.props
		console.log(JSON.stringify(posts))
		return (
			<Post author="Justin Lew" createdBy="July 19 2019" body="Lorem ipsum"/>
			
		)
	}

	// render() {
	// 	return (
	// 		<View
	// 			style={styles.homeContainer}
	// 		>
	// 			<Text></Text>				
	// 			<FlatList
	// 				data={this.props.posts}
	// 				renderItem={({item}) => (
	// 					<Post
	// 						author={item.email}
	// 						createdBy={item.created_by}
	// 						body={item.body}
	// 					/>
	// 				)}
	// 				keyExtractor={(item, index) => item._id}
	// 				refreshControl={
	// 					<RefreshControl
	// 		              refreshing={this.props.isFetchingPosts}
	// 		              onRefresh={() => this.props.fetchPosts()}
	// 		            />
	// 				}
	// 			/>
	// 		</View>
	// 	);
	// }
}

const mapStateToProps = (state) => {
	const { user, token } = state.authentication
	const { posts, isFetchingPosts } = state.post
	// console.log("returningmapStateToProps: ", { user, token, posts})
	return { user, token, posts, isFetchingPosts}
};

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchPosts,
	logout
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Home)