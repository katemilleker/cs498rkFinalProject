Input data for all paths are added to the body, as url-encoded form data (I belive the same as mp3)

Auth paths

    POST: /login - login for jobseeker, requires "email" and "password" fields

    POST: /loginrec - login for recruiter, requires "email" and "password" fields

    POST: /register - register for jobseeker, requires "email", "password", and "name" fields

    POST: /registerrec - register for recruiter, requires "email", "password", and "name" fields

    GET: /logout


Profile paths (these may have to be modified in the future to add functionality)

    GET: /profile - gets all data for a given user (whether it is a recruiter or a jobseeker)
