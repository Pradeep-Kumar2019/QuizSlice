
### Flask application #######

from flask import Flask, jsonify, abort, request, make_response
import sys
from flask_cors import CORS
import pymongo
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient('localhost', 27017)
db = client["quizdb"]

@app.errorhandler(400)
def not_found(error):
   return make_response(jsonify( { 'error': 'Bad request' } ), 400)

@app.errorhandler(404)
def not_found2(error):
   return make_response(jsonify( { 'error': 'Not found' } ), 404)

@app.errorhandler(405)
def not_found3(error):
   return make_response(jsonify( { 'error': 'Method does notfound' } ), 405)


@app.route('/login', methods = ['POST'])
def login():
   print("login hit")
   now = datetime.now()
   print(now)
   data = request.get_json()
   print("*******")
   collection = db.authuser
   dbdata = collection.find_one({'email' : data["email"]})
   if data['password'] == dbdata['password']:
      print("Login successful")
      user = dbdata["email"]
      count = dbdata["totallogincount"] + 1
      result = {"email" : user, "totallogincount": count, "lastloginTime": now}
      myquery = { "email": user }
      newvalues = { "$set": result }
      collection.update_one(myquery, newvalues)

      # Send result if already completed.
      collection = db.result
      dbvalue = collection.find_one({'user' : dbdata["name"]})
      if not dbvalue:
         print("Arvinder Nodata")
         res = make_response(jsonify({"message": "Login Success", "Result": None, "name": dbdata["name"]}), 200)
      else:
         correct = dbvalue["correct"]
         res = make_response(jsonify({"message": "Login Success", "Result": correct, "name": dbdata["name"]}), 200)
   else:
      res = make_response(jsonify({"message": "Login not successful"}), 403)

   return res

@app.route('/submitanswer', methods = ['POST'])
def submitans():
   print("Submit answers hit")
   data = request.get_json()
   print("*******")
   print(data)
   user = data["user"]
   collection = db.answers

   datadict = data["answers"]
   count = 0 
   for key, value in datadict.items():
      dbdata = collection.find_one({'Id' : key})
      if dbdata['answer'] == value:
         count = count + 1

   print("Total count", count)
   res = make_response(jsonify({"Result": count}), 200)
   collection = db.result
   # Insert result for user
   now = datetime.now()
   result = {"user" : user, "correct": count, "submissionTime": now}

   existing_document = collection.find_one({"user" : user})
   if not existing_document:
      collection.insert_one(result)
   else:
      myquery = { "user": user }
      newvalues = { "$set": result }
      collection.update_one(myquery, newvalues)

   return res

def initdb():
      print("Initializing the database")
      print(db.collection_names())
      collist = db.collection_names()
      
      if "answers" in collist:
         print("The collection exists.")
         print("deleting the old collection")
         col = db["answers"]
         col.drop()
      
      collection = db.create_collection("answers")
      print("Collection created........")
      with open('./answers.json') as f:
         data = json.load(f)
      
      for answers in data:
             print(answers)
             collection.insert_one(answers)
             
      print(data)
      
      print(db.collection_names())
      



if __name__ == '__main__':
      print("******** Starting Quiz application backend server ********")
      initdb()
      app.run(host="0.0.0.0")