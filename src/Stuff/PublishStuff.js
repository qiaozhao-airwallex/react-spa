import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageUpload from '../Image/ImageUpload'

export default class PublishStuff extends Component {

    render() {
        return (
            <div>
                <Form className="col-6">
                    <FormGroup>
                        <Label for="shortDescription">Short Description</Label>
                        <Input type="text" name="shortDescription" id="shortDescription" placeholder="Short description" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="detail">Detail</Label>
                        <Input type="textarea" name="detail" id="detail" />
                    </FormGroup>
                    <ImageUpload/>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}