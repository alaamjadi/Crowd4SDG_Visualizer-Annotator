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

### Instructions (How to use the Application)
1) Click on New Question

2) Insert the question and possible answers (use a semicolon to separate answers.Don't use special characters in the answers.)

3) Click on the OK button. If you use this in the middle of your procedure it will reset the whole process (Everything will be cleaned).

4) Load the input CSV file which contains the Twitter ID and the Image URL.

5) If you need to select an answer for all the pictures with one click, just use the "Check All" button. This option is disabled before inserting answers.

6) When you are done with all the sets of input CSV files, the result output CSV file can be download by pressing the submit button.

### Notes
- If a picture does not exist, it will be added to the output CSV file with "Image Not Found" as an answer.
- The loading of images for each page might take 2-5 seconds to load, please be patient.
- This app has been tested for a CSV files with 10K entries without any problem.

### License
This resource can be used freely if integrated or build upon in personal projects such as websites, web apps, and web templates intended for personal or academic purposes only. It is not allowed to take the resource "as-is" and sell it, redistribute, re-publish it, or sell "plagiarized" versions of it. Any built using this resource should have a visible mention and link to the original work. Always consider the licenses of all included libraries, scripts, and images used.
