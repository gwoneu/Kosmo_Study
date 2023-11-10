package com.example.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
	@ResponseBody //데이터 출력(브라우저)
	@GetMapping("/hello") // 주소를 알려주는 것
	public String hello() { //메소드 안에 retunr이 없으면 오류가뜸
		return "hello........";
	}
	
	@GetMapping("/")
	public String home(Model model) {
		model.addAttribute("pageName", "about");
		return "home"; //home.html로 이동
	}
	
	   @GetMapping("/display")
	   public ResponseEntity<Resource> display(String file) {
	      Resource resource = new FileSystemResource("c:" + file);
	      if(!resource.exists()) 
	         return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
	      HttpHeaders header = new HttpHeaders();
	      try{
	         Path filePath = Paths.get("c:" + file);
	         header.add("Content-type", Files.probeContentType(filePath));
	      }catch(Exception e) {
	         System.out.println("오류:" + e.toString());
	      }
	      return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
	   }
}
