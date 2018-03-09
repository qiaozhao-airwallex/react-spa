import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import {oauthTokenBackendURL, userBackendURL} from "../Config/Config";
import {httpRequest} from "../Utils/HttpWrapper";
import {
    Link
} from "react-router-dom";
import {authentication} from "../Utils/Authentication";
import qs from "qs";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            username: null,
            password: null,
        }
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let payload = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
        };

        httpRequest({
            method: 'post',
            url: userBackendURL,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(payload)
        }, (response) => {
            httpRequest({
                method: 'post',
                url: oauthTokenBackendURL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    'grant_type': 'password',
                    'username': this.state.username,
                    'password': this.state.password
                }),
                auth: {
                    username: 'my-garage',
                }
            }, (response) => {
                if (response.status === 200) {
                    authentication.authenticate(JSON.stringify(response.data))
                } else {
                    throw new Error("Fail to authenticate");
                }
                this.props.history.push('/my-published');
            })

        });
    }

    render() {
        return (
            <div  className="loginDialog">
                <Form>
                    <FormGroup>
                        <Input type="name" name="name" id="name" placeholder="Full Name" onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="username" name="username" id="username" placeholder="Email Address" onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" id="password" placeholder="New Password" onChange={this.onChange}/>
                    </FormGroup>
                    <Button color="primary" onClick={this.handleSubmit}>Create Account</Button>{' '}
                </Form>

                <Link to ='/signin' ><Button color="info" size="lg">Sign In</Button></Link>
            </div>
        );
    }
}