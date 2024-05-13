import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, InputGroup, Row, Form, Button } from 'react-bootstrap';
import ModalPost from './ModalPost';

const MyPage = () => {
    const [form, setForm] = useState('');
    const {uid, uname, address1, address2, phone} = form; //비구조할당

    const getUser = async () => {
        const res = await axios.get(`/user/read?uid=${sessionStorage.getItem("uid")}`);
        //console.log(res.data);
        setForm(res.data);
    }

    useEffect(()=>{
        getUser();
    },[]);

    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const onPostCode = (address) => {
        setForm({
            ...form,
            address1: address
        });
    }

    const onRest = (e) => {
        e.preventDefault();
        getUser();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(window.confirm("수정한 내용을 저장하시겠습니까?")) {
            //수정하기
            await axios.post("/user/update", form);
            alert("수정이 완료되었습니다.");
            window.location.href="/";
        }
    }

    return (
        <div className='my-5'>
            <h1 className='title'>정보수정</h1>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <form onReset={onRest} onSubmit={onSubmit}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text className='label'>아이디</InputGroup.Text>
                            <Form.Control name='uid' value={uid} readOnly/>
                        </InputGroup>

                        <InputGroup className='mb-2'>
                            <InputGroup.Text className='label'>회원명</InputGroup.Text>
                            <Form.Control name='uname' onChange={onChangeForm} value={uname}/>
                        </InputGroup>

                        <InputGroup className='mb-2'>
                            <InputGroup.Text className='label'>전화</InputGroup.Text>
                            <Form.Control name='phone' onChange={onChangeForm} value={phone}/>
                        </InputGroup>

                        <InputGroup className='mb-2'>
                            <InputGroup.Text className='label'>주소</InputGroup.Text>
                            <Form.Control name='address1' value={address1} readOnly/>
                            <ModalPost onPostCode={onPostCode}/>
                        </InputGroup>
                        <Form.Control name='address2'onChange={onChangeForm} value={address2} placeholder='상세주소'/>
                        <div className='text-center mt-3'>
                            <Button type='submit' variant='dark' className='px-4'>수정</Button>
                            <Button type='reset' className='ms-2 px-4' variant='outline-dark'>취소</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    )
}

export default MyPage