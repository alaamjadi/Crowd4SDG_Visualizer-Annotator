# Social Distancing Project
A project for Crowd4SDG project which was developed by SK at Politecnico di Milano

### Opening the app
[Local server](http://localhost:3000)

[Deployment on Heroku](https://social-distancing-project.herokuapp.com)

### Installing the dependencies
```
npm install
```

### Running the server
To run the server, run:
```
npm start
```

or
```
node index.js
```

To view the program:
```
open http://localhost:3000
```

### Instructions
1) Click on New Question

2) Insert the question and possible answers (use a semicolon to separate answers. Don't use whitespace character in the answer field, instead you can use dash character. Don't start any of the answers with a special character.)

3) Click on the OK button. If you use this in the middle of your procedure it will reset the whole process (Everything will be cleaned).

4) Load the input CSV file which contains the Twitter ID and the Image URL.

5) If you need to select an answer for all the pictures with one click, just use the "Check All" button. This option is disabled before inserting answers.

6) When you are done with all the sets of input CSV files, the result output CSV file can be download by pressing the submit button. The app keeps the result dictionary and it will clear it whenever you reload the page or insert a new question. I recommend downloading the intermediate results if in case the browser crashed you don't lose your progress and in the end, you will have the accumulated results in the last output CSV file.

### Notes
- You have to split the input CSV files if they have more than 500 entries.
- It's better to split the input CSV files for every 300-400 entries. The less the entries you have in one file, the less time you wait for the page to load and decreases the possibility of memory overflow.
- You can split the input CSV file using [this](https://www.filesplit.org) website. Remember to choose 1 line for the header.
- If you want to clear the answers you have to either change the question or reload the page.
- Use the submit button for each input CSV file and you will get the accumulated result in the last output file.
- If a picture does not exist, it will be added to the output CSV file with "ImageNotFound" as an answer.
- If the buttons are not working, a picture is not loaded completely or you can see the buttons but the pictures aren't there, it means the loading part is not finished yet. Please be patient for a couple of seconds.
- This app has been tested for input CSV files with 500 entries and in total with accumulated 3500 entries without facing any crashes. The browser consumed 1-3GB of RAM.

### License
This resource can be used freely if integrated or build upon in personal projects such as websites, web apps, and web templates intended for personal or academic purposes only. It is not allowed to take the resource "as-is" and sell it, redistribute, re-publish it, or sell "plagiarized" versions of it. Any built using this resource should have a visible mention and link to the original work. Always consider the licenses of all included libraries, scripts, and images used.
