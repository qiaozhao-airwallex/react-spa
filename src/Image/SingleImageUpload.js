import React from 'react';
import './Image.css'
import {postImageToServer} from './ImageUploadHelper'

export default class SingleImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {
                imagePreviewUrl: null
            }
        };
    }
    uploadImageToServer(e) {
        e.preventDefault();

        postImageToServer(e.target.files[0], (serverFileName) => {
            this.setState({
                image:
                {
                    imagePreviewUrl: serverFileName
                }
            });
        });
    }

    render() {
        let $imagePreview = null;
        if (this.state.image.imagePreviewUrl) {
            $imagePreview = (<img className="imgPreview" alt="preview" src={this.state.image.imagePreviewUrl}/>);
        } else {
            $imagePreview = (<div className="previewText">Please select front image</div>);
        }
        return (
            <div className="imgPreviewComponent">
                <input className="fileInput"
                       type="file"
                       onChange={(e)=>this.uploadImageToServer(e)} />
                <div className="imgPreviewComponent">
                    <div className="imgPreviewContainer">
                        {$imagePreview}
                    </div>
                </div>
            </div>
        )
    }
}