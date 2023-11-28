import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import "../Pagination.css";
import Pagination from 'react-js-pagination';
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const ReviewPage = ({pid}) => {
    const [body, setBody] = useState('');
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const size=3;

    const getList = async () => {
        const res = await axios(`/review/list.json?page=${page}&size=${size}&pid=${pid}`);
        let data = res.data.list.map(r=>r && {...r, ellipsis:true, view:true, text:r.body});
        setList(data);
        setTotal(res.data.total);
    }

    useEffect(()=>{
        getList();
    },[page]);

    const onRegister = async () => {
        if(body === ""){
            alert("리뷰내용을 적성하세요.")
        }else{
            const data = {pid, uid:sessionStorage.getItem("uid"), body}
            await axios.post("/review/insert", data);
            setBody("");
            getList();
        }
    }

    const onCLickLogin = () => {
        sessionStorage.setItem("target", `/shop/info/${pid}`);
        window.location.href="/login";
    }

    const onClickBody = (cid) => {
        const data = list.map(r=>r.cid === cid ? {...r, ellipsis : !r.ellipsis} : r);
        setList(data);
    }

    const onDelete = async (cid) => {
        if(window.confirm(`${cid}번 리뷰를 삭제하시겠습니까?`)){
            await axios.post(`/review/delete/${cid}`);
            getList();
        }
    }

    const onClickUpdate = (cid) => {
        const data = list.map(r=>r.cid === cid ? {...r, view:false} : r);
        setList(data);
    }

    const onCLickCancle = (cid) => {
        const data = list.map(r=>r.cid === cid ? {...r, view:true, body:r.text} : r);
        setList(data);
    }

    const onChangeBody = (e, cid) => {
        const data = list.map(r=>r.cid === cid ? {...r, body:e.target.value} : r);
        setList(data);
    }

    const onClickSave = async (cid, body, text) => {
        if(body === text){
            onCLickCancle(cid);
        }else{
            if(window.confirm(`${cid}번 리뷰를 수정하시겠습니까?`)){
                //리뷰수정
                await axios.post("/review/update", {cid, body});
                alert("리뷰 수정이 완료되었습니다.");
                getList();
            }
        }
    }

    return (
        <div>
            {sessionStorage.getItem("uid") ?
                <div>
                    <Form.Control as="textarea" rows={5} placeholder='리뷰 내용을 입력하세요.' value={body} onChange={(e)=>setBody(e.target.value)}/>
                    <div className='text-end mt-2'>
                        <Button variant='dark' className='btn-sm px-5' onClick={onRegister}>등록</Button>
                    </div>
                </div>
                :
                <div>
                    <Button className='w-100 mb-3' variant='dark' onClick={onCLickLogin}>로그인</Button>
                </div>
            }
            <div>
                <span><IoChatboxEllipsesOutline/> : {total}</span>
                <hr/>
            </div>
            <div className='mt-5'>
                {list.map(r=>
                    <div key={r.cid} className='card p-4 mb-3'>
                        <Row>
                            <Col><small><strong>{r.uid}</strong></small></Col>
                            <Col className='text-end'><small>{r.regdate}</small></Col>
                        </Row>
                        <hr/>
                        {r.view ? 
                        // 댓글 보기
                        <>
                            <div onClick={()=>onClickBody(r.cid)}
                                className={r.ellipsis && 'ellipsis2'} style={{cursor:'pointer'}}>[{r.cid}] {r.text}
                            </div>
                                {sessionStorage.getItem("uid") === r.uid &&
                                    <div className='text-end mt-3'>
                                        <Button variant='dark btn-sm' onClick={()=>onClickUpdate(r.cid)}>수정</Button>
                                        <Button variant='outline-dark btn-sm ms-2' onClick={()=>onDelete(r.cid)}>삭제</Button>
                                    </div>
                                }
                        </>
                        :
                        // 댓글 수정
                        <div>
                            <Form.Control onChange={(e)=>onChangeBody(e, r.cid)} as="textarea" rows="5" value={r.body}/>
                            <div className='text-end mt-2'>
                                <Button variant='dark btn-sm' onClick={()=>onClickSave(r.cid, r.body, r.text)}>저장</Button>
                                <Button variant='outline-dark btn-sm ms-2' onClick={()=>onCLickCancle(r.cid)}>취소</Button>
                            </div>
                        </div>
                        }
                    </div>
                )}
            </div>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => setPage(page)} />
            }
        </div>
    )
}

export default ReviewPage