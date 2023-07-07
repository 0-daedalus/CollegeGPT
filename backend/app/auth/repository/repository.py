from datetime import datetime
from typing import Optional

from bson.objectid import ObjectId
from pymongo.database import Database

from ..utils.security import hash_password


class AuthRepository:
    def __init__(self, database: Database):
        self.database = database

    def create_user(self, user: dict):
        payload = {
            "email": user["email"],
            "password": hash_password(user["password"]),
            "created_at": datetime.utcnow(),
        }

        res = self.database["users"].insert_one(payload)
        return res.inserted_id

    def init_stats(self, user_id: str):
        payload = {
            "_id": user_id,
            "country": None,
            "majors": None,
            "sat_score": None,
            "ielts_score": None,
            "GPA_scale": None,
            "CGPA": None,
            "fin_aid": None,
            "school": None,
            "interests": None,
            "olympiads": None,
            "projects": None,
            "volunteering": None,
        }
        self.database["stats"].insert_one(payload)

    def get_user_by_id(self, user_id: str) -> Optional[dict]:
        user = self.database["users"].find_one(
            {
                "_id": ObjectId(user_id),
            }
        )
        return user

    def get_user_by_email(self, email: str) -> Optional[dict]:
        user = self.database["users"].find_one(
            {
                "email": email,
            }
        )
        return user
