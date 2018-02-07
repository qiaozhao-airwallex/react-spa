import React, {Component} from "react";
import {
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import MyStuffList from "./Stuff/MyStuffList";
import MyStuffItemDetail from "./Stuff/MyStuffItemDetail";
import CreateStuff from "./Stuff/CreateStuff";
import UpdateStuff from "./Stuff/UpdateStuff";

export default class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1>My Garage</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/my-published">My Published</NavLink></li>
                        <li><NavLink to="/my-unPublished">My unPublished</NavLink></li>
                        <li><NavLink to="/create-stuff">Publish More</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/my-published" component={MyStuffList}/>
                        <Route path="/my-unPublished" component={MyStuffList}/>
                        <Route path="/create-stuff" component={CreateStuff}/>
                        <Route path="/update-stuff/:id" component={UpdateStuff}/>
                        <Route path="/my-stuff/:id" component={MyStuffItemDetail}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}