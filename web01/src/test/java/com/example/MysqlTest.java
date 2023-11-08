package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.dao.MysqlDAO;
import com.example.dao.PostDAO;

@SpringBootTest
public class MysqlTest {
	@Autowired
	MysqlDAO dao;
	
	@Autowired
	PostDAO pdao;
	
	@Test
	public void list() {
		pdao.list();
	}
	
	@Test
	public void now() {
		System.out.println("Now:" + dao.now());
	}
}
