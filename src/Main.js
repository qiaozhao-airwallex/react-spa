import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import MyStuff from "./Stuff/MyStuff";
import PublishStuff from "./Stuff/PublishStuff";

export default class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>My Garage</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/my-stuff">My Stuff</NavLink></li>
                        <li><NavLink to="/publish-stuff">Publish More</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/my-stuff" component={MyStuff}/>
                        <Route path="/publish-stuff" component={PublishStuff}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}