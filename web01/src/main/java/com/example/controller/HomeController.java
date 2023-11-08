package com.example.controller;

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
}
