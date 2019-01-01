import React,{ Component } from "react";
import {MDBContainer,MDBRow,MDBCol, Card, CardBody, CardImage, CardTitle} from "mdbreact";
import Distance from './Distance'
import ShopBtns from './ShopBtns'

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
      this.setState({isLoading: true});
      let token = localStorage.getItem('ACCESS_TOKEN'), origin = this,
      latitude = this.state.position.lat, longitude = this.state.position.lon, distance = this.state.distance,
      request = 'http://localhost:8080/api/shops/nearest?lat='+latitude+'&lon='+longitude+'&distance='+distance
      fetch(request,{
        method: "GET",
        headers: { "Authorization": token }
      }).then(response => response.json())
        .then(data => {
          origin.setState({shops: data, isLoading: false})
        })
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(locatingSuccessed,locatingFailed)
        let origin=this
        function locatingSuccessed(userPosition) {
            let position = {lat:userPosition.coords.latitude,lon:userPosition.coords.longitude}
            origin.setState({
                position
            })
            origin.refreshAllShops()
        }
        function locatingFailed(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        }
    }
    componentDidUpdate(prevProps){
        if (this.props!==prevProps) {
            this.refreshAllShops()
        }
    }
    distanceHandler = (distance) => {
        this.setState({
            distance
        }, () => { this.refreshAllShops() })
    }
    updateShopsList = (shopsUpdated) => {
        this.setState({
            shops: shopsUpdated
        })
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
                                    <CardImage
                                        className="img-fluid m-auto"
                                        src={shop.picture}
                                        waves
                                    />
                                    <ShopBtns shop={shop.id} shops={this.state.shops} updateShopsList={this.updateShopsList} />
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