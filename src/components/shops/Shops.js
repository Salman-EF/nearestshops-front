import React,{ Component } from "react";
import {MDBContainer,MDBRow,MDBCol,MDBBtn, Card, CardBody, CardImage, CardTitle} from "mdbreact";
import Distance from './Distance'

class Shops extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shops: [],
            position: { lat: null, lon:null },
            distance : 2,
            isLoading : false
        }
    }
    refreshAllShops = () => {
    }
    componentDidMount(){
    }
    componentDidUpdate(prevProps){
    }

    render() {
        return (
            <MDBContainer id="displayShopsSection">
                <MDBRow className="justify-content-center m-4">
                    <p className="h6 pt-2">Distance from your location:</p>
                    <MDBCol md="2">
                        <Distance distanceHandler={this.distanceHandler} />
                    </MDBCol>
                </MDBRow>
                <MDBRow className="justify-content-center">
                {
                /* Print Loading... till data fetched */
                this.state.isLoading ? (
                    <div className="container">
                        <h3>Loading...</h3>
                    </div>
                ) : (
                this.state.shops.length ? (
                    this.state.shops.map(shop => {
                        return (
                            <MDBCol md="3" className="my-4" key={shop.id}>
                            <Card>
                                <CardBody>
                                    <CardTitle>{shop.name}</CardTitle>
                                    <CardImage style={{width:150}}
                                        className="img-fluid m-auto"
                                        src={shop.picture}
                                        waves
                                    />
                                <MDBRow className="justify-content-center">
                                    <MDBBtn color="danger">Dislike</MDBBtn>
                                    <MDBBtn color="success">Like</MDBBtn>
                                </MDBRow>
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

export default Shops