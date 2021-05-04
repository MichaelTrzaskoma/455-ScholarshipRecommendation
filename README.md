<p align="center">
   <image
   src="./frontend/assets/AppLogo.png"
   alt="scholar seek logo"
   height="250"
          width="250"/>
</p>

<p align="center">
   <b>CSCI 455 - Scholar Seek</b>
</p>

<p align="center">
   <image src="https://shields.io/badge/python-3.8.x-blue??style=flat&logo=python&logoColor=white" />
   <image src="https://img.shields.io/badge/JavaScript-blue?style=flat&logo=JavaScript&logoColor=white&color=blue" />
   <image src="https://img.shields.io/badge/react-0.63.2-blue?style=flat&logo=react&logoColor=white&label=React%20Native" />
   <image src="https://img.shields.io/badge/npm-7.6.3-blue?style=flat&logo=npm&logoColor=white" />
   <image src="https://img.shields.io/badge/expo-41.0.0-blue?style=flat&logo=Expo&logoColor=white&color=blue" />
</p>

<p align="center">
   <image src="https://img.shields.io/badge/flask-1.1.2-blue?style=flat&logo=flask&logoColor=white" />
   <image src="https://img.shields.io/badge/selenium-3.141.0-blue?style=flat&logo=selenium&logoColor=white" />
   <image src="https://img.shields.io/badge/pytest-6.2.2-blue?style=flat&logo=pytest&logoColor=white" />
   <image src="https://img.shields.io/badge/AWS%20EC2-blue?style=flat&logo=Amazon%20AWS&logoColor=white&color=blue" />
   <image src="https://img.shields.io/badge/mongodb-3.6.8-blue?style=flat&logo=mongodb&logoColor=white&color=blue" />
</p>

---
<b>College: </b>New York Institute of Technology<br>
<b>Course:</b> CSCI 455 - M01/ Spring 2021<br>
<b>Mentor:</b> <a href="https://www.nyit.edu/bio/wli20">Dr. Li</a><br>
<b>Team Lead:</b> <a href="https://github.com/MichaelTrzaskoma">Micheal Trzaskoma</a><br>
<b>Team Member:</b> <a href="https://hchen98.github.io/">Hui (Henry) Chen</a>, <a href="https://github.com/byjungy93">Jungi Park</a>, <a href="https://github.com/MichaelTrzaskoma">Micheal Trzaskoma</a>, <a href="https://github.com/THeKhanMann">Zakaria Khan</a>, and <a href="https://github.com/Greg-Salvesen2">Gregory Salvesen</a>

---

## Introduction
This Scholar Seek project is a continuation of a project from CSCI426 (<a href="https://github.com/hchen98/csci426-project">Information Retrieval</a>). The continuation of this project will include the implementation of more robust features and an enhanced database, which will distinguish this project from its previous state. The new planned features will also expand the scope of the app. The project, in its state from CSCI426, serves as a scholarship recommendation service, using a user’s profile information to match them as best as possible with scholarships from scholarships.com. With the features planned for development in CSCI426, the app will also serve to help prospective college students find the higher education institution that best suits them and it will even help them explore potential majors. Our Scholar Seek will help students who are financially struggling find the best scholarship, explore potential majors, and find the college best suited for them by using their profile information to recommend likely candidates.

## Project File Structure

* backend - all necessary files for the backend and cloud (AWS)
* frontend - all necessary files for the React Native
* db - all databases needed for the project
    * scholarDirectory - categorical scholarship term
    * scholarships - detailed scholarships
    * subcatList - a list of scholarship sub-category
    * auth - user profile data
    * college - college data from niche.com
    * client_profile - user's profile db

## Get Started

* backend:
    
    > Create a virtual env:
    ```
    cd backend
    source env/bin/activate
    pip install -r requirements.txt
    ```

    >Production Env
    ```
    uwsgi dev.ini
    ```

    * Access the URL: <a href="localhost:9090">localhost:9090</a>

    >Development Env:
    ```
    cd backend
    export FLASK_APP=run.py
    export FLASK_ENV=development
    python run.py
    ```

    * Access the URL: <a href="localhost:5000">localhost:5000</a>

    >Test Env with Ngrok
   ```
   cd <ngrok directory>
   ./ngrok http 5000
   ```

<br>

* frontend:

    ```
    cd frontend
    npm install
    expo start
    ```

## API

<br>

### Resources - Scholarships


| Endpoint | Method(s) | Description |
| :--- | :--- | :--- |
| /api/v1.2/resources/scholarships/view/categories/general | GET | View a list of scholarship general category terms. E.g. Acamdeic Major, Age, Gendder, and etc. |
| /api/v1.2/resources/scholarships/view/categories/<cater\> | GET | View a list of scholarship sub-category terms. E.g. Acamdeic Major has Accounting, Computer Science, and etc. |
| /api/v1.2/resources/scholarships/view/categories/sub/<cater\> | GET | View a list of scholarship that belongs to a specific sub-categories. |
| /api/v1.2/resources/scholarships/view/titles/<scholarship_title\> | GET | View a specific scholarship detail by providing the title of that scholarship. |
| /api/v1.2/resources/college/view/states/<state\> | GET | View all colleges under a specific state. |
| /api/v1.2/resources/colleges/view/titles/<college_name\> | GET | View a college detail by providing college name. |

<br>

### Resources - Colleges


| Endpoint | Method(s) | Description |
| :--- | :--- | :--- |
| /api/v1.2/resources/college/view/states/<state\> | GET | View all colleges under a specific state. |
| /api/v1.2/resources/colleges/view/titles/<college_name\> | GET | View a college detail by providing college name. |

<br>

### Resources - Majors


| Endpoint | Method(s) | Description |
| :--- | :--- | :--- |
| /api/v1.2/resources/major/view/subjects/<sub> | GET | View all majors under a specific subjects. |
| /api/v1.2/resources/majors/view/titles/<major_name> | GET | View a major detail by providing major name. |

<br>

### Management - Authentication

| Endpoint | Method(s) | Description |
| :--- | :--- | :--- |
| /api/v1.2/managements/users/signup | GET | Allows the user end to sign up an account. |
| /api/v1.2/managements/users/thankyou | GET, POST | Validate the user's token when sign up an account. |
| /api/v1.2/managements/users/<email\>/auth | GET | Authenticate the user's device and account by using email address, account password, and UUID, then return a JWT code as a token.  |
| /api/v1.2/managements/users/forgotpassword | GET | Allows the users to reset their password. Accessible by the project internally only. |

<br>

### Management - Survey Profile

| Endpoint | Method(s) | Description |
| :--- | :--- | :--- |
| /api/v1.2/users/id/<email\>/surveys/scholarship | GET, POST, PATCH | Retrieve, Append, and modify client's scholarship survey detail into db. |
| /api/v1.2/users/id/<email\>/recommends/scholarship | GET | View a list of recommended scholarships by providing client's email. |
| /api/v1.2/users/id/<email\>/surveys/college | GET, POST, PATCH | Retrieve, Append, and modify client's college survey detail into db. |
| /api/v1.2/users/id/<email\>/recommends/college | GET | View a list of recommended college by providing client's email. |
| /api/v1.2/users/id/<email\>/surveys/major | GET, POST, PATCH | Retrieve, Append, and modify client's major survey detail into db. |
| /api/v1.2/users/id/<email\>/recommends/major | GET | View a list of recommended major by providing client's email. |