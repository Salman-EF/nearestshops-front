import React,{ Component } from "react";

class Distance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            distance: 2
        }
    }
    distanceHandler = (e) => {
        this.setState({
            distance: e.target.value
        })
        this.props.distanceHandler(this.state.distance)
    }

    render() {
        return (
            <select className="browser-default custom-select pointer" onChange={this.distanceHandler} value={this.state.distance}>
                <option value="2">2 kilometers</option>
                <option value="5">5 kilometers</option>
                <option value="10">10 kilometers</option>
                <option value="25">25 kilometers</option>
                <option value="100">100 kilometers</option>
            </select>
        )
    }
}

export default Distance