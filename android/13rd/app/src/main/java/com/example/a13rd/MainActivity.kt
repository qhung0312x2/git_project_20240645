package com.example.a13rd

import android.os.Bundle
import android.widget.ImageView
import android.widget.ToggleButton
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {

     lateinit var tbObj: ToggleButton
     lateinit var ivBackground: ImageView
     lateinit var ivLight1: ImageView
     lateinit var ivLight2: ImageView
     lateinit var ivLight3: ImageView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        ivBackground = findViewById(R.id.ivBackground)
        ivLight1 = findViewById(R.id.ivLight1)
        ivLight2 = findViewById(R.id.ivLight2)
        ivLight3 = findViewById(R.id.ivLight3)
        tbObj = findViewById(R.id.toggleButton)

        tbObj.setOnCheckedChangeListener { compoundButton , isChecked ->
            if (isChecked) {
                // Light ON state
                ivBackground.setImageResource(R.drawable.bg2)
                ivLight1.setImageResource(R.drawable.light21)
                ivLight2.setImageResource(R.drawable.light22)
                ivLight3.setImageResource(R.drawable.light23)
            } else {
                // Light OFF state
                ivBackground.setImageResource(R.drawable.bg1)
                ivLight1.setImageResource(R.drawable.light11)
                ivLight2.setImageResource(R.drawable.light12)
                ivLight3.setImageResource(R.drawable.light13)
            }
        }
    }
}