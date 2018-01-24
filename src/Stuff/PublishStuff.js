import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import MultipleImageUpload from '../Image/MultipleImageUpload'
import SingleImageUpload from '../Image/SingleImageUpload'

export default class PublishStuff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shortDescription: null,
            detail: null,
            image: null,
        }
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        let payload = {
            name: this.state.shortDescription,
            description: this.state.detail,
            imageInfo: {
                targetFileName: ''
            }
        };

        fetch("http://localhost:8080/product", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(results => {
            return results.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error)
        });
    }

    render() {
        return (
            <div>
                <Form className="col-6" onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="shortDescription">Short Description</Label>
                        <Input type="text" name="shortDescription" id="shortDescription" placeholder="Short description"  onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="detail">Detail</Label>
                        <Input type="textarea" name="detail" id="detail"  onChange={this.onChange}/>
                    </FormGroup>
                    <SingleImageUpload />
                    <MultipleImageUpload />
                    <Button color="primary">Submit</Button>
                </Form>
            </div>
        );
    }
}