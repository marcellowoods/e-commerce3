# e-commerce3

make .env file in client directory

  for development:
  ```
  REACT_APP_REGISTER_REDIRECT_URL='http://localhost:3000/register/complete'
  REACT_APP_FORGOT_PASSWORD_REDIRECT='http://localhost:3000/login'
  REACT_APP_API='/api'
  ```
  

  for production:
  ```
  REACT_APP_REGISTER_REDIRECT_URL='http://{ip or domain-name}/register/complete'
  REACT_APP_FORGOT_PASSWORD_REDIRECT='http://{ip or domain-name}/login'
  REACT_APP_API='/api'
  ```


make .env file in server directory
  ```
  MONGO_URI = mongodb+srv://{username}:...string
  PORT=8000

  CLOUDINARY_CLOUD_NAME = string
  CLOUDINARY_API_KEY = string
  CLOUDINARY_API_SECRET = string
  CLOUDINARY_FOLDER = string

  GMAIL_USER = string
  GMAIL_PASS = string

  MAILTRAP_USER = string
  MAILTRAP_PASS = string

  MAILGUN_AUTH = string
  ```

Add the Firebase Admin SDK to server - https://firebase.google.com/docs/admin/setup   
  add fbServiceAccountKey to server/config/  

Add firebaseConfig to client  
  get firebaseConfig from firebase console,  
  project settings, upper left corner  
  add firebaseConfig.js to client/src/firebase/ in the following format  
    ```  
    let firebaseConfig = {
        
    };
    export default firebaseConfig;
    ```

