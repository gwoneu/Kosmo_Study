import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { HiHeart } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi2";
import ReviewPage from './ReviewPage';

const ShopInfo = () => {
    const {pid} = useParams();
    const [shop, setShop] = useState('');
    const {title, maker, image, fmtprice, fmtdate, ucnt, fcnt} = shop;

    const getShop = async () => {
        const res = await axios(`/shop/info/${pid}?uid=${sessionStorage.getItem("uid")}`);
        console.log(res.data);
        setShop(res.data);
    }

    useEffect(()=>{
        getShop();
    },[]);

    const onClickRegHeart = async () => {
        if(!sessionStorage.getItem("uid")){
            sessionStorage.setItem("target", `/shop/info/${pid}`);
            window.location.href="/login";
        }else{
            //좋아요 추가
            await axios(`/shop/insert/favorites?pid=${pid}&uid=${sessionStorage.getItem("uid")}`);
            alert("관심상품으로 등록 완료했습니다.")
            getShop();
        }
    }

    const onClickHeart = async () => {
        await axios.get(`/shop/delete/favorites?uid=${sessionStorage.getItem("uid")}&pid=${pid}`);
        alert("관심상품 등록이 취소되었습니다.");
        getShop();
    }

    const onClickCart = async () => {
        await axios.post("/cart/insert", {uid:sessionStorage.getItem("uid"), pid});
        if(window.confirm("쇼핑을 계속하시겠습니까?")){
            window.location.href="/";
        }else{
            window.location.href="/cart/list";
        }
    }

    return (
        <div className='my-5'>
            <h1 className='title text-center mb-5'>[{pid}] 상품정보</h1>
            <Row>
                <Col md={4}>
                    <img src={`/display?file=${image}`} width='90%' className='shopinfo_img'/>
                </Col>
                <Col className='mt-3'>
                    <h5 className='shopinfo_title'>
                        [{pid}] {title}
                        <span className='heart mx-2'>
                            {ucnt === 0 ? <HiOutlineHeart onClick={onClickRegHeart}/> : <HiHeart onClick={onClickHeart}/>}
                            <small style={{fontSize:'0.7rem', color:'#000'}}>{fcnt}</small>
                        </span>
                    </h5>
                    <hr/>
                    <div className='mb-2'>가격 : {fmtprice}원</div>
                    <div className='mb-2'>제조사 : {maker}</div>
                    <div>등록일 : {fmtdate}</div>
                    <hr/>
                    <div className='buttongroup text-center'>
                        <Button variant='dark' className='px-5'>바로구매</Button>
                        <Button variant='outline-dark' className='px-5 ms-3' onClick={onClickCart}>장바구니</Button>
                    </div>
                </Col>
            </Row>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="my-5">
                <Tab eventKey="home" title="상세설명">
                    상세설명
                </Tab>
                <Tab eventKey="profile" title="상품리뷰">
                    <ReviewPage pid={pid}/>
                </Tab>
            </Tabs>
        </div>
    )
}

export default ShopInfo