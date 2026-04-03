"""This module takes care of starting the API Server, Loading the DB and Adding the endpoints"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 409
    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400
    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "Invalid credentials"}), 401
    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(int(current_user_id))
    return jsonify({"msg": "Access granted", "user": user.serialize()}), 200
