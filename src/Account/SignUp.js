import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import {userBackendURL} from "../Config/Config";
import {httpRequestWithToken} from "../Utils/HttpWrapper";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            username: this.state.username,
            password: this.state.password,
        };

        httpRequestWithToken({
            method: 'post',
            url: userBackendURL,
            data: JSON.stringify(payload)
        }, (response) => {
            alert("User created successfully")
        });
    }

    render() {
        return (
            <div>
                <Form className="col-6">
                    <FormGroup>
                        <Input type="username" name="username" id="username" placeholder="Email Address"  onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" id="password" placeholder="New Password"  onChange={this.onChange}/>
                    </FormGroup>
                    <Button color="primary" onClick={this.handleSubmit}>Create Account</Button>{' '}
                </Form>
            </div>
        );
    }
}