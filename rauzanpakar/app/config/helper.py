from flask import jsonify
import json

def returnAPI(code = 200, message = '', data = []):
	status = 'success'
	if code != 200:
		status = 'failed'
	returnArray = {
		'code': code,
		'status': status,
		'message': message,
		'data' : data
	}

	return jsonify(returnArray)