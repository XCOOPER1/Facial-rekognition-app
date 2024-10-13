import { useState } from 'react';
import './App.css';
const uuid = require("uuid");

function App() {
  const [image, setImage] = useState(null);  // Initialize as null for no image
  const [uploadResultMessage, setUploadResultMessage] = useState('Please upload an image to authenticate');
  const [ImgName, setImageName] = useState('placeholder.jpeg');
  const [isAuth, setAuth] = useState(false);

  function sendImage(e) {
    e.preventDefault();
    if (!image) {
      setUploadResultMessage("Please select an image before authenticating.");
      return;
    }

    setImageName(image.name);
    const visitorImageName = uuid.v4();

    fetch(`https://li5pxxa9q0.execute-api.us-east-1.amazonaws.com/devTest/visitor-image-profiling/${visitorImageName}.jpeg`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/jpeg'
      },
      body: image
    }).then(async () => {
      const response = await authenticate(visitorImageName);
      if (response.Message === 'Success') {
        setAuth(true);
        setUploadResultMessage(`Hi ${response['firstName']} ${response['lastName']}, welcome to work. Have a great day. CEO Cooper`);
      } else {
        setAuth(false);
        setUploadResultMessage('Authentication Failed: this person is not an employee.');
      }
    }).catch(error => {
      setAuth(false);
      setUploadResultMessage('There is an error during the authentication process. Please try again.');
      console.error(error);
    });
  }

  async function authenticate(visitorImageName) {
    const requestUrl = 'https://li5pxxa9q0.execute-api.us-east-1.amazonaws.com/devTest/employee?' + new URLSearchParams({
      ObjectKey: `${visitorImageName}.jpeg`
    });
    return await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then((data) => {
        return data;
      }).catch(error => console.error(error));
  }

  return (
    <div className="App">
      <h2>Cooper Facial Recognition System</h2>
      <form onSubmit={sendImage}>
        <input type='file' name='image' onChange={e => setImage(e.target.files[0])} />
        <button type='submit'>Authenticate</button>
      </form>
      <div className={isAuth ? 'success' : 'failure'}>{uploadResultMessage}</div>
      {
        image ? (
          <img src={URL.createObjectURL(image)} alt="Visitor" height={250} width={250} />
        ) : (
          <img src={require(`./visitors/${ImgName}`)} alt="Visitor" height={250} width={250} />
        )
      }
    </div>
  );
}

export default App;
