import React,{ Component } from "react";
import {MDBRow,MDBBtn} from "mdbreact";

class ShopBtns extends Component {
    state = {
        shop: {id:this.props.shop},
        shops: this.props.shops
    }
    likeShop = () =>{
    }
    render() {
        return (
            <MDBRow className="justify-content-center">
                <MDBBtn color="danger">Dislike</MDBBtn>
                <MDBBtn color="success" onClick={this.likeShop}>Like</MDBBtn>
            </MDBRow>
        )
    }
}

export default ShopBtns