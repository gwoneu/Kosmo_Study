package class01;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class StudentServlet
 */
@WebServlet("/student")
public class StudentServlet extends HttpServlet {
   private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public StudentServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

   private Map<String, Map<String, Integer>> studentGrades; //{ID:{과목:성적}} 이런 형태
   
   @Override
   public void init() throws ServletException {
      studentGrades = new HashMap<>();
   }
   
   private void viewStudent(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      
      String studentId = request.getParameter("studentId");
      
      if(studentGrades.containsKey(studentId)) {
         Map<String, Integer> gradesMap = studentGrades.get(studentId);
         StringBuilder resultBuilder = new StringBuilder();
         
         for(Map.Entry<String, Integer> entry : gradesMap.entrySet()) {
            resultBuilder.append(entry.getKey())
            .append(":")
            .append(entry.getValue())
            .append("<br>");
         }
         response.setContentType("text/html; charset=utf-8");
         PrintWriter out = response.getWriter();
         
         out.println("<html>");
         out.println("<head><title>학생 성적</title></head>");
         out.println("<body>");
         out.println("<h1>학생 성적</h1>");
         out.println(resultBuilder.toString());
         out.println("</body></html>");
      } else {
         response.sendError(HttpServletResponse.SC_NOT_FOUND);
      }
   }
   
   private void calculateSubject(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      response.setContentType("text/html; charset=utf-8");
   }
   
   protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      response.setContentType("text/html; charset=utf-8");
      
      String studentId = request.getParameter("studentId");
      String subject = request.getParameter("subject");
      int grade = Integer.parseInt(request.getParameter("grade"));
      
      if(!studentGrades.containsKey(studentId)) {
         studentGrades.put(studentId, new HashMap<>());
      }
      
      Map<String, Integer> gradesMap = studentGrades.get(studentId);
      gradesMap.put(subject, grade);
      
      response.sendRedirect(request.getContextPath() + "/class01/student.html");
   }
   
   protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      String action = request.getParameter("action");
      
      if(action != null && action.equals("viewStudent")) {
         viewStudent(request, response);
      } else if(action != null && action.equals("calculateSubject")) {
         calculateSubject(request, response);
      }else {
         response.sendError(HttpServletResponse.SC_BAD_REQUEST);
      }
   }

}