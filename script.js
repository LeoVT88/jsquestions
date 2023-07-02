

let questionsList = [
    {
        header: `What's the output?`,
        example:
            `function sayHi() {
        console.log(name);
        console.log(age);
        var name = 'Lydia';
        let age = 21;
        }
      
        sayHi();`,
        replyOptions: [
            `A: Lydia and undefined`,
            `B: Lydia and ReferenceError`,
            `C: ReferenceError and 21`,
            `D: undefined and ReferenceError`],
        rightAnswer: 'D',
        explanation: `<p>Within the function, we first declare the name variable with the var keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of undefined, until we actually get to the line where we define the variable. We haven\'t defined the variable yet on the line where we try to log the name variable, so it still holds the value of undefined.</p>
    <p>Variables with the let keyword (and const) are hoisted, but unlike var, don't get initialized. They are not accessible before the line we declare (initialize) them. This is called the "temporal dead zone". When we try to access the variables before they are declared, JavaScript throws a ReferenceError.</p>`
    },
    {
        header: `What's the output?`,
        example:
            `for (var i = 0; i < 3; i++) {
            setTimeout(() => console.log(i), 1);
            }
          
            for (let i = 0; i < 3; i++) {
            setTimeout(() => console.log(i), 1);
          }`,
        replyOptions: [
            `A: 0 1 2 and 0 1 2`,
            `B: 0 1 2 and 3 3 3`,
            `C: 3 3 3 and 0 1 2`],
        rightAnswer: 'C',
        explanation: `<p>Because of the event queue in JavaScript, the setTimeout callback function is called after the loop has been executed. Since the variable i in the first loop was declared using the var keyword, this value was global. During the loop, we incremented the value of i by 1 each time, using the unary operator ++. By the time the setTimeout callback function was invoked, i was equal to 3 in the first example.
        </p>
        <p>
        In the second loop, the variable i was declared using the let keyword: variables declared with the let (and const) keyword are block-scoped (a block is anything between { }). During each iteration, i will have a new value, and each value is scoped inside the loop.
        </p>`
    },
    {
        header: `What's the output?`,
        example:
            `const shape = {
                radius: 10,
                diameter() {
                  return this.radius * 2;
                },
                perimeter: () => 2 * Math.PI * this.radius,
            };
              
            console.log(shape.diameter());
            console.log(shape.perimeter());`,
        replyOptions: [
            `A: 20 and 62.83185307179586`,
            `B: 20 and NaN`,
            `C: 20 and 63`,
            `D: NaN and 63`],
        rightAnswer: 'B',
        explanation: `<p> Note that the value of diameter is a regular function, whereas the value of perimeter is an arrow function.</p>

        <p>With arrow functions, the this keyword refers to its current surrounding scope, unlike regular functions! This means that when we call perimeter, it doesn't refer to the shape object, but to its surrounding scope (window for example).
        </p>
        <p>
        There is no value radius on that object, which returns NaN.
        </p>`
    },
    {
        header: `What's the output?`,
        example:
            `+true;
            !'Lydia';`,
        replyOptions: [
            `A: 1 and false`,
            `B: false and NaN`,
            `C: false and false`
        ],
        rightAnswer: 'A',
        explanation: `<p>The unary plus tries to convert an operand to a number. true is 1, and false is 0.
         <p>
         </p>   
        The string 'Lydia' is a truthy value. What we're actually asking, is "is this truthy value falsy?". This returns false. 
        </p>`
    },
    {
        header: `Which one is true?`,
        example:
            `const bird = {
                size: 'small',
              };
              
              const mouse = {
                name: 'Mickey',
                small: true,
              };`,
        replyOptions: [
            `A: mouse.bird.size is not valid`,
            `B: mouse[bird.size] is not valid`,
            `C: mouse[bird["size"]] is not valid`,
            `D: All of them are valid`
        ],
        rightAnswer: 'A',
        explanation: `<p>In JavaScript, all object keys are strings (unless it's a Symbol). Even though we might not type them as strings, they are always converted into strings under the hood.
        </p>
        <p>
        JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket [ and keeps going until it finds the closing bracket ]. Only then, it will evaluate the statement.
        </p>
        <p>
        mouse[bird.size]: First it evaluates bird.size, which is "small". mouse["small"] returns true
        </p>
        <p>
        However, with dot notation, this doesn't happen. mouse does not have a key called bird, which means that mouse.bird is undefined. Then, we ask for the size using dot notation: mouse.bird.size. Since mouse.bird is undefined, we're actually asking undefined.size. This isn't valid, and will throw an error similar to Cannot read property "size" of undefined. 
        </p>`
    },
    {
        header: `What's the output?`,
        example:
            `let c = { greeting: 'Hey!' };
            let d;
            
            d = c;
            c.greeting = 'Hello';
            console.log(d.greeting);`,
        replyOptions: [
            `A: Hello`,
            `B: Hey!`,
            `C: undefined`,
            `D: ReferenceError`,
            `E: TypeError`
        ],
        rightAnswer: `A`,
        explanation: `<p> In JavaScript, all objects interact by reference when setting them equal to each other.</p>
        <p>First, variable c holds a value to an object. Later, we assign d with the same reference that c has to the object.</p>
        <p>When you change one object, you change all of them.</p>`
    },
    {
        header: `What's the output?`,
        example:
            `let a = 3;
            let b = new Number(3);
            let c = 3;
            
            console.log(a == b);
            console.log(a === b);
            console.log(b === c);`,
        replyOptions: [
            `A: true false true`,
            `B: false false true`,
            `C: true false false`,
            `D: false true true`
        ],
        rightAnswer: `C`,
        explanation: `<p> new Number() is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object.</p>
        <p>When we use the == operator (Equality operator), it only checks whether it has the same value. They both have the value of 3, so it returns true.</p>
        <p>However, when we use the === operator (Strict equality operator), both value and type should be the same. It's not: new Number() is not a number, it's an object. Both return false.</p>`
    },
    {
        header: `What's the output?`,
        example:
            `class Chameleon {
                static colorChange(newColor) {
                  this.newColor = newColor;
                  return this.newColor;
                }
              
                constructor({ newColor = 'green' } = {}) {
                  this.newColor = newColor;
                }
              }
              
              const freddie = new Chameleon({ newColor: 'purple' });
              console.log(freddie.colorChange('orange'));`,
        replyOptions: [
            `A: orange`,
            `B: purple`,
            `C: green`,
            `D: TypeError`
        ],
        rightAnswer: `D`,
        explanation: `<p>The colorChange function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since freddie is an instance of class Chameleon, the function cannot be called upon it. A TypeError is thrown.
        </p>`
    },
    {
        header: `What's the output?`,
        example:
            `let greeting;
            greetign = {}; // Typo!
            console.log(greetign);`,
        replyOptions: [
            `A: {}`,
            `B: ReferenceError: greetign is not defined`,
            `C: undefined`
        ],
        rightAnswer: `A`,
        explanation: `<p>It logs the object, because we just created an empty object on the global object! When we mistyped greeting as greetign, the JS interpreter actually saw this as:
        <ol>
        <li>global.greetign = {} in Node.js</li>
        <li>window.greetign = {}, frames.geetign = {} and self.greetign in browsers.</li>
        <li>self.greetign in web workers.</li>
        <li>globalThis.greetign in all environments.</li>
        </ol>
        In order to avoid this, we can use "use strict". This makes sure that you have declared a variable before setting it equal to anything.
        </p>`
    },
    {
        header: `What happens when we do this?`,
        example:
            `function bark() {
                console.log('Woof!');
              }
              
              bark.animal = 'dog';`,
        replyOptions: [
            `A: Nothing, this is totally fine!`,
            `B: SyntaxError. You cannot add properties to a function this way.`,
            `C: "Woof" gets logged.`,
            `D: ReferenceError`
        ],
        rightAnswer: `A`,
        explanation: `<p>This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects)</p>
        <p>
        A function is a special type of object. The code you write yourself isn't the actual function. The function is an object with properties. This property is invocable. 
        </p>`
    },
    {
        header: `What's the output?`,
        example:
            `function Person(firstName, lastName) {
                this.firstName = firstName;
                this.lastName = lastName;
              }
              
              const member = new Person('Lydia', 'Hallie');
              Person.getFullName = function() {
                return ${this.firstName} ${this.lastName};
              };
              
              console.log(member.getFullName());`,
        replyOptions: [
            `A: TypeError`,
            `B: SyntaxError`,
            `C: Lydia Hallie`,
            `D: undefined undefined`
        ],
        rightAnswer: `A`,
        explanation: `<p> In JavaScript, functions are objects, and therefore, the method getFullName gets added to the constructor function object itself. For that reason, we can call Person.getFullName(), but member.getFullName throws a TypeError.
        </p>
        <p>
        If you want a method to be available to all object instances, you have to add it to the prototype property:
        <pre class='question'>
        Person.prototype.getFullName = function() {
          return \`\${this.firstName} \${this.lastName}\`;
        };
        </pre>
        </p>`
    },
    {
        header: `What's the output?`,
        example:
            `function Person(firstName, lastName) {
                this.firstName = firstName;
                this.lastName = lastName;
              }
              
              const lydia = new Person('Lydia', 'Hallie');
              const sarah = Person('Sarah', 'Smith');
              
              console.log(lydia);
              console.log(sarah);`,
        replyOptions: [
            `A: Person {firstName: "Lydia", lastName: "Hallie"} and undefined`,
            `B: Person {firstName: "Lydia", lastName: "Hallie"} and Person {firstName: "Sarah", lastName: "Smith"}`,
            `C: Person {firstName: "Lydia", lastName: "Hallie"} and {}`,
            `D: Person {firstName: "Lydia", lastName: "Hallie"} and ReferenceError`
        ],
        rightAnswer: `A`,
        explanation: `<p>
        or sarah, we didn't use the new keyword. When using new, this refers to the new empty object we create. However, if you don't add new, this refers to the global object!
        </p>
        <p>
        We said that this.firstName equals "Sarah" and this.lastName equals "Smith". What we actually did, is defining global.firstName = 'Sarah' and global.lastName = 'Smith'. sarah itself is left undefined, since we don't return a value from the Person function. 
        </p>`
    },
    {
        header: `What are the three phases of event propagation?`,
        example:
            ``,
        replyOptions: [
            `A: Target > Capturing > Bubbling`,
            `B: Bubbling > Target > Capturing`,
            `C: Target > Bubbling > Capturing`,
            `D: Capturing > Target > Bubbling`
        ],
        rightAnswer: `D`,
        explanation: `<p> 
        During the capturing phase, the event goes through the ancestor elements down to the target element. It then reaches the target element, and bubbling begins.
        </p>`
    },
    {
        header: `All object have prototypes.`,
        example:
            ``,
        replyOptions: [
            `A: true`,
            `B: false`
        ],
        rightAnswer: `B`,
        explanation: `<p>All objects have prototypes, except for the base object. The base object is the object created by the user, or an object that is created using the new keyword. The base object has access to some methods and properties, such as .toString. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you. 
        </p>`
    },
    {
        header: `What's the output?`,
        example:
            `function sum(a, b) {
                return a + b;
              }
              
              sum(1, '2');`,
        replyOptions: [
            `A: NaN`,
            `B: TypeError`,
            `C: "12"`,
            `D: 3`
        ],
        rightAnswer: `C`,
        explanation: `<p>
        JavaScript is a dynamically typed language: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called implicit type coercion. Coercion is converting from one type into another.
        </p>
        <p>
        In this example, JavaScript converts the number 1 into a string, in order for the function to make sense and return a value. During the addition of a numeric type (1) and a string type ('2'), the number is treated as a string. We can concatenate strings like "Hello" + "World", so what's happening here is "1" + "2" which returns "12". 
        </p>`
    },
    {
        header: `What's the output?`,
        example:
            `let number = 0;
            console.log(number++);
            console.log(++number);
            console.log(number);`,
        replyOptions: [
            `A: 1 1 2`,
            `B: 1 2 2`,
            `C: 0 2 2`,
            `D: 0 1 2`
        ],
        rightAnswer: `C`,
        explanation: `<p> 
        The <b>postfix</b> unary operator ++:
        <ol>
        <li>Returns the value (this returns 0)</li>
        <li>Increments the value (number is now 1)</li>
        </ol>

        The <b>prefix</b> unary operator ++:
        <ol>
        <li>Increments the value (number is now 2)</li>
        <li>Returns the value (this returns 2)</li>
        </ol>

        This returns 0 2 2.
        </p>`
    },
    {
        header: `What's the output?`,
        example:
            `function getPersonInfo(one, two, three) {
                console.log(one);
                console.log(two);
                console.log(three);
              }
              
              const person = 'Lydia';
              const age = 21;
              
              getPersonInfo\`\${person} is \${age} years old\`;`,
        replyOptions: [
            `A: "Lydia" 21 ["", " is ", " years old"]`,
            `B: ["", " is ", " years old"] "Lydia" 21`,
            `C: "Lydia" ["", " is ", " years old"] 21`
        ],
        rightAnswer: `B`,
        explanation: `<p>If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions! 
        </p>`
    },
    {
        header: `What's the output?`,
        example:
            `function checkAge(data) {
                if (data === { age: 18 }) {
                  console.log('You are an adult!');
                } else if (data == { age: 18 }) {
                  console.log('You are still an adult.');
                } else {
                  console.log(\`Hmm.. You don't have an age I guess\`);
                }
              }
              
              checkAge({ age: 18 });`,
        replyOptions: [
            `A: You are an adult!`,
            `B: You are still an adult.`,
            `C: Hmm.. You don't have an age I guess`
        ],
        rightAnswer: `C`,
        explanation: `<p>
        When testing equality, primitives are compared by their value, while objects are compared by their reference. JavaScript checks if the objects have a reference to the same location in memory.
        </p>
        <p>
        The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used in order to check equality.
        </p>
        <p>
        This is why both { age: 18 } === { age: 18 } and { age: 18 } == { age: 18 } return false. 
        </p>`
    },
    {
        header: `What's the output?`,
        example:
            `function getAge(...args) {
                console.log(typeof args);
              }
              
              getAge(21);`,
        replyOptions: [
            `A: "number"`,
            `B: "array"`,
            `C: "object"`,
            `D: "NaN"`
        ],
        rightAnswer: `C`,
        explanation: `<p> he rest parameter (...args) lets us "collect" all remaining arguments into an array. An array is an object, so typeof args returns "object"</p>`
    },
    {
        header: `What's the output?`,
        example:
            `function getAge() {
                'use strict';
                age = 21;
                console.log(age);
              }
              
              getAge();`,
        replyOptions: [
            `A: 21`,
            `B: undefined`,
            `C: ReferenceError`,
            `D: TypeError`
        ],
        rightAnswer: `C`,
        explanation: `<p>With "use strict", you can make sure that you don't accidentally declare global variables. We never declared the variable age, and since we use "use strict", it will throw a reference error. If we didn't use "use strict", it would have worked, since the property age would have gotten added to the global object. 
        </p>`
    },

]

let arr = []; 
let questions = [];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

while (arr.length < 10) {
    let randomInt = getRandomInt(questionsList.length-1);
    if (arr.indexOf(randomInt) < 0) { 
    arr.push(randomInt);}
}

for (let i = 0; i < 10; i++) {
    questions[i] = questionsList[arr[i]];
}

class Question {
    constructor(questions) {
        this.questions = questions;
        this.answers = [];
        this.rightAnswerCount = 0;
        this.elem = document.createElement('div');
        this.elem.classList.add('question');
        this.elem.innerHTML = `
            <div class="buttons">
            <button disabled="disabled" name="previous">Previous</button>
            <button name="next">Next</button>
            </div>
        `


        this.questionBlock = document.createElement('div');
        this.questionBlock.classList.add('questionBlock')
        this.i = 0;

        this.renderQuestion(this.questions[this.i]);

        this.elem.prepend(this.questionBlock);

        let next = this.elem.querySelector('button[name="next"]'),
            previous = this.elem.querySelector('button[name="previous"]');

        next.addEventListener('click', () => {
            this.i = this.i + 1;

            if (this.i == this.questions.length - 1) {
                next.innerHTML = `End`;
            }

            if (this.i < this.questions.length) {

                if (this.answers.length <= this.i) {
                    this.questionBlock.innerHTML = '';
                    this.renderQuestion(this.questions[this.i]);
                    this.elem.prepend(this.questionBlock);
                    previous.disabled = false;
                }

                else {
                    this.questionBlock.innerHTML = '';
                    this.renderQuestion(this.questions[this.i]);
                    this.elem.prepend(this.questionBlock);
                    this.elem.querySelectorAll('input').forEach(element => {
                        element.disabled = true;
                    });
                    this.elem.querySelector(`input[data-choice=${this.answers[this.i]}]`).checked = true;

                    let answer = this.questionBlock.querySelector('.answer');
                    answer.classList.remove('visually-hidden');

                    let span = document.createElement('span');
                    if (this.answers[this.i] == this.questions[this.i].rightAnswer) {
                        span.innerHTML = `You're right!<br>`;
                        answer.prepend(span);
                        answer.classList.add('right-answer');
                    }
                    else {
                        span.innerHTML = `Try again<br>`;
                        answer.prepend(span);
                        answer.classList.add('wrong-answer');
                    }
                    previous.disabled = false;
                }

            }
            else {
                this.questionBlock.innerHTML = `Thanks for your answers! Your result is ${this.rightAnswerCount} out of 10 <br>
                                                ${this.rightAnswerCount < 5 ? 'Try harder next time and you will be fine!' : 'You are good, but don\'t stop improve yourself!'}`;
                this.elem.querySelector('.buttons').classList.add('visually-hidden')
            }
        })

        previous.addEventListener('click', () => {
            this.i = this.i - 1;

            if (this.i <= 0) {
                previous.disabled = true
            }

            this.questionBlock.innerHTML = '';
            this.renderQuestion(this.questions[this.i]);
            this.elem.prepend(this.questionBlock);

            if (this.answers[this.i]) {
                this.elem.querySelectorAll('input').forEach(element => {
                    element.disabled = true;
                });
                this.elem.querySelector(`input[data-choice=${this.answers[this.i]}]`).checked = true;

                let answer = this.questionBlock.querySelector('.answer');
                answer.classList.remove('visually-hidden');

                let span = document.createElement('span');
                if (this.answers[this.i] == this.questions[this.i].rightAnswer) {
                    span.innerHTML = `You're right!<br>`;
                    answer.prepend(span);
                    answer.classList.add('right-answer');
                }
                else {
                    span.innerHTML = `Try again<br>`;
                    answer.prepend(span);
                    answer.classList.add('wrong-answer');
                }
            }
        })
    }

    renderQuestion(question) {
        this.questionBlock.innerHTML = `
            <h3 class="header">${question.header}</h3>
            <pre class="example">${question.example}</pre>
                <ul class="options">
                </ul>
            <button disabled="disabled" name="reply">Reply</button>
            <div class="answer visually-hidden"><b>Answer: ${question.rightAnswer}</b>
            ${question.explanation}
            </div>
        `

        let reply = this.questionBlock.querySelector('button[name="reply"]'),
            answer = this.questionBlock.querySelector('.answer'),
            options = this.questionBlock.querySelector('.options');

        for (let i = 0; i < question.replyOptions.length; i++) {
            let listItem = document.createElement('li');
            listItem.innerHTML = `<input type="radio" name="answer" data-choice="${question.replyOptions[i][0]}">${question.replyOptions[i]}</input>`;
            options.append(listItem);
        }

        options.addEventListener('change', () => {
            reply.disabled = false;
        });

        reply.addEventListener('click', () => {

            answer.classList.remove('visually-hidden');
            options.querySelectorAll('input').forEach(element => {
                element.disabled = true;
            });

            let chosenOption = options.querySelector('input:checked').dataset.choice;
            this.answers.push(chosenOption);

            let span = document.createElement('span');
            if (chosenOption == question.rightAnswer) {
                span.innerHTML = `You're right!<br>`;
                answer.prepend(span);
                answer.classList.add('right-answer');
                this.rightAnswerCount = this.rightAnswerCount+1;
            }
            else {
                span.innerHTML = `Try again<br>`;
                answer.prepend(span);
                answer.classList.add('wrong-answer');
            }

            reply.disabled = true;
        });

    }
}

let questionHolder = document.querySelector('.question-holder');
let questionRender = new Question(questions);
questionHolder.append(questionRender.elem);