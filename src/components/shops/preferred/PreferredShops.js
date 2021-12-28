import React,{ Component } from "react";
import { withRouter } from 'react-router-dom'
import {MDBContainer,MDBRow,MDBCol, Card, CardBody, CardImage, CardTitle} from "mdbreact";
import RemoveShop from './RemoveShop'
import { SHOPS_PREFERRED, ACCESS_TOKEN } from "../../constants";

class PreferredShops extends Component {
    constructor(props) {
        super(props)
        this.state = {
            preferredShops: [],
            isLoading : false
        }
    }
    refreshPreferredShops = () => {
      this.setState({isLoading: true});
      let token = localStorage.getItem(ACCESS_TOKEN), origin = this
      fetch(SHOPS_PREFERRED,{
          method: "GET",
          headers: { "Authorization": token },
          mode: 'no-cors',
        }).then(response => response.json())
          .then(data => {
            origin.setState({preferredShops: data, isLoading: false})
          })
    }
    componentDidMount(){ this.refreshPreferredShops() }
    updateShopsList = (preferredShopsUpdated) => {
        this.setState({
            preferredShops: preferredShopsUpdated
        })
    }

    render() {
        return (
            <MDBContainer id="displayShopsSection">
                <MDBRow className="justify-content-center">
                {
                /* Print Loading... till data fetched */
                this.state.isLoading ? (
                    <div className="container">
                        <h3>Loading...</h3>
                    </div>
                ) : (
                this.state.preferredShops.length ? (
                    this.state.preferredShops.map(shop => {
                        return (
                            <MDBCol md="3" className="my-4" key={shop.id}>
                            <Card>
                                <CardBody>
                                    <CardTitle>{shop.name}</CardTitle>
                                    <CardImage
                                        className="img-fluid m-auto shop-img"
                                        src={shop.picture} alt={shop.name+' image'}
                                        waves
                                    />
                                    <RemoveShop shop={shop.id} shops={this.state.preferredShops} updateShopsList={this.updateShopsList} />
                                </CardBody>
                            </Card>
                            </MDBCol>
                        )
                        })
                        ) : (
                            <MDBRow className="py-3">
                                <h3>There is no preferred store saved</h3>
                            </MDBRow>
                        )
                )
                }
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default withRouter(PreferredShops)