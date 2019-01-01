import React from "react";

const Distance = (props) => {
    function distanceHandler(e) {
        props.distanceHandler(e.target.value)
    }

    return (
        <select className="browser-default custom-select pointer" onChange={distanceHandler} defaultValue={2}>
            <option value="2">2 kilometers</option>
            <option value="5">5 kilometers</option>
            <option value="10">10 kilometers</option>
            <option value="25">25 kilometers</option>
            <option value="100">100 kilometers</option>
        </select>
    )
}

export default Distance