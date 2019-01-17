import React,{ Component } from "react";
import {MDBRow,MDBBtn} from "mdbreact";
import { SHOPS_PREFERRED, ACCESS_TOKEN } from "../../constants";

class RemoveShop extends Component {
    state = {
        shop: {id:this.props.shop},
        shops: this.props.shops
    }
    removeShop = () =>{
        let token = localStorage.getItem(ACCESS_TOKEN), origin = this
        fetch(SHOPS_PREFERRED,{
          method: "DELETE",
          headers: { "Authorization": token,"Content-Type": "application/json" },
          body: JSON.stringify(this.state.shop)
        }).then(response => response.json())
          .then(data => {
            origin.props.updateShopsList(data)
          })
    }
    render() {
        return (
            <MDBRow className="justify-content-center">
                <MDBBtn color="danger" onClick={this.removeShop}>Remove</MDBBtn>
            </MDBRow>
        )
    }
}

export default RemoveShop