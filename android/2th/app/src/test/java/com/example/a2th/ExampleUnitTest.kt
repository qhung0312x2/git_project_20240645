package com.example.a2th

import androidx.core.graphics.component4
import org.junit.Test

import org.junit.Assert.*

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
class ExampleUnitTest {
    @Test
    fun addition_isCorrect() {
        assertEquals(4, 2 + 2)

        var myName = "2222222"
        val age: Int = 23

        myName = "닝광흥"
        println("코틀린: 불변 변수  나의 이름은 " + myName)

        var numOne = 1
        var numTwo = 30000000
        var myByte: Byte= 1
        var myInt: Int= 20
        var myLong =25L
        println("numOne : "+ numOne +", long :"+ numTwo+ "," +" Byte: " +myByte+ ", Int :" +myInt )
        println("long: " + myLong)

        var myFloat= 30.2F
        var myDouble= 35.4
        println("Float: " + myFloat)
        println("Double: "+ myDouble)



        println("Int: "+ numOne )

        var myBoolean : Boolean = true
        println("Boolean : " + myBoolean)

        var myChar1 : Char= 'K'
        var myChar2 : Char= 'o'
        var myChar3 : Char = 't'
        var myChar4 : Char= 'l'
        var myChar5 : Char= 'i'
        var myChar6 : Char = 'n'
        println("Char: "+ myChar1+myChar2+myChar3+myChar4+myChar5+myChar6)

        var myString1 :String="Kotlin\n"
        var myString2 : String= "Java"
        println("String: " + myString1)
        println("String: "+ myString2)

        var myArray: IntArray= intArrayOf(1,2,3,4,5)
        println("배열의 3번째 값: " +myArray[1])





    }
}