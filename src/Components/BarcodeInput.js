import React, { useEffect, useState } from "react";
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
import environment from "../Environment/Environment";
import localLangData from "../LanguageAsset/evo_lang.json";
import "react-touch-screen-keyboard/lib/Keyboard.css";
import ClockLoader from "react-spinners/ClockLoader";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


const BarcodeInput = (props) => {

   /*** NAVIGATION HISTORY ***/
   const navigate = useNavigate();

  /*** PAGE STATES ***/
  const [showHomeIcon, setshowHomeIcon] = useState(false);
  const [shownCancelScreen, setshownCancelScreen] = useState(false);
  const [barcodeInputValue, setbarcodeInputValue] = useState('');
  const [showError, setshowError] = useState(false);

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


  // componentWillReceiveProps(nextProps) {
  //   var tempComingFrom = this.props.location.state.comingFrom;
  //   if (nextProps.auftrag_data) {
  //     if (nextProps.auftrag_data.status === 200) {
  //       if (nextProps.auftrag_data.data.hasOwnProperty("details")) {
  //         this.setState({
  //           showError: true
  //         })
  //       } else {
  //         nextProps.auftrag_data.data.booking[0].dispatch_status_entries.map((item) => {
  //           if (item.qualifier === 'dispatch.status.registration') {
  //             if (item.value === null) {
  //               this.setState({
  //                 showError: false
  //               })
  //               // this.props.history.push("Wastetype", {
  //               //   state: {
  //               //     authToken: this.props.location.state.state.authToken,
  //               //     auftragData: nextProps.auftrag_data.data,
  //               //     barcode: this.state.barcodeInputValue
  //               //   },
  //               // });

  //               this.props.history.push("LicensePlate", {
  //                 state: {
  //                   authToken: this.props.location.state.state.authToken,
  //                   auftragData: nextProps.auftrag_data.data,
  //                   barcode: this.state.barcodeInputValue
  //                 },
  //               });

  //             } else {
  //               this.setState({
  //                 showError: true
  //               })
  //             }
  //           }
  //         })
  //       }
  //     } else {
  //       if (!nextProps.isAuftragDataLoading) {
  //         this.setState({
  //           showError: true
  //         })
  //       }
  //     }
  //   }

  //   if (nextProps.first_weight_data) {
  //     this.props.history.push("TruckType", {
  //       state: {
  //         authToken: this.props.location.state.state.authToken,
  //         first_weight_data: nextProps.first_weight_data.data,
  //         comingFrom: tempComingFrom,
  //       },
  //     });
  //   }
  // }

  const gotoHome = () => {
    navigate("/Home");
  }

  const gotoBack = () => {
    navigate(-1);
  }

  const gotoNext = () => {
    if (barcodeInputValue === "") {
      document.getElementById("barcodeinput").style.border = "1px solid red";
    } else {
      // var tempComingFrom = this.props.location.state.comingFrom;
      localStorage.setItem(
        "barcodeValue",
        barcodeInputValue
      );
      navigate('/LicensePlate');
     // getOrderDetails();
      // switch (tempComingFrom.toLowerCase()) {
      //   case "annahmeabfallacceptancehome":
      //     this.props.get_firstweight_data(
      //       this.state.barcodeInputValue,
      //       this.props.location.state.state.authToken
      //     );
      //     break;
      //   case "":
      //     this.getOrderDetails();
      //     break;
      // }
    }
  }

  const keyboardTapInputMethod = (e) => {
    var tempBarcodeValue = barcodeInputValue;
    if (e === "<-") {
      tempBarcodeValue = tempBarcodeValue.slice(0, -1);
    } else if (e === "SPACE") {
      tempBarcodeValue = tempBarcodeValue + " ";
    } else {
      tempBarcodeValue = tempBarcodeValue + e;
    }
    document.getElementById("barcodeinput").style.border = "1px solid #000947";
    setshowError(false);
    setbarcodeInputValue(tempBarcodeValue);
    // this.setState({
    //   showError: false,
    //   barcodeInputValue: tempBarcodeValue,
    // });
  }

  const getOrderDetails = () => {
    var tempAuftragData = {
      client_id: environment.client_id,
      password: environment.password,
      user_id: environment.user_id,
      order_id: barcodeInputValue,
      auth_token: ''
    };
    // this.props.get_Auftrag_data(tempAuftragData);
  }


  const keyOneLine = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'];
  const keyTwoLine = ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', '<-'];
  const keyThreeLine = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ä', 'Ö'];
  const keyFourLine = ['Y', 'X', 'C', 'V', 'B', 'N', 'M', 'Ü', '.', 'SPACE'];
  const override = css`
      display: block;
      margin: 0 auto;
      margintop: 100;
      border-color: red;
    `;
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
            <div style={{ marginLeft: '30px' }} onClick={() => gotoHome()}>
              <img width={80} height={80} src={HomeIcon} />
            </div>
          </Col>
          <Col xs={7}>
            <div style={{
              width: '250px',
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'center'
            }}>
              <h1 style={{ color: '#020b44', marginTop: '10px' }}>Enter Manually</h1>
              <hr style={{ color: '#020b44', opacity: '1', width: '590px', marginLeft: '-175px' }} />
            </div>
          </Col>
          <Col >
            <div style={{ marginRight: '42px' }}>
              <img width={150} height={70} src={appLogo} />
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: "20px" }}>
          <Col xs={1}></Col>
          <Col xs={8}>
            {/* <label
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "#000947",
                marginLeft: "20px",
              }}
            >
              {
                localLangData[localStorage.getItem("lang")]
                  .enterbarcode_label1
              }
            </label> */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
              }}
            >
              {/* <label
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#000947",
                    marginLeft: "20px",
                    marginTop: "14px",
                  }}
                >
                  {
                    localLangData[localStorage.getItem("lang")]
                      .enterbarcode_barcode
                  }
                </label> */}
              <input
                autoFocus
                id="barcodeinput"
                style={{
                  textAlign: "center",
                  marginLeft: "100px",
                  width: "85%",
                  height: "60px",
                  borderRadius:'10px',
                  border: "1px solid #000947",
                  fontSize: "40px",
                }}
                value={barcodeInputValue}
              />
            </div>
          </Col>
          <Col></Col>
          {/* <Col>
              <img
                width={150}
                height={150}
                style={{ border: "5px solid black" }}
                src={imageReader}
              />
            </Col> */}
        </Row>
        {showError ? <Row>
          <label
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "red",
              marginLeft: "220px",
              marginTop: "14px",
            }}
          >
            {
              //  this.props.auftrag_data.data.details || 
              localLangData[localStorage.getItem("lang")]
                .orderidRegistered
            }
          </label>
        </Row> : null}
        <Row>
          <Col xs={1}></Col>
          {/* <Col xs={5}>
            <label style={{ fontSize: '14px', fontWeight: 'regular', color: '#000947', marginLeft: '20px' }} >{localLangData[localStorage.getItem('lang')].enterbarcode_barcode}</label>
          </Col> */}
          <Col></Col>
        </Row>
        {false ? (
          <div style={{ marginTop: "30px" }}>
            <ClockLoader
              color={"#000947"}
              loading={true}
              css={override}
              size={50}
              id="loaderone"
            />
            <label
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                color: "#000947",
                marginLeft: "280px",
                marginTop: "25px",
              }}
            >
              {localLangData[localStorage.getItem("lang")]
                .fetching_oder_details + "..."}
            </label>
          </div>
        ) : (
          <div>
            <Row style={{ marginTop: '20px' }}>
              {keyOneLine.map((value, index) => {
                return (
                  <Col style={{ marginLeft: index > 0 ? '-20px' : '0' }} onClick={(e) => keyboardTapInputMethod(value)}>
                    <div style={{
                      border: '1px solid black',
                      borderRadius: '4px',
                      width: '80px',
                      height: '80px',
                      textAlign: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#000947',
                    }}>{value}</div>
                  </Col>
                )
              })}
            </Row>
            <Row style={{ marginTop: '10px' }}>
              {keyTwoLine.map((value, index) => {
                return (
                  <Col style={{ marginLeft: index > 0 ? '-20px' : '0' }} onClick={(e) => keyboardTapInputMethod(value)}>
                    <div style={{
                      border: '1px solid black',
                      borderRadius: '4px',
                      width: '80px',
                      height: '80px',
                      textAlign: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#000947',
                    }}>{value}</div>
                  </Col>
                )
              })}
            </Row>
            <Row style={{ marginTop: '10px' }}>
              {keyThreeLine.map((value, index) => {
                return (
                  <Col style={{ marginLeft: index > 0 ? '-20px' : '0' }} onClick={(e) => keyboardTapInputMethod(value)}>
                    <div style={{
                      border: '1px solid black',
                      borderRadius: '4px',
                      width: '80px',
                      height: '80px',
                      textAlign: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#000947',
                    }}>{value}</div>
                  </Col>
                )
              })}
            </Row>
            <Row style={{ marginTop: '10px' }}>
              {keyFourLine.map((value, index) => {
                return (
                  <Col style={{ marginLeft: index > 0 ? '-20px' : '0' }} onClick={(e) => keyboardTapInputMethod(value)}>
                    <div style={{
                      border: '1px solid black',
                      borderRadius: '4px',
                      width: '80px',
                      minWidth: value === 'SPACE' ? '160px' : 0,
                      height: '80px',
                      textAlign: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#000947',
                    }}>{value}</div>
                  </Col>
                )
              })}
            </Row>
            {/* <Row style={{ marginTop: '10px' }}>
              {keyFiveLine.map((value, index) => {
                  return (
                    <Col
                      style={{ marginLeft: index === 0 ? "245px" : "-300px" }}
                      onClick={(e) => keyboardTapInputMethod(value)}
                    >
                      <div
                        style={{
                          border: "1px solid black",
                          borderRadius: "4px",
                          width: "80px",
                          height: "80px",
                          textAlign: "center",
                          justifyContent: "center",
                          display: "flex",
                          fontSize: "50px",
                          alignItems: "center",
                          color: "#000947",
                        }}
                      >
                        {value}
                      </div>
                    </Col>
                  );
                })}
              </Row> */}
          </div>
        )}
      </Container>
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
          <div
            style={{ marginRight: "30px", float: "right" }}
            onClick={() => gotoNext()}
          >
            <img width={80} height={80} src={nextIcon} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default BarcodeInput;
