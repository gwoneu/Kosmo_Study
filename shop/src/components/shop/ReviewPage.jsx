import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import "../Pagination.css";
import Pagination from 'react-js-pagination';

const ReviewPage = ({pid}) => {
    const [body, setBody] = useState('');
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const size=3;

    const getList = async () => {
        const res = await axios(`/review/list.json?page=${page}&size=${size}&pid=${pid}`);
        setList(res.data.list);
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
                    <Button className='w-100'>로그인</Button>
                </div>
            }
            <div>
                <span>리뷰수 : {total}</span>
                <hr/>
            </div>
            <div className='mt-5'>
                {list.map(r=>
                    <div className='card p-4 mb-3'>
                        <div>
                            <small>{r.regdate}</small>
                            <small>({r.uid})</small>
                            <hr/>
                        </div>
                        <div>{r.body}</div>
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