<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
	String username = request.getParameter("username");
	String password = request.getParameter("password");
	
	if(isValidUser(username, password)) {
		response.setStatus(HttpServletResponse.SC_OK);
		response.getWriter().println("SC_OK");
	} else {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.getWriter().println("SC_UNAUTHORIZED");
	}
	%>
	
	<%!
	private boolean isValidUser(String username, String password) {
		return username.equals("admin") && password.equals("admin123");
	}
	%>
</body>
</html>