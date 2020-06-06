import './scss/style.scss';
import Potatoes from './img/potatoes.jpg';

import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            msg: ""
        };
    }

    componentDidMount() {
        // Get message from the API endpoint
        fetch("/api/v1/hello").then((response) => {
            return response.json();
        }).then(data => {
            this.setState({
                loading: false,
                msg: data.msg
            });
        });
    }

    render() {
        return (
            <div className="content">
                <div className="bar top"></div>
                <div className="text">
                    <img className="photo" src={Potatoes} alt="Potatoes"></img>

                    <h1>Hello World!</h1>
                    <p>This is a simple sample template.</p>

                    {(this.state.loading) ? (
                        <p>Loading...</p>
                    ) : (
                        <p>We got the following msg from the server: <i>{this.state.msg}</i></p>
                    )}
                </div>
                <div className="bar bottom"></div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
