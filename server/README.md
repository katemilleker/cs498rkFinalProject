Input data for all paths are added to the body, as url-encoded form data (I belive the same as mp3)

Auth paths

    POST: /login - login for jobseeker, requires "email" and "password" fields

    POST: /loginrec - login for recruiter, requires "email" and "password" fields

    POST: /register - register for jobseeker, requires "email", "password", and "name" fields

    POST: /registerrec - register for recruiter, requires "email", "password", and "name" fields

    GET: /logout


Profile paths - paths specifically for jobseeker

    GET: /profile - gets all data for a given user ()
    PUT: /profile - edit the user data, with data in query fields
