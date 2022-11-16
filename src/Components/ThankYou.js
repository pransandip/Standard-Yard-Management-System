import React, { Component, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EvoLogo from "../ImageAssests/Logo/evo.png";
import appLogo from "../ImageAssests/Logo/Logo.png";
import HomeIcon from "../ImageAssests/ButtonImages/Home.png";
import backIcon from "../ImageAssests/ButtonImages/BackArrow.png";
import nextIcon from "../ImageAssests/ButtonImages/NextArrow.png";
import imageReader from "../ImageAssests/ButtonImages/reader.jpeg";
import "../StyleSheets/HomePage.css";
import localLangData from "../LanguageAsset/evo_lang.json";
import "react-touch-screen-keyboard/lib/Keyboard.css";
import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import environment from "../Environment/Environment";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const ThankYou = (props) => {

    /*** NAVIGATION HISTORY ***/
    const navigate = useNavigate();

    /*** PAGE STATES ***/
    const [showHomeIcon, setshowHomeIcon] = useState(false);
    const [shownCancelScreen, setshownCancelScreen] = useState(false);
    const [barcodeInputValue, setbarcodeInputValue] = useState('');
    const [showError, setshowError] = useState(false);
    const [scanImage, setscanImage] = useState("");
    const [licencePlateNumber, setlicencePlateNumber] = useState("");
    const [socketError, setsocketError] = useState(false);

    const notify = () =>
        toast.info(localLangData[localStorage.getItem("lang")].call_operator_text, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    useEffect(() => {
        let socket = new WebSocket(environment.DEVICE_MANAGER_IP);
        socket.onopen = function (e) {
            // socket.send("GET IMAGE0");
            socket.send("GET WEIGHT0");
        };
        var tempData = "";
        socket.onmessage = function (event) {
            var tempData = event.data !== 'Connected' ? JSON.parse(event.data) : event.data;
            if (event.data !== 'Connected') {
                if (tempData.msg_type === "image") {
                    setscanImage(tempData);
                } else {
                    if (tempData.state !== 'bad') {
                        setlicencePlateNumber(tempData.license_plate);
                    } else {
                        // this.setState({
                        //   licencePlateNumber: '',
                        // });
                    }
                }
            }
        }.bind(this);

        socket.onerror = function (event) {
            setsocketError(true);
            setlicencePlateNumber("");
        }.bind(this);
    }, [])


    const gotoHome = () => {
        navigate("/Home");
    }

    const gotoBack = () => {
        navigate(-1);
    }

    const gotoNext = () => {
        localStorage.setItem("licenseValue", licencePlateNumber);
        if (licencePlateNumber === "") {
            document.getElementById("barcodeinput").style.border = "1px solid red";
        } else {
            navigate("/NameComponent", {
                state: {
                    authToken: this.props.location.state.state.authToken,
                    auftragData: this.props.location.state.state.auftragData,
                    licencePlateNumber: this.state.licencePlateNumber,
                },
            });
        }
    }

    var image = new Image();
    image.src = "data:image/png;base64," + scanImage.image_data;
    return (
        <div
            style={{
                overflow: "hidden",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                KhtmlUserSelect: "none",
                MozUserSelect: "nonoe",
                msUserSelect: "none",
                userSelect: "none",
            }}
        >
            <Container style={{ height: "660px" }}>
                <Row style={{ marginTop: "10px" }}></Row>
                <Row style={{ marginTop: '30px' }}>
                    <Col >
                        {/* <div style={{ marginLeft: '30px' }} onClick={() => gotoHome()}>
                            <img width={80} height={80} src={HomeIcon} />
                        </div> */}
                    </Col>
                    <Col xs={7}>
                        {/* <div style={{
              width: '250px',
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'center'
            }}>
              <h1 style={{ color: '#020b44', marginTop: '10px' }}>Erstwiegung</h1>
              <hr style={{ color: '#020b44', opacity: '1', width: '590px', marginLeft: '-175px' }} />
            </div> */}
                    </Col>
                    <Col >
                        <div style={{ marginRight: '42px' }}>
                            <img width={150} height={70} src={appLogo} />
                        </div>
                    </Col>
                </Row>
                {/* {this.state.scanImage !== "" && this.state.scanImage !== undefined ? ( */}
                <div>
                    <Row style={{ marginTop: "20px" }}>
                        <Col xs={1}></Col>
                        <Col xs={10}>
                            <div style={{
                                width: '250px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                textAlign: 'center'
                            }}>
                                <div
                                style={{backgroundColor:'#020b44', height:'100px', width:'270px', borderRadius:'10px'}}
                                >
                                    <h1 style={{ color: '#FFFFFF', paddingTop: '30px' }}>Thank You</h1>
                                </div>
                                
                            </div>
                        </Col>
                        {/* <Col>
                  <img
                    width={280}
                    height={150}
                    style={{ border: "5px solid black", marginLeft: "-65px" }}
                    src={
                      "data:image/png;base64," + this.state.scanImage.image_data
                    }
                  />
                </Col> */}
                    </Row>
                    <Row>
                        <Col xs={1}>

                        </Col>
                        <Col xs={10}>
                        <div style={{
                                width: '100%',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                textAlign: 'center'
                            }}>
                            <label style={{ fontSize: '35px', fontWeight: 'regular', color: '#000947', marginLeft: '18px', marginTop:'20px' }} >
                                {"Please remove the yardticket and leave the scales."}
                            </label>
                            </div>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </div>
            </Container>
            {/* {this.state.scanImage !== "" && this.state.scanImage !== undefined ? ( */}
            <Row>
                <Col xs={4}>
                    <div style={{ marginLeft: "30px" }}>
                        <img
                            width={80}
                            height={80}
                            src={backIcon}
                            onClick={() => gotoBack()}
                        />
                    </div>
                </Col>
                <Col xs={4}>
                    {/* <div style={{ marginLeft: "145px" }}>
                <img
                  width={64}
                  height={64}
                  src={`${process.env.PUBLIC_URL}/assets/phone-call.png`}
                  onClick={() => this.notify()}
                />
              </div> */}
                </Col>
                <Col xs={4}>
                    <div style={{ marginRight: "30px", float: "right" }}>
                        <img
                            width={80}
                            height={80}
                            src={nextIcon}
                            onClick={() => gotoNext()}
                        />
                    </div>
                </Col>
            </Row>
            {/* ) : null} */}
        </div>
    );
}

export default ThankYou;
