package com.example.dao;

import com.example.domain.*;
import java.util.*;

public interface StuDAO {
	public List<HashMap<String, Object>> list(QueryVO vo);
	public int total(QueryVO vo);
	public HashMap<String, Object> read(String scode);
	//특정학생의 수강신청목록
	public List<HashMap<String, Object>> enroll(String scode);
}
