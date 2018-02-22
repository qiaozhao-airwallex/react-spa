import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import {oauthTokenBackendURL} from "../Config/Config";
import {
    Redirect
} from "react-router-dom";
import {authentication} from "../Utils/Authentication";
import {httpRequest} from '../Utils/HttpWrapper';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'peter@example.com',
            password: 'password'
        }
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        httpRequest({
            method: 'post',
            url: oauthTokenBackendURL,
            params: {
                grant_type: 'password',
                username: this.state.username,
                password: this.state.password
            },
            auth: {
                username: 'gigy',
                password: 'secret'
            }
        }, (response) => {
            if (response.status === 200) {
                authentication.authenticate(
                    JSON.stringify({
                        user: this.state.username,
                        data: response.data
                    }));
            } else {
                throw new Error("Fail to authenticate");
            }
            this.forceUpdate();
        })
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        if (authentication.isAuthenticated()) {
            return <Redirect to={from} />
        }

        return (
            <div>
                <Form className="col-6" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input type="username" name="username" id="username" placeholder="Email Address" value={this.state.username} onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
                    </FormGroup>
                    <Button color="primary">Sign In</Button>{' '}
                </Form>
            </div>
        );
    }
}
