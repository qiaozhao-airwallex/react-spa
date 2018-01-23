import React, { Component } from 'react';
import StuffItemView from './StuffItemView';

export default class MyStuff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: null,
            image: null,
            stuffList: [
                {name: 'Football', price: '49.99', image: 'https://img.alicdn.com/bao/uploaded/i3/2647558919/TB26ksEhwxlpuFjSszbXXcSVpXa_!!2647558919.jpg_640x480Q50s50.jpg_.webp', },
                {name: 'Baseball', price: '9.99', image: 'https://img.alicdn.com/bao/uploaded/i1/2694280335/TB2sKRHbHsTMeJjy1zbXXchlVXa_!!2694280335.jpg_640x480Q50s50.jpg_.webp', },
            ]
        }
    }

    render() {
        return (
            <div className="item-list">
                    {this.state.stuffList.map((item, i) => {
                        return <StuffItemView
                            key={item.image}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                        />
                    })}
            </div>
        );
    }
}
