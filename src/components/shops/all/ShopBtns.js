import React,{ Component } from "react";
import {MDBRow,MDBBtn} from "mdbreact";

class ShopBtns extends Component {
    state = {
        shop: {id:this.props.shop},
        shops: this.props.shops
    }
    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            this.setState({
                shops: this.props.shops
            })
        }
    }
    likeShop = () =>{
        let token = localStorage.getItem('ACCESS_TOKEN'), origin = this
        fetch('http://localhost:8080/api/shops/preferred',{
          method: "POST",
          headers: { "Authorization": token,"Content-Type": "application/json" },
          body: JSON.stringify(this.state.shop)
        }).then(response => response.json())
        .then(data => {
          let shops = origin.state.shops
              data.map(preferredShop => {
                  shops = shops.filter(shop => {
                      return preferredShop.id !== shop.id
                  })
                  return null
              })
          origin.props.updateShopsList(shops)
        })
    }
    dislikeShop = () =>{
        let token = localStorage.getItem('ACCESS_TOKEN'), origin = this
        fetch('http://localhost:8080/api/shops/disliked',{
          method: "POST",
          headers: { "Authorization": token,"Content-Type": "application/json" },
          body: JSON.stringify(this.state.shop)
        }).then(response => response.json())
        .then(data => {
          let shops = origin.state.shops
              data.map(dislikeShop => {
                  shops = shops.filter(shop => {
                      return dislikeShop !== shop.id
                  })
                  return null
              })
          origin.props.updateShopsList(shops)
        })
    }
    render() {
        return (
            <MDBRow className="justify-content-center">
                <MDBBtn color="danger" onClick={this.dislikeShop}>Dislike</MDBBtn>
                <MDBBtn color="success" onClick={this.likeShop}>Like</MDBBtn>
            </MDBRow>
        )
    }
}

export default ShopBtns