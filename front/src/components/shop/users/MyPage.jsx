import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Spinner, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const ref_file = useRef();
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState('http://via.placeholder.com/200x200')
    const [user, setUser] = useState({
        uid:'',
        upass:'',
        uname:'',
        photo:'',
        phone:'',
        address1:'',
        address2:'',
        fmtdate:'',
        fmtmodi:''
    });
    const {uid, upass, uname, phone, address1, address2, fmtdate, fmtmodi} = user;
    const getUser = async() => {
        setLoading(true);
        const res=await axios.get(`/users/read/${sessionStorage.getItem("uid")}`);
        setUser(res.data);
        setLoading(false);
    }

    const onChangeFile = (e) => {
        setPhoto(URL.createObjectURL(e.target.files[0]));
    } 

    useEffect(()=>{
        getUser();
    }, []);

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>My Page</h1>
            <Row className='justify-content-center mx-3'>
                <Col md={6}>
                    <Card className='p-5'>
                        <div>
                            <img src={photo} onClick={()=>ref_file.current.click()} width="100" className='photo' style={{cursor:'pointer'}}/>
                            <input type='file' ref={ref_file} onChange={onChangeFile} style={{display:'none'}}/>
                            <br/>
                            <Button size='sm mt-2'>이미지수정</Button>
                            <hr/>
                        </div>
                        <div>
                            <div className='mb-2'>이름: {uname}</div>
                            <div className='mb-2'>전화: {phone}</div>
                            <div className='mb-2'>주소: {address1} {address2}</div>
                            <div className='mb-2'>가입일: {fmtdate}</div>
                            <div className='mb-2'>수정일: {fmtmodi}</div>
                            <hr/>
                            <Button size="sm" onClick={()=>navi('/users/update')}>정보수정</Button>
                        </div>
                    </Card>    
                </Col>
            </Row>
        </div>
    )
}

export default MyPage