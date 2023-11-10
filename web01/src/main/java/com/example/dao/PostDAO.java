package com.example.dao;

import java.util.HashMap;
import java.util.List;

import com.example.domain.PostVO;

public interface PostDAO {
	public List<HashMap<String, Object>> list(); //여러 개의 자료를 가져올거기 때문에 List
	public HashMap<String, Object> read(int pid); //보내야하는 변수 ()안에 추가
	public void insert(PostVO vo);
	public void delete(int pid);
	public void update(PostVO vo);
}
