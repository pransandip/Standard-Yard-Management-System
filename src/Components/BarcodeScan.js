import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import appLogo from '../ImageAssests/Logo/Logo.png';
import HomeIcon from '../ImageAssests/ButtonImages/Home.png';
import imageReader from '../ImageAssests/ButtonImages/reader.jpeg';
import '../StyleSheets/HomePage.css';
import localLangData from '../LanguageAsset/evo_lang.json';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



import 'react-toastify/dist/ReactToastify.css';

const BarcodeScan = (props) => {

    /*** NAVIGATION HISTORY ***/
    const navigate = useNavigate();

    /*** PAGE STATES ***/
    const [showHomeIcon, setshowHomeIcon] = useState(false);
    const [shownCancelScreen, setshownCancelScreen] = useState(false);


    const notify = () => toast.info(localLangData[localStorage.getItem('lang')].call_operator_text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const gotoBack = () => {
        navigate.goBack();
    }

    const gotoNext = () => {
        navigate('/Barcodeinput', {
            state: { authToken: '' }
        });
    }

    const gotoHome = () => {
        navigate('/Home');
    }

    return (
        <div style={{
            overflow: 'hidden',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            KhtmlUserSelect: 'none',
            MozUserSelect: 'nonoe',
            msUserSelect: 'none',
            userSelect: 'none'
        }}>
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
                        <h1 style={{ color: '#020b44', marginTop: '10px' }}>Barcode Scan</h1>
                        <hr style={{ color: '#020b44', opacity: '1', width: '590px', marginLeft: '-175px' }} />
                    </div>
                </Col>
                <Col >
                    <div style={{ marginRight: '42px' }}>
                        <img width={150} height={70} src={appLogo} />
                    </div>
                </Col>
            </Row>

            <Container style={{ background: '', height: '435px' }} >
                <Row style={{ marginTop: '80px' }}>
                    <Col xs={6}>
                        <div style={{
                            border: '2px solid gray',
                            overflow: 'hidden',
                            width: '270px',
                            height: '260px',
                            marginLeft: '30px',
                            marginRight: 'auto',
                            marginTop: '0px'
                        }}>
                            <img width={270} height={260} style={{ marginLeft: '0px' }} src={imageReader} />
                        </div>
                    </Col>
                    <Col xs={6} style={{ textAlign: 'center' }}>
                        <p style={{ alignSelf: 'center', fontSize: '25px', width: '274px', color: '#020b44' }}>Please Hold your barcode infront of the barcode-reader</p>
                        <input
                            autoFocus
                            id="barcodeinput"
                            style={{
                                textAlign: "center",
                                marginLeft: "-158px",
                                marginTop: "10px",
                                width: "95%",
                                height: "60px",
                                border: "2px solid #020b44",
                                borderRadius: '15px',
                                fontSize: "18px",
                            }}
                            value={''}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                    </Col>
                    <Col>
                        <div style={{ fontSize: '35px', color: '#020b44' }}>OR</div>
                    </Col>
                    <Col xs={5}>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}>
                    </Col>
                    <Col xs={6}>
                        <div style={{marginTop:'20px'}} >
                            <button type="button" style={{width:'380px',borderRadius:'10px', backgroundColor:'#020b44', color:'#ffffff', height:'80px', fontSize:'30px'}} onClick={() => gotoNext()}>Enter Manually</button>
                        </div>
                    </Col>
                    <Col xs={4}>
                    </Col>
                </Row>
            </Container>
            <Row>
                {/* <Col xs={4}>
                    <div style={{ marginLeft: '30px' }} >
                        <img width={80} height={80} src={backIcon} onClick={() => gotoBack()} />
                    </div>
                </Col> */}
                <Col xs={4}>
                    {/* <div style={{ marginLeft: '145px' }}>
                            <img width={64} height={64} src={`${process.env.PUBLIC_URL}/assets/phone-call.png`} onClick={() => this.notify()} />
                        </div> */}
                </Col>
                {/* <Col xs={4}>
                    <div style={{ marginRight: '30px', float: 'right' }}>
                        <img width={80} height={80} src={nextIcon} onClick={() => gotoNext()} />
                    </div>
                </Col> */}

            </Row>

        </div>
    )
}

export default BarcodeScan;
