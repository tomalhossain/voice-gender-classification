'''

CITATIONS 

http://codehandbook.org/pymongo-tutorial-crud-operation-mongodb/
https://gist.github.com/mprajwala/849b5909f5b881c8ce6a
http://adilmoujahid.com/posts/2015/01/interactive-data-visualization-d3-dc-python-mongodb/

'''

from flask import Flask, render_template
from pymongo import MongoClient 
import json 
from bson import json_util
from bson.json_util import dumps

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'voice'
COLLECTION_NAME = 'projects'

@app.route("/")
def index (): 
    return render_template('index.html')


@app.route("/projects")
def projects_json ():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    documents = collection.find()
    json_documents = []
    for document in documents:
        json_documents.append(document)
    json_documents = json.dumps(json_documents, default=json_util.default)
    connection.close()
    return json_documents

@app.route("/projects-csv")
def projects_csv ():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    documents = collection.find()
    print (documents)
    return documents



if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)

