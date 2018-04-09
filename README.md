# HypeRecruiter
## Project Demo Video: https://youtu.be/5PIxDBmCjBk 
### Final Project for CS 498 RK - Web Programming (FA17)

#### Idea Overview

HypeRecruiter is an application developed to assist recruiters and potential candidates in the context of a career fair and hiring process. Recruiters can scan the QR code associated with a candidate’s account during the career fair and store the Applicant user in a database. All the candidates that show up to a recruiter’s booth are added to the database for further review. 

All applicant users are required to create an account where they share information such as their name, school, major, experience, and a resume. During account creation, HypeRecruiter makes a unique QR code to be associated with that applicant. This unique code will later be scanned by recruiters. All recruiters will save applicants in a singular, shared company database.

While interacting with the candidate, the recruiter can take notes of the candidate and associate that description with a candidate’s account. After the career fair recruiters can iterate over their database and filter candidates into “accepted” and “rejected.” The applicant’s overview and resume is easily accessible which allows recruiters to better filter through the candidates.

Candidates that were approved get pushed into a separate database where recruiters can send them notifications or emails to allow for immediate interaction with candidates that they want to bring into the interview phase. 

#### Code Overview

The code for HypeRecruiter has initially been created with the REACT-Native CLI and from there follows certain standards. 
These standards could change and are more a suggestion than anything, but this is an overview:
- Any back-end code is contained within the server/ folder. This code is run from node.js and uses MongoDB as a database.
- Any front-end code is contained within the app/ folder. This is all react-native code.
- The compiled iOS app will be in ios/
- The compiled Android app will be in android/
- All test cases should be in __tests\__/

#### Running the Server
1. Run `npm install` (if not done already)
2. Run `npm run server` 
3. Test that the server is running by sending a GET request to `localhost:3000/test`

Some notes:
- The root file for the server is `server/index.js`. This is the file that node runs when calling npm run server.

#### Team
- Kate Milleker
- Rohan Subramaniam
- Charles Swarts
- Daniel Jamrozik
- Sanchit Dhiman
