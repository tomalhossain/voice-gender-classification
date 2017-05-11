from flask import Flask, render_template
from pymongo import MongoClient 
import json 
import sys
from bson import json_util
from bson.json_util import dumps

app = Flask(__name__)

uri = 'mongodb://heroku_z7cd67wr:vqp1uo1a2se2t57mqsjbb50djp@ds137281.mlab.com:37281/heroku_z7cd67wr'

# MONGODB_HOST = 'localhost'
# MONGODB_PORT = 27017
# DBS_NAME = 'voice'
# COLLECTION_NAME = 'projects'

@app.route("/")
def index (): 
    return render_template('index.html')


@app.route("/projects")
def projects ():
    # connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    client = MongoClient(uri)
    collection = client['heroku_z7cd67wr']['projects']
    #collection = connection[DBS_NAME][COLLECTION_NAME]
    documents = collection.find()
    json_documents = []
    for document in documents:
        json_documents.append(document)
    json_documents = json.dumps(json_documents, default=json_util.default)
    connection.close()
    return json_documents


@app.route("/projects_categorized")
def projects_categorized ():
    # connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    client = MongoClient(uri)
    collection = client['heroku_z7cd67wr']['projects_categorized']
    #collection = connection[DBS_NAME][COLLECTION_NAME]
    documents = collection.find()
    json_documents = []
    for document in documents:
        json_documents.append(document)
    json_documents = json.dumps(json_documents, default=json_util.default)
    connection.close()
    return json_documents

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)

