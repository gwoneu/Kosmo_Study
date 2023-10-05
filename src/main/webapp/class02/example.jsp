<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%!
      String[] members = {"철수", "영희", "길동"};
      int num = 10;
      
      int sum(int num2) {
         return num + num2;
      }
   %>
   
   <h3>
      sum 실행결과 : <%= sum(20) %>
   </h3>
   <hr>
   <h3>배열 출력</h3>
   <ul>
      <% for(String name : members) { %>
      <li><%= name %></li>
      <% } %>
   </ul>
   <hr>
   <h3>
      <!-- HTML 주석 : 화면에는 안보이고 소스에서는 보인다. -->
      <%-- JSP 주석 : 둘 다 안보인다. --%>
   </h3>
</body>
</html>