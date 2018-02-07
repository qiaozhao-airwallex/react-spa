import React from 'react';
import MultipleImagePreviewDisplay from './MultipleImagePreviewDisplay'
import './Image.css'
import {postImageToServer} from './ImageUploadHelper'
import {removeImageFromServer} from './ImageUploadHelper'

export default class MultipleImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesToRemove: [],
            displayOrder: 0,
        }
    }

    componentWillUnmount() {
        if (this.props.toSave) {
            console.log("Remove Images From Server")
            this.state.imagesToRemove.map((item, i) => {
                return removeImageFromServer(item.targetFileName);
            });
        }
    }

    uploadImageToServer = (e) => {
        e.preventDefault();
        postImageToServer(e.target.files[0], (serverFileName, imagePreviewUrl) => {
            this.setState({
                displayOrder: this.state.displayOrder + 1
            }, () => {
                var data = this.props.imageList;
                data.push({
                    targetFileName: serverFileName,
                    imagePreviewUrl: imagePreviewUrl,
                    displayOrder: this.state.displayOrder,
                })
                this.props.setImageList(data);
            })
        });
    }

    removeImageCallback = (image) => {
        var data = this.props.imageList;
        var index = data.indexOf(image);
        data.splice(index, 1);
        this.props.setImageList(data);

        this.setState({
            imagesToRemove: this.state.imagesToRemove.concat(image),
        })
    }

    render() {
        return (
            <div className="imgPreviewComponent">
                    <input className="fileInput"
                           type="file"
                           onChange={(e)=>this.uploadImageToServer(e)} />
                <MultipleImagePreviewDisplay imageList={this.props.imageList} removeImage={this.removeImageCallback}/>
            </div>
        )
    }
}