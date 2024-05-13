import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import ProfessorUpdate from './ProfessorUpdate';

const ProfessorRead = () => {
  const params = useParams();
  const pcode = params.pcode;
  const [data, setData] = useState('');
  const [edit, setEdit] = useState(false);

  const getProfessor = async () => {
    const res = await axios.get("/pro/read.json?pcode=" + pcode);
    setData(res.data);
  }

  const {pname, dept, fmtdate, fmtsalary, title} = data;

  useEffect(()=>{
    getProfessor();
  },[edit]);

  return (
    <div className='my-5'>
      <h1 className='title'>교수정보</h1>
      <Row>
        <Col>
        {edit ?
          <ProfessorUpdate data={data} setEdit={setEdit}/>
          :
          <div className='info_cardgroup'>
            <Card className='info_card p-5'>
              <div>교수이름 : {pname} ({pcode})</div><hr/>
              <div>교수직급 : {title} ({dept})</div><hr/>
              <div>교수급여 : {fmtsalary}</div><hr/>
              <div>
              <Button className='update_btn' variant='dark' size='sm' onClick={()=>setEdit(true)}>정보수정</Button>
              </div>
            </Card>
          </div>
        }
        </Col>
      </Row>
    </div>
  )
}

export default ProfessorRead