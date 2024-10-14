 Facial Recognition App on AWS

#### Overview
This project is a **Facial Recognition App** built from scratch using AWS services, including **Amazon Rekognition**, **Lambda**, **DynamoDB**, **API Gateway**, and **S3**. The app automates the process of identifying employees based on their facial features and integrates various AWS services to perform face detection and recognition.

#### Architecture
The key AWS components used in this app are:
1. **Amazon S3**: Stores visitor images.
2. **Amazon Rekognition**: Identifies faces and matches them with employee data stored in DynamoDB.
3. **AWS Lambda**: Orchestrates the image retrieval, face recognition, and employee data lookup.
4. **Amazon DynamoDB**: Stores employee details and matches employee face data (using `rekognitionId` as the key).
5. **Amazon API Gateway**: Provides a RESTful interface that allows external clients to upload images and trigger the recognition process.

#### Workflow
1. A visitor uploads their image, which is stored in **S3**.
2. **API Gateway** triggers the **Lambda function**, passing the uploaded image's `ObjectKey` (unique image identifier).
3. **Lambda** fetches the image from **S3** and sends it to **Rekognition** for analysis.
4. **Rekognition** compares the uploaded image against the existing collection of employee faces. If a match is found, the `rekognitionId` is used to query the **DynamoDB** table for employee details.
5. **DynamoDB** returns the employee's details (e.g., name), which are sent back to the client via **API Gateway**.

#### AWS Services Used
- **Amazon S3**: Stores uploaded visitor images.
- **Amazon Rekognition**: Handles face detection and matching.
- **AWS Lambda**: Executes the backend logic for recognizing and identifying employees.
- **Amazon DynamoDB**: Stores employee details, such as name and `rekognitionId`.
- **Amazon API Gateway**: Allows external systems to interface with the backend by providing HTTP endpoints.

### How to Deploy
1. **S3 Setup**: 
   - Create an S3 bucket (e.g., `visitor-image-profiling`) to store uploaded images.
2. **Rekognition Setup**: 
   - Create a collection in Amazon Rekognition (e.g., `employees`) and populate it with employee face data.
3. **DynamoDB Setup**:
   - Create a DynamoDB table (`employee`) with a partition key `recID` to store employee details.
4. **Lambda Setup**: 
   - Deploy the provided Lambda function, ensuring that it has proper permissions to access **S3**, **Rekognition**, and **DynamoDB**.
5. **API Gateway Setup**:
   - Create an API Gateway that allows external HTTP requests to trigger the Lambda function.

### API Endpoint
- **Method**: `GET`
- **Endpoint**: `https://your-api-gateway-url/dev/employee`
- **Parameters**:
  - `ObjectKey`: The key of the image uploaded to the S3 bucket.

### Future Enhancements
- Add user authentication to restrict access to the API.
- Integrate CloudWatch alarms to monitor and alert for errors in the recognition process.
- Add support for more detailed face analysis (e.g., age detection, emotion detection).
- Improve error handling and provide more detailed feedback to the end-user.

---



 1. **Lambda Function**
The Lambda function is the core of the application, responsible for handling the image recognition and querying DynamoDB for employee details. 
