import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvoLogo from '../ImageAssests/Logo/evo.png';
import appLogo from '../ImageAssests/Logo/Logo.png';
import '../StyleSheets/HomePage.css';
import localLangData from '../LanguageAsset/evo_lang.json'
import { ToastContainer, toast } from 'react-toastify';
import environment from '../Environment/Environment';
import { getAuthTokenRequest } from '../reducers/AuthenticationSlice';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



const IMAGES1 =
    [
        {
            src: `${process.env.PUBLIC_URL}/assets/DE.png`,
            width: 1,
            height: 1,
            language: 'de'
        },
        {
            src: `${process.env.PUBLIC_URL}/assets/GB.png`,
            width: 1,
            height: 1,
            language: 'en'
        },
        {
            src: `${process.env.PUBLIC_URL}/assets/FR.png`,
            width: 1,
            height: 1
        },
        {
            src: `${process.env.PUBLIC_URL}/assets/Netherlands.png`,
            width: 1,
            height: 1
        },
        {
            src: `${process.env.PUBLIC_URL}/assets/RO.png`,
            width: 1,
            height: 1
        },
    ]

const IMAGES2 = [

    {
        src: `${process.env.PUBLIC_URL}/assets/TR.png`,
        width: 1,
        height: 1
    },

    {
        src: `${process.env.PUBLIC_URL}/assets/Bulgaria.png`,
        width: 1,
        height: 1
    },

    {
        src: `${process.env.PUBLIC_URL}/assets/Russia.png`,
        width: 1,
        height: 1

    },

    {
        src: `${process.env.PUBLIC_URL}/assets/Serbia.png`,
        width: 1,
        height: 1

    },

    {
        src: `${process.env.PUBLIC_URL}/assets/Poland.png`,
        width: 1,
        height: 1
    },


]


const IMAGES3 = [
    {
        src: `${process.env.PUBLIC_URL}/assets/Czech_Republic.png`,
        width: 1,
        height: 1
    },
    {
        src: `${process.env.PUBLIC_URL}/assets/Hungary.png`,
        width: 1,
        height: 1

    },

    {
        src: `${process.env.PUBLIC_URL}/assets/Croatia.png`,
        width: 1,
        height: 1

    },
]



const Home = (props) => {

    /*** DISPATCH ***/
    const dispatch = useDispatch();

    /*** NAVIGATION HISTORY ***/
    const navigate = useNavigate();


    /*** PAGE STATES ***/
    const [showHomeIcon, setshowHomeIcon] = useState(false);
    const [shownCancelScreen, setshownCancelScreen] = useState(false);

    /*** SELECTORS  ***/
    const authToken = useSelector(state => state.auth.authentication.data);



    const notify = () => toast.info(localLangData[localStorage.getItem('lang')].call_operator_text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    useEffect(() => {
        var tempAuthData = {
            username: environment.adminusername,
            password: environment.adminpassword
        }
        dispatch(getAuthTokenRequest(tempAuthData));
    }, [dispatch]);



    const imageClicked = (params, language) => {
        localStorage.setItem('lang', language);
        navigate('/Barcodescan', {replace: true,
            state: { authToken: authToken.token }
        });
    }

    const gotoHome = () => {
        setshowHomeIcon(false);
        setshownCancelScreen(false);
    }

    const cancelButtonMethod = () => {
        setshownCancelScreen(true);
    }

    const checkedButtonMethod = () => {
        this.props.history.push('License');
    }

    console.log('environment', authToken);

    return (
        <Container style={{
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            KhtmlUserSelect: 'none',
            MozUserSelect: 'nonoe',
            msUserSelect: 'none',
            userSelect: 'none'
        }}>
            <Row style={{ marginTop: '10px' }}>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col xs={6}>
                </Col>
                <Col xs={4}>
                </Col>
                <Col xs={2}>
                    <div style={{ float: 'right' }}>
                        <img width={150} height={70} src={appLogo} />
                    </div>
                </Col>

            </Row>
            <Row style={{ marginLeft: '45px', marginTop: '20px' }}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
                    <label style={{ fontSize: '25px', fontWeight: 'bold', color: '#000947', marginLeft: '5px' }} >{localLangData[localStorage.getItem('lang')]?.select_country}</label>
                </div>
            </Row>
            <Row style={{ marginTop: '20px', alignItems: 'center', marginLeft: '45px' }}>
                {IMAGES1.map((value) => {
                    return (
                        <div style={{
                            width: '150px',
                            height: '150px',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginLeft: '10px',
                            marginTop: '10px',
                        }}>
                            <img style={{
                                width: '150px', height: '150px', border: '1px solid black',
                                borderRadius: '4px',
                            }} src={value.src} onClick={(e) => imageClicked(e, value.language)} />
                        </div>

                    )
                })}
            </Row>
            <Row style={{ marginTop: '0px', alignItems: 'center', marginLeft: '45px' }}>
                {IMAGES2.map((value) => {
                    return (
                        <div style={{
                            width: '150px',
                            height: '150px',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginLeft: '10px',
                            marginTop: '10px'
                        }}>
                            <img style={{
                                width: '150px', height: '150px', border: '1px solid black',
                                borderRadius: '4px',
                            }} src={value.src} onClick={(e) => imageClicked(e)} />
                        </div>

                    )
                })}
            </Row>

            <Row style={{ marginTop: '0px', alignItems: 'center', marginLeft: '205px' }}>
                {IMAGES3.map((value) => {
                    return (
                        <div style={{
                            width: '150px',
                            height: '150px',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginLeft: '10px',
                            marginTop: '10px'
                        }}>
                            <img style={{
                                width: '150px', height: '150px', border: '1px solid black',
                                borderRadius: '4px',
                            }} src={value.src} onClick={(e) => imageClicked(e)} />
                        </div>

                    )
                })}
            </Row>
        </Container>

    )
}


export default Home;
