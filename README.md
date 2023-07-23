# Coding Assignment

The goal is to demonstrate your ability to build features and your coding style. Given the limited time, you will have to decide what to prioritize, balancing clean code and completing the assignment.

The app is small but one could easily spend many days working on it: creating a beautiful UI, testing every method or carefully optimizing each line of code. Do as much as you can in two hours and share the results.

## Getting Started

*Do not fork* this repo. Instead download the zip.

Then install the packages and you're good to go!

```bash
npm install

# run app
npm run start

# run tests
npm run test
```

## Tasks managing application

Build a task managing app, where the user can add, filter, assign, and complete tasks.

* The app should have two screens: the list screen and the details screen. Use the Angular router to manage the
  transitions between them.
* Use your favorite library for state management, you can use a different approach if you think it fits better.
* Write a few tests. The goal here is not to build a production-quality app, so don't test every single detail.
  Two or three tests should be good enough.
* Don't forget about error handling and race conditions.

## Submitting your solution

Please send us the link to your repo on GitHub, Gitlab, etc. Please also indicate approximately how long you spent on the submission.

## Time spent and Features
Time spent: 10 hours.

Features:
* Create banner
* Create form to add new Task in home page
* Create Form has validate
* Home page can redirect to detail page to see all tasks
* Home page only show 4 latest tasks
* You can delete task on home page
* Detail page show all tasks as table
* You can Search and Sort on detail page
* Detail page have all features to do with task: Edit, Make Done, Delete
* When click edit on detail page, Edit Component popup show up
* You can edit task and click Save to submit new value or Cancel to return to detail page
* Edit form has validate
* When redirect to wrong URL, NotFoundComponent show up with Back button, click Back button to redirect to home page
* Create loading screen when loading
* Use animation css for loading
