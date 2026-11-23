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

        var myX: Int= 100
        var myY: Long= myX.toLong()
        println("Int: " + myX)
        println("Long: " + myY)

        var myA: Int= 100
        var myB: Float= myX.toFloat()
        println("Int: " + myA)
        println("Float: " + myB)

        var x: Int = 5
        var y: Int=10

        println("x+y = " +(x+y))
        println("x-y = " +(x-y))
        println("x*y = " +(x*y))
        println("x/y = " +(x/y)) //chia lấy phần nguyên
        println("x%y = " +(x%y)) // chia lấy số dư

        println("x>y = " +(x>y))
        println("x>=y = " +(x>=y))
        println("x<y = " +(x<y))
        println("x<=y = " +(x<=y))
        println("x==y = " +(x==y))
        println("x!=y = " +(x!=y))

        y+=x
        println("y += x => y = " +y)
        y-=x
        println("y -= x => y = " +y)
        y*=x
        println("y *= x => y = " +y)
        y/=x
        println("y /= x => y = " +y)
        y%=x
        println("y %= x => y = " +y)

        var z: Int=1
        println("++z =" +(++z))
        println("--z = "+(--z))

        var num: Int = 10
        if(num%2 ==0) {
            println("숫자 " + num + "은 짝수")
        }else{
            println("숫자 "+ num + "은 홀수")
        }

        var num1: Int= -10
        var result: String
        if (num1>0){
            result ="숫자 " +num1 + "은 양수"
        }else if(num1 ==0){
            result = "숫자 " +num1 + "은 0"

        }else{
            result = "숫자 " +num1 + "은 음수"
        }
        println(result)

        if(num1>0) {
            if (num1 % 2 == 0) {
                result = "숫자 " + num1 + "은 양수이거 짝수"
            } else {
                result = "숫자 " + num1 + " 은 양수 이고 홀수"
            }


        }else{
            if(num1 %2==0){
                result="숫자 "+ num1 +"은 음수이고 짝수"
            }else{
                result="숫자" +num1+"은 음수이고 홀수"
            }
        }
        println(result)

        var day: Int=2
        when(day){
            1->result = "Monday"
            2->result = "Tuesday"
            3->result = "wednesday"
            4->result = "Thurday"
            5->result = "Friday"
            6->result = "Staturday"
            7->result = "Sunday"
            else ->result = "Invalid day"
        }
        println(result)

        var numbers= arrayOf(1,2,3,4,5)
        for(i in numbers){
            if(i%2 ==1){
                println(i)
            }
        }

        var num01 = 85
        var num02=90

        if(num01 >= 80){
            if(num02 >=90){
                println("A 학전")
            }else if(num02 >=80 && num02 <90){
                println("B 학점")
            }else if( num02 >=70 && num02 <80){
                println(":C 학점")
            }else {
                println("F 학점")
            }
        }else
            println("F 학점")


        //var m: Int= 1
        //var n: Int= 9
        //for(m in 1..9) {
        var i:Int =2
            for (j in 1..9){
                print("$j x $i = ${j*i}\t")
        }
            println()
        //}

        println()

        for(n in 10..13){
            for(m in 5..10){
                print("$n x $m = ${n*m}\t")
            }
            println()
        }


















    }
}