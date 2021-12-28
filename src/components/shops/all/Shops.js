import React,{ Component } from "react";
import {withRouter} from 'react-router-dom'
import {MDBContainer,MDBRow,MDBCol, Card, CardBody, CardImage, CardTitle} from "mdbreact";
import Distance from './Distance'
import ShopBtns from './ShopBtns'
import { SHOPS_NEAREST, ACCESS_TOKEN } from "../../constants";

class Shops extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tracking: false,
            shops: [],
            position: { lat: null, lon:null },
            distance : 2,
            isLoading : false
        }
    }
    refreshAllShops = () => {
        this.setState({isLoading: true});
        let token = localStorage.getItem(ACCESS_TOKEN), origin = this,
        latitude = this.state.position.lat, longitude = this.state.position.lon, distance = this.state.distance,
        params = '?lat='+latitude+'&lon='+longitude+'&distance='+distance
        if (latitude!==null) {
            fetch(SHOPS_NEAREST + params,{
                method: "GET",
                headers: { "Authorization": token },
                mode: 'no-cors',
            }).then(response => response.json())
            .then(data => {
                origin.setState({shops: data, isLoading: false})
            })
        }
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(locatingSuccessed,locatingFailed)
        let origin=this
        function locatingSuccessed(userPosition) {
            origin.setState({ tracking: true })
            let position = {lat:userPosition.coords.latitude,lon:userPosition.coords.longitude}
            origin.setState({ position })
            origin.refreshAllShops()
        }
        function locatingFailed(err) {
            origin.setState({ tracking: false })
        }
    }
    distanceHandler = (distance) => {
        this.setState({
            distance
        }, () => { this.refreshAllShops() })
    }
    updateShopsList = (filteredShops) => {
        this.setState({
            shops: filteredShops
        })
    }

    render() {
        return (
            <MDBContainer id="displayShopsSection">
                <MDBRow className="justify-content-center">
                {
                this.state.tracking ? (
                <MDBCol md="12">
                <Distance distanceHandler={this.distanceHandler} />
                {
                /* Print Loading... till data fetched */
                this.state.isLoading ? (
                    <div className="container">
                        <h3>Loading...</h3>
                    </div>
                ) : (
                    this.state.shops.length ? (
                    <MDBRow className="justify-content-center">
                        <MDBRow className="py-3">
                            <h4>Matkhafch..!! We found
                                <span className="font-weight-bold text-success"> {this.state.shops.length} </span>Shops for You
                            </h4>
                        </MDBRow>
                        <MDBRow>
                        {this.state.shops.map(shop => {
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
                                    <ShopBtns shop={shop.id} shops={this.state.shops} 
                                                updateShopsList={this.updateShopsList} />
                                </CardBody>
                            </Card>
                            </MDBCol>
                            )
                        })}
                        </MDBRow>
                    </MDBRow>
                    ) : (
                    <MDBRow className="justify-content-center py-3">
                        <h3>Sorry, There is no store within this distance</h3>
                    </MDBRow>
                    )
                )}
                </MDBCol>
                ) : (
                <MDBContainer id="displayShopsSection">
                    <MDBRow className="justify-content-center py-5">
                        <h3 className="w-100">Make sure to allow your location for the application to work properly</h3>
                    </MDBRow>
                </MDBContainer>
                )
                }
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default withRouter(Shops)