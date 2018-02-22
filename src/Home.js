import React, { Component } from 'react';
import { Button} from 'reactstrap';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    A company’s homepage is often the first point of contact a consumer has with a company, and as such, is the single most important page on most websites. Users think of the homepage as the hotel lobby: They don’t want to linger there, they want to go to the bar, the restaurant or find their room. As a jumping off point, a company's homepage should be well designed, easy to navigate and packed with informative content that leads the “guest” deeper into the site.
                </div>
                <Button color="primary">Sign In</Button>{' '}
            </div>
        );
    }
}