import React from 'react';
import { Button } from 'reactstrap';
import ProgressBar from './ProgressBar';
export default class MultipleImagePreviewDisplay extends React.Component {

    handleRemove = (item, e) => {
        e.preventDefault();
        this.props.removeImage(item);
    }

    render() {
        return (
            <div className="imgPreviewComponent">
                {this.props.imageList.map((item, i) => {
                    let $progressBar = null;
                    if (item.id === 'tmp') {
                        $progressBar = (<ProgressBar
                            completed={this.props.imageUploadProgress}/>)
                    }
                    return (
                    <div key={i} className="imgPreviewContainer">
                        <img className="imgPreview" alt="loading..." src={item.imagePreviewUrl}/>
                        {$progressBar}
                        <div className="imgRemove">
                            <Button outline color="danger" className="fa fa-trash" onClick={(e) => this.handleRemove(item, e)}></Button>
                        </div>
                    </div>
                    )
                })}
            </div>
        )
    }
}