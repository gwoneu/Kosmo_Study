import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { InputGroup, Table, Form, Row, Col, Button, Spinner } from 'react-bootstrap';

function SearchPage() {
    const [list, setList] = useState([]);
    const [query, setQuery] = useState("맥북");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [cnt, setCnt] = useState(0);
    
    const getList = async () => {
        setLoading(true);
        const res = await axios(`/search/list.json?page=${page}&size=5&query=${query}`);
        //console.log(res.data);
        let data = res.data.items.map(s => s && { ...s, title: stripHtmlTags(s.title) });
        data = data.map(item => item && {...item, checked:false});
        setList(data);
        setLoading(false);
    }

    // HTML 태그를 제거하는 함수
    const stripHtmlTags = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    }

    useEffect(()=>{
        getList();
    },[page]);

    const onSubmit = (e) => {
        e.preventDefault();
        if(query === "") {
            alert("검색어를 입력하세요.");
        }else{
            getList();
        }
    }

    const onSave = async (shop) => {
        if(window.confirm("상품을 등록하시겠습니까?")){
            await axios.post("/shop/insert", shop);
            alert("상품등록완료");
        }
    }

    const onChangeAll = (e) => {
        const data = list.map(item => item && {...item, checked:e.target.checked});
        setList(data);
    }

    const onChangeSingle = (e, pid) => {
        const data = list.map(item => item.productId === pid ? {...item, checked:e.target.checked} : item);
        setList(data);
    }

    useEffect(()=>{
        let chk = 0;
        list.forEach(item => {
            if(item.checked) chk++;
        });
        //console.log(chk);
        setCnt(chk);
    },[list]);

    const onCheckedSave = async () => {
        if(cnt === 0) {
            alert("저장할 상품을 선택해주세요.");
        }else {
            //선택할 상품 저장
            if(window.confirm(`${cnt}개 상품을 등록하시겠습니까?`)){
                for(const item of list){
                    if(item.checked){
                        await axios.post("/shop/insert", item);
                    }
                }
                alert("상품이 등록되었습니다.");
                getList();
            }
        }
    }
    
    if(loading) return <div className='text-center my-5'><Spinner/></div>
    return (
        <div className='my-5'>
            <h1 className='title'>상품검색</h1>
            <Row className='mb-4'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control onChange={(e) => setQuery(e.target.value)} placeholder='상품명, 제조사' value={query}/>
                            <Button type='submit' variant='dark'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='text-end mt-2'>
                    <Button variant='dark' size='sm' onClick={onCheckedSave}>선택저장</Button>
                </Col>
            </Row>
            <Table hover bordered className='tablegroup'>
                <thead>
                    <tr>
                        <th><input type='checkbox' onChange={onChangeAll} checked={list.length === cnt}/></th>
                        <th>ID</th>
                        <th>이미지</th>
                        <th>제목</th>
                        <th>가격</th>
                        <th>제조사</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(s=>
                    <tr key={s.productId}>
                        <td><input onChange={(e)=>onChangeSingle(e, s.productId)} type='checkbox' checked={s.checked}/></td>
                        <td>{s.productId}</td>
                        <td><img src={s.image} width='50'/></td>
                        <td><div className='ellipsis'>{s.title}</div></td>
                        <td>{s.lprice}</td>
                        <td>{s.maker}</td>
                        <td><Button onClick={()=> onSave(s)} variant='outline-dark' size='sm'>상품등록</Button></td>
                    </tr>
                    )}
                </tbody>
            </Table>
            <div className='buttongroup'>
                <Button variant='dark' size='sm' onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
                <span className='mx-2'>{page}</span>
                <Button variant='dark' size='sm' onClick={()=>setPage(page+1)} disabled={page===10}>다음</Button>
            </div>
        </div>
    )
}

export default SearchPage