import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Button, InputGroup, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function ProfessorInsert() {
  const navi = useNavigate();
  const [form, setForm] = useState({
    pcode:'P001',
    pname:'이몽룡',
    dept:'전산',
    title:'정교수',
    hiredate:'2023-11-21',
    salary:100000000
  });

  const {pcode, pname, dept, title, hiredate, salary} = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if(window.confirm("새로운 교수를 등록하시겠습니까?")){
      //교수등록
      await axios.post("/pro/insert", form);
      navi("/pro/list");
    }
  }

  const getCode = async () =>{
    const res=await axios("/pro/code");
    setForm({
      ...form,
      pcode:res.data
    });
  }

  useEffect(()=>{
    getCode();
  },[]);

  return (
    <div className='my-5'>
      <h1 className='title'>교수등록</h1>
      <div className='proupdate_cardgroup'>
      <Card className='proupdate_card p-5'>
        <form onSubmit={onSubmit}>
          <InputGroup className='mb-2'>
            <InputGroup.Text>교수번호</InputGroup.Text>
            <Form.Control value={pcode} name='pcode'/>
          </InputGroup>

          <InputGroup className='mb-2'>
            <InputGroup.Text>교수이름</InputGroup.Text>
            <Form.Control value={pname} name='pname' onChange={onChange}/>
          </InputGroup>

          <InputGroup className='mb-2'>
            <InputGroup.Text>교수학과</InputGroup.Text>
            <Form.Select value={dept} name='dept' onChange={onChange}>
              <option value="전산" selected={dept==='전산' && true}>컴퓨터공학과</option>
              <option value="전자" selected={dept==='전자' && true}>전자공학과</option>
              <option value="건축" selected={dept==='건축' && true}>건축공학과</option>
            </Form.Select>
          </InputGroup>

          <InputGroup className='mb-2'>
            <InputGroup.Text>교수직급</InputGroup.Text>
            <Form.Select value={title} name='title' onChange={onChange}>
              <option value="정교수" selected={title==='정교수' && true}>정교수</option>
              <option value="부교수" selected={title==='부교수' && true}>부교수</option>
              <option value="조교수" selected={title==='조교수' && true}>조교수</option>
            </Form.Select>
          </InputGroup>

          <InputGroup className='mb-2'>
            <InputGroup.Text>교수급여</InputGroup.Text>
            <Form.Control value={salary} name='salary' onChange={onChange}/>
          </InputGroup>

          <InputGroup className='mb-2'>
            <InputGroup.Text>임용일자</InputGroup.Text>
            <Form.Control value={hiredate} type='date' name='hiredate' onChange={onChange}/>
          </InputGroup>
          <div className='proupdate_btngroup'>
            <Button variant='dark' type='submit'>저장</Button>
            <Button className='ms-2' variant='outline-dark' type='reset'>취소</Button>
          </div>
        </form>
      </Card>
    </div>
    </div>
  )
}

export default ProfessorInsert