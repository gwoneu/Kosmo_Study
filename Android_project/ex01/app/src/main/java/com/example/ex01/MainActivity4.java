package com.example.ex01;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

public class MainActivity4 extends AppCompatActivity {

    EditText name;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main4);
        getSupportActionBar().setTitle("연습4");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        name = findViewById(R.id.name);

        //Data 생성
        List<String> array = new ArrayList<>();
        array.add("김유신");
        array.add("이순신");
        array.add("강감찬");

        //어댑터 생성
        ArrayAdapter adapter = new ArrayAdapter(this, android.R.layout.simple_list_item_single_choice, array);

        //ListView 어댑터 연결
        ListView list = findViewById(R.id.list);
        list.setAdapter(adapter);
        list.setChoiceMode(ListView.CHOICE_MODE_SINGLE);

        //등록 버튼을 클릭한 경우
        findViewById(R.id.insert).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String strName = name.getText().toString();
                if(strName.equals("")){
                    Toast.makeText(MainActivity4.this, "이름을 입력하세요.", Toast.LENGTH_SHORT).show();
                }else {
                    array.add(strName);
                    adapter.notifyDataSetChanged(); //Data 변경
                    name.setText("");
                }
            }
        });

        //삭제 버튼을 클릭한 경우
        findViewById(R.id.delete).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                int position = list.getCheckedItemPosition();
                if(position == -1) {
                    Toast.makeText(MainActivity4.this, "삭제할 아이템을 선택하세요.", Toast.LENGTH_SHORT).show();
                }else {
                    array.remove(position);
                    adapter.notifyDataSetChanged();
                }
            }
        });
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if(item.getItemId() == android.R.id.home){
            finish();
        }
        return super.onOptionsItemSelected(item);
    }
}