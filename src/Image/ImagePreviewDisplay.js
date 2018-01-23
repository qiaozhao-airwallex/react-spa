import React from 'react';

const backendURL = "http://localhost:8080/image/"

export default class ImagePreviewDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="imgPreviewComponent">
                {this.props.imageList.map((item, i) => {
                    return (
                    <div key={i} className="imgPreviewContainer">
                        <img className="imgPreview" alt="preview" src={backendURL + item.imagePreviewUrl}/>
                    </div>
                    )
                })}
            </div>
        )
    }
}