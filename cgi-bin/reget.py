#!c:/Python36/python3
import requests
print("content-type:text/html")
print
response = requests.get('localhost/thorzhou.github.io/cgi-bin/reget.py')
print(response)
