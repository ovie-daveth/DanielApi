## User Authentication System
  The authentication system relies on sessions stored on the server-side and cookies stored on the client-side. Sessions are managed by the server and end after 30 minutes of inactivity. Upon successful signup or signin, the server responds with user data, including an session identifier (id) (set in the cookie header), username, and email.

#### Sign Up
  - Endpoint: /signup.
  - Method: POST.

  Request Payload:
  ```JSON
  {
    "username": "WillyWonka",
    "email": "willywonka@gmail.com",
    "password": "willy123",
  }
  ```

  Response:
  ```JSON
  {
    "message": "User saved successfully",
    "data": {
      "id": "123pf0djgo",
      "username": "WillyWonka",
      "email": "willywonka@gmail.com",
    }
  }
  ```
#### Sign In
  - Endpooint: /signin.
  - Method: POST.

  Request Payload:
  ```JSON
  {
    "email": "willywonka@gmail.com",
    "password": "willy123",
  }
  ```

  Response:
  ```JSON
  {
    "message": "User login successfully",
    "data": {
      "id": "123pf0djgo",
      "username": "WillyWonka",
      "email": "willywonka@gmail.com",
    }
  }
  ```

  #### Sign Out.
    - Endpoint: /signout.

    To sign out, a simple GET request to /signout is made, which destroys the session on the server, effectively logging the user out.

