import React, {Component} from "react";
import {
    Route,
    NavLink,
    BrowserRouter,
    Redirect,
    withRouter
} from "react-router-dom";
import SignUp from "./Account/SignUp";
import SignIn from "./Account/SignIn";
import MyStuffList from "./Stuff/MyStuffList";
import MyFriendsStuffList from "./Stuff/MyFriendsStuffList";
import MyStuffItemDetail from "./Stuff/MyStuffItemDetail";
import CreateStuff from "./Stuff/CreateStuff";
import UpdateStuff from "./Stuff/UpdateStuff";
import {authentication} from "./Utils/Authentication";

import FriendList from "./Account/FriendList";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        authentication.isAuthenticated()
            ? <Component {...props} {...rest}/>
            : <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
            }} />
    )} />
)

const AuthButton = withRouter(({ history }) => (
    authentication.isAuthenticated() ? (
        <p>
            Welcome, {authentication.getAuthName()}! <button onClick={() => {
            authentication.signOut(() => history.push('/'))
        }}>Sign out</button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
))


export default class Main extends Component {
    loadFriendProductsCallback = (user) => {
        alert(user);
//    this.props.setImageList(user);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1>My Garage</h1>
                    <AuthButton/>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/my-unPublished">My unPublished</NavLink></li>
                        <li><NavLink to="/create-stuff">Publish More</NavLink></li>
                    </ul>
                    <div className="content">
                        <div className="mainContent">
                            <PrivateRoute exact path="/" component={MyStuffList}/>
                            <PrivateRoute path="/my-published" component={MyStuffList}/>
                            <PrivateRoute path="/my-unPublished" component={MyStuffList}/>
                            <PrivateRoute path="/create-stuff" component={CreateStuff}/>
                            <PrivateRoute path="/update-stuff/:id" component={UpdateStuff}/>
                            <PrivateRoute path="/my-stuff/:id" component={MyStuffItemDetail}/>
                            <PrivateRoute path="/my-friends/:id/products" component={MyFriendsStuffList}/>
                            <Route path="/signup" component={SignUp}/>
                            <Route path="/signin" component={SignIn}/>
                        </div>

                        {/*<FriendList loadFriendProductsCallback={this.loadFriendProductsCallback}/>*/}
                        <FriendList />

                    </div>
                </div>
            </BrowserRouter>
        );
    }
}