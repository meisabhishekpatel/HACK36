from flask import Flask, Response, render_template
from scipy.spatial import distance
from imutils import face_utils
import numpy as np
import pygame  # For playing sound
import time
import dlib
import cv2


app = Flask(__name__)

pygame.mixer.init()
pygame.mixer.music.load('audio1.mp3')
EYE_ASPECT_RATIO_THRESHOLD = 0.3
stay_alert = False

#Minimum consecutive frames for which eye ratio is below threshold for alarm to be triggered
EYE_ASPECT_RATIO_CONSEC_FRAMES = 50

#COunts no. of consecutuve frames below threshold value


#Load face cascade which will be used to draw a rectangle around detected faces.
face_cascade = cv2.CascadeClassifier("haarcascades/haarcascade_frontalface_default.xml")

#This function calculates and return eye aspect ratio
def eye_aspect_ratio(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])

    ear = (A+B) / (2*C)
    return ear

#Load face detector and predictor, uses dlib shape predictor file
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

#Extract indexes of facial landmarks for the left and right eye
(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS['left_eye']
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS['right_eye']


# Initialize video capture from default webcam (index 0)
cap = cv2.VideoCapture(0)
time.sleep(2)

#def generate_frames():
    # while True:
    #     # Read a frame from the webcam
    #     # ret, frame = cap.read()

    #     # if not ret:
    #     #     break

    #     # # Encode the frame as JPEG
    #     # ret, buffer = cv2.imencode('.jpg', frame)

    #     # if not ret:
    #     #     break

    #     # # Convert the frame to bytes and yield it to the client
    #     # yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
def generate_frames():
    COUNTER = 0
    coun_t=0
    big_count=0
    stay_alert = False

    while(True):
        #Read each frame and flip it, and convert to grayscale
        ret, frame = cap.read()
        frame = cv2.flip(frame,1)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        #Detect facial points through detector function
        faces = detector(gray, 0)

        #Detect faces through haarcascade_frontalface_default.xml
        face_rectangle = face_cascade.detectMultiScale(gray, 1.3, 5)

        #Draw rectangle around each face detected
        for (x,y,w,h) in face_rectangle:
            cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)

        #Detect facial points
        for face in faces:

            shape = predictor(gray, face)
            shape = face_utils.shape_to_np(shape)

            #Get array of coordinates of leftEye and rightEye
            leftEye = shape[lStart:lEnd]
            rightEye = shape[rStart:rEnd]

            #Calculate aspect ratio of both eyes
            leftEyeAspectRatio = eye_aspect_ratio(leftEye)
            rightEyeAspectRatio = eye_aspect_ratio(rightEye)

            eyeAspectRatio = (leftEyeAspectRatio + rightEyeAspectRatio) / 2

            #Use hull to remove convex contour discrepencies and draw eye shape around eyes
            leftEyeHull = cv2.convexHull(leftEye)
            rightEyeHull = cv2.convexHull(rightEye)
            cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
            cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)

            #Detect if eye aspect ratio is less than threshold
            if(eyeAspectRatio < EYE_ASPECT_RATIO_THRESHOLD):
                COUNTER += 1
                #If no. of frames is greater than threshold frames,
                if COUNTER >= EYE_ASPECT_RATIO_CONSEC_FRAMES:
                    coun_t=coun_t+1
                    cv2.putText(frame, "Stay ALert", (150,200), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0,0,255), 2)
                    pygame.mixer.music.play(-1)
                    stay_alert = True
                    #print("stay alert")
                    # if coun_t>5:
                    #     cv2.putText(frame, "FAILED", (150,200), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0,0,255), 2)
                    #     big_count+=1
                    # else:
                    #     cv2.putText(frame, "Stay ALert", (150,200), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0,0,255), 2)
                    #     pygame.mixer.music.play(-1)

            else:
                pygame.mixer.music.stop()
                COUNTER = 0
                coun_t=0
                big_count=0
                stay_alert = False
        #Show video feed
        cv2.imshow('Video', frame)
        rett, buffer = cv2.imencode('.jpg', frame)
        
       
        yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
        # if(cv2.waitKey(1) & 0xFF == ord('q')):
        #     break
    


@app.route('/')
def index():
    # Render the HTML template
    # frames_generator = generate_frames(alert_status=True)
    # # Retrieve the first frame and stay_alert_printed value
    # frame, stay_alert = next(frames_generator)


    return render_template('index.html')


@app.route('/video_feed')
def video_feed():
    # Return the response with video streaming content type
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0', port=5001)
