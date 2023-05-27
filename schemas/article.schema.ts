// npm i jsonschema
//"required": ["title", "alltext","authorID"]
export const cat = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/cat",
  "title": "Cat",
  "description": "New cat information and shelter info in the Web App",
  "type": "object",
  "properties": {
    "catname": {
      "description": "Describe the cat name",
      "type": "string"
    },
    "shelterID": {
      "description": "Locate the cat by shelterID",
      "type": "string"
    },
    "age": {
      "description": "Describe the age of cat",
      "type": "string"
    },
    "breed": {
      "description": "Describe the breed of cat",
      "type": "string"
    },    
    "imageURL": {
      "description": "URL for main image to show the cat",
      "type": "uri"
    },
    "remark": {
      "description": "Create detail of the cat",
      "type": "boolean"
    },
    "authorUserID": {
      "description": "User ID of the cat record author",
      "type": "integer",
      "minimum": 0
    },
  }, 
  "required": ["title", "alltext"]
}  