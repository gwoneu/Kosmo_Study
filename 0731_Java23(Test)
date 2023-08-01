//3. indexOf는 문자열의 처음, 마지막 특정 위치를 알 수 있었다. 그러면 해당 문자열 원하는 문자가 몇 개 들어있는지
import java.util.Scanner;

public class Test06 {

	public static void main(String[] args) {
		String str = "Hello world.";
		int cnt = 0;
		
		for(int i=0; i<str.length(); i++) {
			if(str.charAt(i) == 'l') {
				cnt++;
			}
		}
		
		System.out.println(cnt);
		
		Scanner sc = new Scanner(System.in);
		cnt = 0;
		String s = sc.next();
		for(int i=0; i<str.length(); i++) {
//			if(str.charAt(i) == s.charAt(0)) {
//				cnt++;
//			}
			if(s.equals(str.substring(i,i+1))) {
				cnt++;
			}
		}
		System.out.println(cnt);
		
		cnt = 0;
		while(str.length() > 0) {
			if(str.indexOf('l') != -1) {
				cnt++;
				str = str.substring(str.indexOf('l') + 1);
			} else {
				break;
			}
		}
		System.out.println(cnt);
		
		str = "Hello World";
		cnt = 0;
		for(int i=0; i<str.length(); i++) {
			if(str.indexOf('l', i) != -1) {
				i = str.indexOf('l', i);
				cnt++;
			}
			else {
				break;
			}
		}
		System.out.println(cnt);
	}
}
