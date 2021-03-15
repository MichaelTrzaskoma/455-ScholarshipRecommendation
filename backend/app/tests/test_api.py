# test case for the RESTful API through PyTest
# ref: https://flask.palletsprojects.com/en/1.1.x/testing/

import requests
from flask import json

# from ..views import T_index

def api_index_get():
    return requests.get('http://127.0.0.1:5000/api/v1.2/test')

def api_index_post(post_data):
    # INPUT: key-value pair
    # ref: https://www.geeksforgeeks.org/http-request-methods-python-requests/
    # ref: https://riptutorial.com/flask/example/5622/testing-a-json-api-implemented-in-flask
    return requests.post('http://127.0.0.1:5000/api/v1.2/test', data=json.dumps(post_data))

def test_api_index_get():
    r = api_index_get()
    assert r.status_code == 200

def test_api_index_post():
    input_data = {'test_key':'test_value'}
    r = api_index_post(input_data)
    assert r.status_code == 200