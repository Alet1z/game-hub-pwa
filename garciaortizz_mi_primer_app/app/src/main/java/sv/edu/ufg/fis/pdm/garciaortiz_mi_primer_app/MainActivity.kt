package sv.edu.ufg.fis.pdm.garciaortiz_mi_primer_app

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }



        val boton = findViewById<Button>(R.id.btn_enviar)

        boton.setOnClickListener{

            val text = findViewById<EditText>(R.id.mensaje).text.toString()
            val duracion = Toast.LENGTH_LONG
            val toast = Toast.makeText(this,text,duracion)
            toast.show()
        }
    }
}
