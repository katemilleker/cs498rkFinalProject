Input data for all paths are added to the body, as url-encoded form data (I belive the same as mp3)

Auth paths

    POST: /login - login for jobseeker, requires "email" and "password" fields

    POST: /loginrec - login for recruiter, requires "email" and "password" fields

    POST: /register - register for jobseeker, requires "email", "password", and "name" fields

    POST: /registerrec - register for recruiter, requires "email", "password", and "name" fields

    GET: /logout


Profile paths - paths for jobseeker

    GET: /profile - gets all data for a given user ()
      - This one also works for getting all data for a recruiter!
    PUT: /profile - edit the user data, with data in query fields

Resume paths
    PUT: /upload - upload pdf to for a user.
    GET: /upload/:id - get resume to be viewed, parameter is the id of the resume,
                        which is user.resume

Recruiter paths
    GET: /savedResumes - get all resumes in the saved category
    GET: /deletedResumes - get all resumes in the saved category
    GET: /acceptedResumes - get all resumes in the saved category
    POST: /save - save a user to the recruiter's list
      - user_id = id of user to save
      - status = status of user to save
          "saved" = saved status
          "accepted" = accepted status
          "deleted" = deleted status
      - The status is optional (default is saved), and if user_id is already in
        recruiter's list, the status is just updated.
