import React,{ Component } from "react";
import {MDBContainer,MDBRow,MDBCol, Card, CardBody, CardImage, CardTitle} from "mdbreact";

class PreferredShops extends Component {
    constructor(props) {
        super(props)
        this.state = {
            preferredShops: [],
            isLoading : false
        }
    }
    refreshAllShops = () => {
    }
    componentDidMount(){ origin.refreshAllShops() }
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
                                        className="img-fluid m-auto"
                                        src={shop.picture}
                                        waves
                                    />
                                    {/* <RemoveShop shop={shop.id} shops={this.state.preferredShops} updateShopsList={this.updateShopsList} /> */}
                                </CardBody>
                            </Card>
                            </MDBCol>
                        )
                        })
                        ) : (
                            <MDBRow className="py-3">
                                <h3>Sorry, There is no store within this distance</h3>
                            </MDBRow>
                        )
                )
                }
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default PreferredShops