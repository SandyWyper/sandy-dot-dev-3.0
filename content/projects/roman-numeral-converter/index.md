---
posttype: "projects"
date: "2019-01-01"
title: "Roman Numeral Converter PWA"
description: "Convert Roman numerals to numbers, or vice versa.  This is a progressive web app (PWA) and can be installed to your phone or desktop computer.  Although it is served via a traditional URL through a browser, you can then use it when off-line and it takes the appearance of a native app rather than a web page in a browser."
category: "Side Project"
cover: "./julius-cesar.png"
coverAlt: "Julius Cesar"
tags:
  - "JavaScript"
  - "PWA"
  - "Android"
repository: "https://github.com/SandyWyper/Roman-Numeral-PWA"
live: "https://sandywyper.github.io/Roman-Numeral-PWA/"
---

This web app takes an input of either numbers or Roman numerals, and converts that input to the other type. There is error handling and will inform the user of an incorrect input value, and will let them know what was wrong with the input. For example; wrong numeral ordering, incorrect characters, combo of numbers and letters, etc.

All conversion functionality was written from scratch in JavaScript.

---

### This is a _Progressive Web App_

> a website that behaves like a mobile app or desktop application

For a more detailed explanation of what a PWA is [click here](https://developers.google.com/web/progressive-web-apps/).

To achieve PWA functionality you have to fulfil a number of criteria:

- a service worker to cache the code
- HTTPS
- a manifest.json file

other optimisation criteria:

- various sizes of icon
- address bar theme colour
- configuration for a splash screen

In addition to this, there is a listener for the "Install to home screen" prompt. When launched as an app it preforms just as you would expect a native app to function.

### JavaScript logic

Converting from numbers to numerals is fairly straight forward. If **num** is greater than 1000, add **M** to an array and subtract 1000 from the num total. Continue down that road, join the array together and you have your conversion. However, for numbers larger that 4000 you can use a [Vinculum](<https://en.wikipedia.org/wiki/Vinculum_(symbol)>) which in roman numerals means that you muliply that number by 1000. So V(5) with an over-line becomes 5000. For this reason, I split the answers array into 2, so that when rendering in the DOM I could add an over-line to those numerals for numbers larger than 3999.

```javascript
function switchToNumerals(num) {
  //create variable that will hold the numerals for values over 4000 and values
  //less than 4000. so that when displaying them, an 'overscore' can show that
  //the value is a multiple of 1000.
  let answer = [[], []]

  //work through the number and numeral arrays - subtracting the working amount
  //and adding the numerals to the answer array.
  numberArr.forEach(function (amount, i) {
    while (num >= amount && num >= 4000) {
      answer[0] += romanArr[i]
      num -= numberArr[i]
    }
    while (num >= amount && num < 4000) {
      answer[1] += romanArr[i]
      num -= amount
    }
  })
  return answer
}

//displays the result on the page only if the input is a number.
function showResult1(number, result) {
  if (number > 0) {
    let displayResults = `<p>${number} = <span style="text-decoration: overline">${result[0]}</span>${result[1]}</p>`
    document.querySelector("#results").innerHTML = displayResults
  }
}
```

Converting numerals back into numbers is a lot more complex. How to determine that IX is 9, and not I(1) + X(10)?

This function sets about the order of processing the user submitted string.

```javascript
//controller
function numeralsToNumbers(input) {
  if (checkForNumerals(input)) {
    //change numeral string into an array of letters
    let splitNumerals = breakAndCapitalise(input)
    //pair any numerals that belong together
    let orderedNumerals = pairNumerals(splitNumerals)
    //check to see that numerals are in a valid order
    if (checkNumeralOrder(orderedNumerals)) {
      let convertedAmount = changeNumeralsToNumbers(orderedNumerals)

      showResult2(input.toUpperCase(), convertedAmount)
    }
  }
}
```

1. `checkForNumerals()` Check that the string contains only characters used in Roman numerals using a regex.

```javascript
// gets the numerals from the input field
function checkForNumerals(input) {
  //regex test for Roman Numerals
  const numeralRegex = /^[mdclxvi]*$/gi
  if (!numeralRegex.test(input)) {
    alert("Please enter a valid roman numeral or number.")
    document.getElementById("input-field").value = ""
    return false
  } else {
    return true
  }
}
```

2. `breakAndCapitalise()`

```javascript
//change numeral string into an array of letters
function breakAndCapitalise(rom) {
  return rom.toUpperCase().split("")
}
```

3. `pairNumerals()` Here we cycle through the array of letters and look at what letters are ahead, and if appropriate group them together.

```javascript
//pair numerals that belong together
function pairNumerals(arr) {
  let filteredArray = []

  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case "M":
      case "D":
      case "L":
      case "V":
        filteredArray.push(arr[i])
        break
      case "C":
        if (arr[i + 1] === "M" || arr[i + 1] === "D") {
          filteredArray.push(arr[i] + arr[i + 1])
          i++
        } else {
          filteredArray.push(arr[i])
        }
        break
      case "X":
        if (arr[i + 1] === "C" || arr[i + 1] === "L") {
          filteredArray.push(arr[i] + arr[i + 1])
          i++
        } else {
          filteredArray.push(arr[i])
        }
        break
      case "I":
        if (arr[i + 1] === "X" || arr[i + 1] === "V") {
          filteredArray.push(arr[i] + arr[i + 1])
          i++
        } else {
          filteredArray.push(arr[i])
        }
        break
    }
  }
  return filteredArray
}
```

4. `checkNumeralOrder()` Things get a little more complex now. We've grouped that characters to take account for the 9's and 4's, but you can't have them one after another. The logic is based on order, and can be boiled down into some repeating patterns. So I wrote some expressions that accept arguments and check with corresponding arrays to check wither or not they are ordered correctly. Make sense?

```javascript
const romanArrSmall = [ "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV","I",]
const numberArrSmall = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]

//-----------------------------------------------------------------

function checkNumeralOrder(rom) {
  //array of Numerals in decending order of value
  const nonRepeaters = ["CM", "D", "CD", "XC", "L", "XL", "IX", "V", "IV"]
  const repeaters = ["C", "X", "I"]
  //condition1 is for values like 5 that can't be follwed by a 4. works for 5, 50 and 500
  const condition1 = (val1, val2, cond1, cond2) =>
    romanArrSmall.indexOf(val1) === cond1 &&
    romanArrSmall.indexOf(val2) === cond2 &&
    val2 !== undefined
  //condition2 is for values like 9's and 4's. can't be followed by a 5,4 or 1.
  const condition2 = (val1, val2, cond1, cond2, cond3) =>
    (romanArrSmall.indexOf(val1) === cond1 &&
      romanArrSmall.indexOf(val2) < cond2 &&
      val2 !== undefined) ||
    (romanArrSmall.indexOf(val1) === cond3 &&
      romanArrSmall.indexOf(val2) < cond2 &&
      val2 !== undefined)
  // condition 3 stops C,X or I being repeated more than three times in a row.
  const condition3 = (val1, val2, val3, val4) =>
    repeaters.indexOf(val1) >= 0 &&
    val1 === val2 &&
    val1 === val3 &&
    val1 === val4

  let correctOrderCounter = 0

  //cycle through each value in the array. cross checking our given array with
  //an array of roman numerals in value order.
  for (let x = 0; x < rom.length; x++) {
    //if the value of the numeral is less than that of the next one in the array
    //then it is an invalid order - show an alert and clear input field
    if (
      romanArrSmall.indexOf(rom[x]) > romanArrSmall.indexOf(rom[x + 1]) &&
      rom[x + 1] !== undefined
    ) {
      alert(
        "This is an invalid order of Roman Numerals. wrong order, numerals should be in decending order."
      )
      wipeInput()
      break
    }
    //there are certain numerals that must not be iterated twice in succession
    else if (
      nonRepeaters.indexOf(rom[x]) >= 0 &&
      rom[x] === rom[x + 1] &&
      rom[x + 1] !== undefined
    ) {
      alert(
        "This is an invalid order of Roman Numerals. Some numerals can't repeat like that."
      )
      wipeInput()
      break
    }
    //900(CM) or 400(CD) cannot be follwed by 500(D) or 400 (CD) or 100(C)
    else if (condition2(rom[x], rom[x + 1], 1, 5, 3)) {
      alert(
        "This is an invalid order of Roman Numerals. 900 or 400 can't be followed by a 500,400 or 100."
      )
      wipeInput()
      break
    }
    //500 can't be followed by a 400
    else if (condition1(rom[x], rom[x + 1], 2, 3)) {
      alert("This is an invalid order of Roman Numerals. no 400 after 500.")
      wipeInput()
      break
    }
    //90(XC) or 40(XL) cannot be followed by 50(L), 40(XL), or 10(X)
    else if (condition2(rom[x], rom[x + 1], 5, 9, 7)) {
      alert(
        "This is an invalid order of Roman Numerals. 90 or 40 can't be followed by 50, 40 or 10."
      )
      wipeInput()
      break
    }
    //50(L) can't be followed by a 40(IV)
    else if (condition1(rom[x], rom[x + 1], 6, 7)) {
      alert("This is an invalid order of Roman Numerals. No 40 after 50.")
      wipeInput()
      break
    }
    //9(IX) cannot be followed by a 5(V) or a 4(IV)
    else if (condition2(rom[x], rom[x + 1], 9, 13, 11)) {
      alert(i
        "This is an invalid order of Roman Numerals. 9 or 4 can't by followed by a 5,4 or 1."
      )
      wipeInput()
      break
    }
    //C(100), X(10) and I(1) can be repeated only 3 times.
    else if (condition3(rom[x], rom[x + 1], rom[x + 2], rom[x + 3])) {
      alert(
        "This is an invalid order of Roman Numerals. you cant repeat C,X or I more than three times."
      )
      wipeInput()
      break
    } else {
      correctOrderCounter++
    }
  }
  if (correctOrderCounter === rom.length) {
    return true
  }
  return false
}
```

5.  Now that all the checks are done all that needs done is swap out every numeral with it's corresponding number that I have set in parallel arrays. The index of each value matches the value at the same index of the other array.

### Conclusions

This was a fantastic way of learning conditional logic, refactoring and making the most of traditional switches and loops. To see the evolution of the logic you can refer to my first [repo](https://github.com/SandyWyper/Roman-Numerals) for this project.

PWA's in my opinion are massively under used. I'm not sure why more websites don't use it. You don't have to offer the 'add to home screen' option, but you can still cache a lot of the script that would then sky rocket your TTI ( time to interactive) speed. If you go full hog and embrace the app-like functionality, then you can send notifications to users just like native apps, by checking for updates in the background. Snazzy!
