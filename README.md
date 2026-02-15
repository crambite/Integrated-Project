# Blackbox Protocol 

## Website Link
https://crambite.github.io/Integrated-Project/

## Website description
Blackbox Protocol is a browser-based Python coding game that teaches programming fundamentals through interactive gameplay and narrative progression. Instead of passively reading tutorials, users actively write real Python code to control a robot navigating maze-based environments. Every movement, turn, and action is triggered through code written in an embedded editor and executed directly in the browser. 

The project combines gamification, storytelling, and real-time code execution to create an engaging learning experience. By integrating puzzles, replayable levels, combat mechanics, and progression through story-driven Acts, Blackbox Protocol transforms coding practice into an immersive mission-based journey. 

# Design Process 
Blackbox Protocol is designed for beginner programmers and students who want to learn Python fundamentals in a more interactive and engaging way. Many learners struggle with traditional text-heavy tutorials because they lack immediate feedback and real application. This project addresses that by allowing users to write code and instantly see the outcome through character movement and in-game actions. 

## Users want to achieve three main things: 
- Understand Python fundamentals. 
- Apply logic to solve structured problems. 
- Feel motivated and rewarded while learning. 

## Blackbox Protocol helps them achieve these goals by: 
- Executing real Python code in-browser using Pyodide. 
- Connecting programming logic directly to movement mechanics. 
- Allowing replayable levels with multiple valid solutions. 
- Embedding puzzles within a story-driven progression system. 

## User Stories 
- As someone who wants to get into programming, I want to learn a high-level language in a fun an engaging way 
- As a beginner programmer, I enforce my concepts and brush up on my skills. 
- As a player, I want multiple valid solutions so that I can experiment with different coding approaches. 
- As a learner, I want trackable milestones to gauge my current progress. 
- As a consumer, I want tangible rewards in return for my completion of the game. 
- As a self seeker, I want tangible proof or recognition of my effort in completing the game. 
- As an achiever, I want harder challenges for me to complete. 
- As a free-spirit, I want to replay completed levels so that I can refine and optimize my code. 

## Wireframe 
We made a basic Low Fidelity Figma in the first weeks of the IP. We used basic shapes to map out where each feature was supposed to go. It helped us see how we wanted to lay things out and position our elements.

# Features 
In this section, the main features of Blackbox Protocol are outlined below. 

## Existing Features 
- Contact Us - allows users to contact us about their queries or requests. 
- Python Code Execution - allows users to write real Python code in the text editor and allow them to see real time results. 
- Movement - allows users to use up(), down(), left(), right() to move along the 4 cardinal directions 
- Checks - allows users to use is_intersection() and is_dead_end() to check whether they are at an intersection or dead end. 
- Combat - allows users to use shoot() to interact with enemies. 
- Visual Novel - allows users to progress through narrative Acts between gameplay levels. 
- Account - allows users to register, login, and store progress. 
- Replayable Levels - allows users to revisit completed maps to test alternative coding solutions. 
- Adjustable Settings - allows users to control volume, brightness, and text speed. 
- Badge Progression System - bronze, silver, gold, platinum tiers with unique requirements for each map. 
- Badges Screen - allows users to track their current badges, view their referral code and collect their certificate. 
- Unique Referral Code - upon completing the game, a unique 6 digit referral code can be found in the badges screen. 
- Using Referral Codes - in the badges screen, another player's 6 digit referral code can be entered for them to recieve a $5 starbucks voucher. 
- Voucher Upon Completion - upon completing the game, the player will recieve a $20 starbucks voucher. 
- Certificate Collection - upon completing the game, users can collect their certificate. 
- Upgrading Certificates - based on the tier of badges collected, the user's certificate will be upgraded (completion, achievement, excellence and mastery). 

## Features Left to Implement 
- In-website voucher manager. 
- Procedurally generated mazes for players who fully completed the game. 
- Expanded enemy AI mechanics. 
- Forget password system. 

# Technologies Used 
 
## HTML 
Used to structure the web pages and game layout. 

## CSS 
Used to design the VN-style interface and responsive layouts. 

## JavaScript 
Used for core game logic, DOM manipulation, and movement systems. 

## Pyodide 
Used to execute real Python code directly in the browser. 
https://pyodide.org/ 

## Ace Editor 
Used as the embedded code editor for writing Python scripts. 
https://ace.c9.io/ 

## RESTDB 
Used as the cloud database for login and progress storage. 
https://restdb.io/ 

## Lottie 
Used to implement animated loading screens. 
https://lottiefiles.com/ 

# Assistive AI 
AI tools were used to assist in the development of certain features and debugging processes. 

## Pyodide Integration 

ChatGPT was used to help structure asynchronous loading logic, inject JavaScript functions into the Python runtime, and handle error-catching scenarios. 

 

## Movement Queue System 

ChatGPT assisted in refining the interval execution logic and debugging collision edge cases. 

## RESTDB Integration 
ChatGPT helped construct PATCH requests, configure API headers, and debug asynchronous update issues. 

# Testing 

## Test Cases 

### Registration System 
1. Navigate to the register page. 
2. Submit an empty form and verify that required field errors appear. 
3. Submit invalid input and verify that validation errors appear. 
4. Submit valid data and verify that account creation succeeds. 

### Login System 
1. Navigate to the login page. 
2. Submit an empty form and verify that required field errors appear. 
3. Submit invalid input and verify that validation errors appear. 
4. Submit valid input and verify that login succeeds. 

### Movement System 
1. Navigate to a random level. 
2. Enter up(), down(), left() or right() and verify the robot moves in the particular direction used. 
3. Enter multiple movement commands and verify that they execute sequentially. 
4. Attempt to move into a wall and verify that movement is blocked. 

### Loop Execution 
1. Navigate to a random level. 
2. Enter a for loop containing movement commands. 
3. Verify that repeated movement executes correctly.  

### Check System 
1. Navigate to a random level. 
2. Enter a while true loop containing movement commands. 
3. In the while loop, use is_intersection() and is_dead_end() to break out of the loop. 
4. Verify that when the robot is at a intersection or a dead end, the while loop is broken out of. 

### Enemies
1. Navigate to a random level. 
2. Use the provided functions to move around the map to find an enemy and stop near it.
3. Press the run button with nothing in the text editor 5 times.
4. Verify that the enemy moves at least once in the 5 turns.
5. Walk into the enemy and verify that "you died" is displayed on the screen and the level is reset.

### Combat System 
1. Navigate to a random level. 
2. Use the provided functions to move around the map to find an enemy and stop 3 tiles away. 
3. Enter shoot(). 
4. Verify that the enemy is not removed and only a sound effect is played. 
5. Move within 2 tiles of the enemy 
6. Verify that the enemy is removed, a sound effect is played and a red line draws from the playe to the enemy. 

### Win Screen
1. Navigate to a random level. 
2. Complete the level by reaching the exit. 
3. For testing purposes, use the debug() function to teleport to the exit.
4. Verify that a win screen with badges and the next button appears

### Visual Novel
1. Navigate to a random level. 
2. Complete the level by reaching the exit. 
3. For testing purposes, use the debug() function to teleport to the exit.
4. Press the "next" button on the win screen.
5. Verify that you are brought to a visual novel screen and a 3d model of a robot appears with text.
6. Complete all other levels and go to the visual novel screen.
7. Verify that each level has it's own unique text.
8. Verify that the model of the robot upgrades 3 times thoughout the whole process.

### Badges 
1. Navigate to a random level. 
2. Complete the level by reaching the exit. 
3. For testing purposes, use the debug() function to teleport to the exit. 
4. Verify that the correct badges are displayed based on the number of turns taken. 
5. Complete a different level within different turn thresholds (navigate to badges screen to see specific thresholds) to confirm that badge tiers are awarded correctly. 
6. Replay the same level in step 5. and confirm that badge results update correctly based on new performance. 
7. Navigate to badges screen and verify that the badges on the badges screen are not affected by the new results. 

### Certificates and referral
1. Navigate to the settings page.

### Save Settings 
1. Navigate to the settings page. 
2. Randomly change the settings as you like. 
3. Verify that upon pressing save, the settings are not reset upon leaving for another screen. 

### Game Save On Register 
1. Make some progress while not logged in. 
2. Proceed to register an account.
3. Verify that progress is saved and not reset. 

## Tested Layouts in Chrome Developer Tools 

### Desktops and Tablets 
1920×1080  
1366×768 
1440×900 
1536×864 
1280×720 
1600×900 
1360×768 
1024×768 

### Mobile (Scrollable when contents exit 100vh) 
NOTE: Blackbox Protocol is meant to only be played on LANDSCAPE 
360×640 
414×896 
375×812 
412×915 
390×844 

## Known Bugs 
Creating an infinite loop in the text editor crashes the website (unresolved) 
Pyodide runs asynchronously with JavaScript, therefore spamming the queue to move the player and crashing the website when while true is used (resolved) 
Spamming run multiple times would cause the Pyodide to run the code multiple times (resolved) 

# Credits 

## Content 

## Media 
Lottie animations were obtained from https://lottiefiles.com 

## Acknowledgements 
Inspiration was drawn from gamification frameworks such as Bartle’s Player Types and intrinsic/extrinsic motivation models. 

 

 