package com.example.week12

import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        findViewById<androidx.constraintlayout.widget.ConstraintLayout>(R.id.main)?.let { mainView ->
            ViewCompat.setOnApplyWindowInsetsListener(mainView) { v, insets ->
                val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
                v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
                insets
            }
        }

        val imgSnail = findViewById<ImageView>(R.id.imgSnail)
        val btnShell1 = findViewById<Button>(R.id.btnShell1)
        val btnShell2 = findViewById<Button>(R.id.btnShell2)
        val btnShell3 = findViewById<Button>(R.id.btnShell3)
        val btnShell4 = findViewById<Button>(R.id.btnShell4)

        // Viết trực tiếp sự kiện click cho từng nút ngay trong onCreate
        btnShell1?.setOnClickListener {
            imgSnail?.setImageResource(R.drawable.shell_1)
        }

        btnShell2?.setOnClickListener {
            imgSnail?.setImageResource(R.drawable.shell_2)
        }

        btnShell3?.setOnClickListener {
            imgSnail?.setImageResource(R.drawable.shell_3)
        }

        btnShell4?.setOnClickListener {
            imgSnail?.setImageResource(R.drawable.shell_4)
        }
    }
}