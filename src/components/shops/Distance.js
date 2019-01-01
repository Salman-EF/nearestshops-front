import React from "react";
import {MDBRow,MDBCol} from "mdbreact";

const Distance = (props) => {
    function distanceHandler(e) {
        props.distanceHandler(e.target.value)
    }

    return (
        <MDBRow className="justify-content-center m-4">
            <p className="h6 pt-2">Distance from your location:</p>
            <MDBCol md="2">
                <select className="browser-default custom-select pointer" onChange={distanceHandler} defaultValue={2}>
                    <option value="2">2 kilometers</option>
                    <option value="5">5 kilometers</option>
                    <option value="10">10 kilometers</option>
                    <option value="25">25 kilometers</option>
                    <option value="100">100 kilometers</option>
                </select>
            </MDBCol>
        </MDBRow>
    )
}

export default Distance