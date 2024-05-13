import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, InputGroup, Form, Button, Tabs, Tab } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ContentPage from './ContentPage'

const ShopUpdate = () => {
    const { pid } = useParams();
    const [form, setForm] = useState("");
    const ref_file = useRef(null);
    const [src, setSrc] = useState('http://via.placeholder.com/200x200');
    const [file, setFile] = useState(null);

    const getShop = async () => {
        const res = await axios(`/shop/read/${pid}`);
        //console.log(res.data);
        const data = {...res.data, html:content}
        setForm(data);
    }

    const { title, lprice, image, fmtdate, maker, content } = form;

    useEffect(() => {
        getShop();
    }, []);

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm("수정하시겠습니까?")) {
            await axios.post("/shop/update", form);
            alert("상품 수정이 완료되었습니다.");
        }
    }

    const onChangeFile = (e) => {
        setSrc(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const onSaveImage = async () => {
        if(!file){
            alert("변경할 이미지를 선택해주세요.");
        }else{
            if(window.confirm("이미지를 변경하시겠습니까?")){
                //이미지저장
                const formData = new FormData();
                formData.append("file", file);
                formData.append("pid",pid);
                axios.post("/shop/image", formData);
                alert("이미지 변경이 완료되었습니다.");
                await axios.get(`/deleteFile?file=${image}`);
                getShop();
                setSrc('http://via.placeholder.com/200x200');
                setFile(null);
            }
        }
    }

    return (
        <div className='my-5'>
            <h1 className='title'>상품정보수정</h1>
            <Tabs defaultActiveKey="content" id="fill-tab-example" className="mb-5" fill>
                <Tab eventKey="home" title="상품정보">
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <form className='card p-3' onSubmit={onSubmit}>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>상품번호</InputGroup.Text>
                                    <Form.Control value={pid} readOnly />
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>상품이름</InputGroup.Text>
                                    <Form.Control name='title' value={title} onChange={onChange} />
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>상품가격</InputGroup.Text>
                                    <Form.Control name='lprice' value={lprice} onChange={onChange} />
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>제조사</InputGroup.Text>
                                    <Form.Control value={maker} onChange={onChange} />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text>등록일</InputGroup.Text>
                                    <Form.Control value={fmtdate} onChange={onChange} readOnly />
                                </InputGroup>
                                <div className='buttongroup mt-3'>
                                    <Button variant='dark' size='sm' type='submit'>수정</Button>
                                    <Button variant='outline-dark' size='sm' type='reset' className='ms-2'>취소</Button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="profile" title="상품사진">
                    <Row>
                        <Col>
                            <h5 className='title'>변경 전</h5>
                            <div className='text-center update_img_wrap'>
                                <img src={`/display?file=${image}`} width='90%'/>
                            </div>
                        </Col>
                        <Col>
                            <h5 className='title'>변경 후</h5>
                            <div className='text-center update_img_wrap'>
                                <img onClick={()=>ref_file.current.click()} src={src} width='90%' style={{cursor:'pointer'}}/>
                                <input onChange={onChangeFile} type='file' ref={ref_file} style={{display:'none'}}/>
                            </div>
                        </Col>
                        <div className='mt-5 text-center'>
                            <Button variant='dark' onClick={onSaveImage}>이미지저장</Button>
                        </div>
                    </Row>
                </Tab>
                <Tab eventKey="content" title="상세설명">
                    <ContentPage pid={pid} form={form} setForm={setForm} getShop={getShop}/>
                </Tab>
            </Tabs>
            
        </div>
    )
}

export default ShopUpdate