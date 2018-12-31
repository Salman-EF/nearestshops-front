import React,{ Component } from "react";
import {MDBContainer,MDBRow,MDBCol,MDBSelect,MDBSelectInput,MDBSelectOptions,MDBSelectOption,MDBCard,MDBCardBody,MDBCardHeader} from "mdbreact";

class Shops extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tracking: true,
            shops: [],
            position: {
                lat: null, long:null
            },
            distance: 2,
            isLoading : false
        }
    }
    refreshAllShops() {
    }
    componentDidMount() {this.refreshAllShops()}
    componentDidUpdate(prevProps) {
      if(this.props!==prevProps) this.refreshAllShops()
    }
    distanceHandler = (e) => {
    }

    render() {
        return (
            <MDBContainer id="displayShopsSection">
                <MDBRow className="justify-content-center m-4">
                    <p className="h6 pt-2">Distance from your location:</p>
                    <MDBCol md="2">
                        <select className="browser-default custom-select pointer" onChange={this.distanceHandler} value={this.state.distance}>
                            <option value="2">2 kilometers</option>
                            <option value="5">5 kilometers</option>
                            <option value="10">10 kilometers</option>
                            <option value="25">25 kilometers</option>
                            <option value="100">100 kilometers</option>
                        </select>
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
                            <MDBCol md="4" className="my-2" key={shop.id}>
                            <MDBCard className="card-react">
                                <MDBCardHeader>
                                    <h4>{shop.name}</h4>
                                </MDBCardHeader>
                                <MDBCardBody>
                                <hr/>
                                <p>
                                    IMG
                                </p>
                                </MDBCardBody>
                            </MDBCard>
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