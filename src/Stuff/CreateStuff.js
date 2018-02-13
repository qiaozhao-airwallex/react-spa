import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import MultipleImageUpload from '../Image/MultipleImageUpload'
import {productBackendURL} from '../Config/Config'

export default class CreateStuff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: null,
            description: null,
            imageList: [],
            published: null,
            changeSaved: false,
            error: null,
        }
    }

    updateImageListCallback = (imageList) => {
        this.setState({
            imageList: imageList
        });
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleSaveForLater = (e) => {
        this.setState({
            published: false,
            changeSaved: true,
        }, function() {
            this.saveToServer();
        });
    }

    handleDiscard = (e) => {
        this.setState({
            published: false,
            changeSaved: false,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            published: true,
            changeSaved: true,
        }, function() {
            this.saveToServer();
        });
    }

    saveToServer = () => {
        let payload = {
            subject: this.state.subject,
            description: this.state.description,
            imageList: this.state.imageList,
            published: this.state.published,
        };

        fetch(productBackendURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    return response.json();
                } else {
                    return response.text();
                }
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
                <Form className="col-6">
                    <FormGroup>
                        <Label for="subject">Subject</Label>
                        <Input type="text" name="subject" id="subject" placeholder="subject"  onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" id="description"  onChange={this.onChange}/>
                    </FormGroup>
                    <MultipleImageUpload imageList={this.state.imageList}
                                         setImageList={this.updateImageListCallback}
                                         changeSaved={this.state.changeSaved} />
                    <Button color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
                    <Button color="info" onClick={this.handleSaveForLater}>Save for later</Button>{' '}
                    <Button color="danger" onClick={this.handleDiscard}>Discard</Button>{' '}
                </Form>
            </div>
        );
    }
}