import React from 'react';
import MultipleImagePreviewDisplay from './MultipleImagePreviewDisplay'
import './Image.css'
import {postImageToServer} from './ImageUploadHelper'

export default class MultipleImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageList: [
            ]
        };
    }

    uploadImageToServer(e) {
        e.preventDefault();
        postImageToServer(e.target.files[0], (serverFileName) => {
            this.setState({
                imageList: this.state.imageList.concat([
                    {
                        imagePreviewUrl: serverFileName
                    }
                ])
            });
        });
    }

    render() {
        return (
            <div className="imgPreviewComponent">
                    <input className="fileInput"
                           type="file"
                           onChange={(e)=>this.uploadImageToServer(e)} />
                <MultipleImagePreviewDisplay imageList={this.state.imageList}/>
            </div>
        )
    }
}