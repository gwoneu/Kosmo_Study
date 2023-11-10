package com.example.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.PostDAO;
import com.example.domain.PostVO;

@RestController //ResponseBody 생략 가능
@RequestMapping("/posts")
public class PostRESTController {
	@Autowired
	PostDAO dao;
	
	@GetMapping("/list.json")
	public List<HashMap<String,Object>> list(){
		return dao.list();
	}
	
	@GetMapping("/read.json") //localhost:8080/posts/read.json?pid=
	public HashMap<String,Object> read(int pid){
		return dao.read(pid);
	}
	
	@PostMapping("/insert")
	public void insert(@RequestBody PostVO vo) {
		System.out.println(vo.toString()); //처음에 만들어둔 toString()
		dao.insert(vo);
	}
	
	@PostMapping("/delete")
	public void delete(@RequestBody int pid) {
		dao.delete(pid);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody PostVO vo) {
		dao.update(vo);
	}
}
