from datetime import datetime
from typing import Optional, List

from bson.objectid import ObjectId
from pymongo.database import Database


class StatsRepository:
    def __init__(self, database: Database):
        self.database = database

    def get_user_by_id(self, user_id: str) -> Optional[dict]:
        user = self.database["users"].find_one(
            {
                "_id": ObjectId(user_id),
            }
        )
        return user

    def set_stats(self, user_id: str, stats: dict):
        if self.get_user_by_id(user_id) is None:
            print("User not found")
            return
        if self.get_stats(user_id) is None:
            self.database["stats"].insert_one(
                {
                    "_id": ObjectId(user_id),
                    "country": stats["country"],
                    "majors": stats["majors"],
                    "sat_score": stats["sat_score"],
                    "ielts_score": stats["ielts_score"],
                    "GPA_scale": stats["GPA_scale"],
                    "CGPA": stats["CGPA"],
                    # "fin_aid": stats["fin_aid"],
                    # "school": stats["school"],
                    # "interests": stats["interests"],
                    # "olympiads": stats["olympiads"],
                    # "projects": stats["projects"],
                    # "volunteering": stats["volunteering"],
                }
            )
        if stats["country"] is not None:
            self.set_country(user_id, stats["country"])
        if stats["majors"] is not None:
            self.set_majors(user_id, stats["majors"])
        if stats["sat_score"] is not None:
            self.set_sat(user_id, stats["sat_score"])
        if stats["ielts_score"] is not None:
            self.set_ielts(user_id, stats["ielts_score"])
        if stats["GPA_scale"] is not None:
            self.set_gpa_scale(user_id, stats["GPA_scale"])
        if stats["CGPA"] is not None:
            self.set_cgpa(user_id, stats["CGPA"])
        # if stats["fin_aid"]:
        #     self.set_fin_aid(user_id, stats["fin_aid"])
        # if stats["school"]:
        #     self.set_school(user_id, stats["school"])
        # if stats["interests"]:
        #     self.set_interests(user_id, stats["interests"])
        # if stats["olympiads"]:
        #     self.set_olympiads(user_id, stats["olympiads"])
        # if stats["projects"]:
        #     self.set_projects(user_id, stats["projects"])
        # if stats["volunteering"]:
        #     self.set_volunteering(user_id, stats["volunteering"])

    def set_country(self, user_id: str, country: str):
        self.database["stats"].update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"country": country}}
        )

    def set_majors(self, user_id: str, majors: list):
        self.database["stats"].update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"majors": majors}}
        )

    def set_sat(self, user_id: str, sat_score: int):
        self.database["stats"].update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"sat_score": sat_score}}
        )

    def set_ielts(self, user_id: str, ielts_score: float):
        self.database["stats"].update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"ielts_score": ielts_score}}
        )

    def set_gpa_scale(self, user_id: str, gpa_scale: float):
        self.database["stats"].update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"GPA_scale": gpa_scale}}
        )

    def set_cgpa(self, user_id: str, cgpa: float):
        self.database["stats"].update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"CGPA": cgpa}}
        )

    def set_fin_aid(self, user_id: str, fin_aid: bool):
        self.database["stats"].update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"fin_aid": fin_aid}}
        )

    def set_school(self, user_id: str, school: str):
        self.database["stats"].update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"school": school}}
        )

    def set_interests(self, user_id: str, interests: list):
        self.database["stats"].update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"interests": interests}}
        )

    def set_olympiads(self, user_id: str, olympiads: list):
        self.database["stats"].update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"olympiads": olympiads}}
        )

    def set_projects(self, user_id: str, projects: list):
        self.database["stats"].update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"projects": projects}}
        )

    def set_volunteering(self, user_id: str, volunteering: str):
        self.database["stats"].update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"volunteering": volunteering}}
        )

    def get_stats(self, user_id: str) -> Optional[dict]:
        stats = self.database["stats"].find_one(
            {
                "_id": ObjectId(user_id),
            }
        )
        return stats

    def add_universities(self, user_id: str, uniList: list):
        if self.get_user_by_id(user_id) is None:
            print("User not found")
            return
        for uni in uniList:
            uni["imageUrl"] = ""
        entry = self.database["universities"].update_one(
            {"_id": ObjectId(user_id)},
            {
                "$set": {
                    "universities": uniList,
                }
            },
            upsert=True,
        )
        return entry

    def get_universities(self, user_id: str) -> Optional[List[str]]:
        universities = self.database["universities"].find_one(
            {
                "_id": ObjectId(user_id),
            }
        )
        if universities is None:
            return None
        return universities["universities"]

    def addImageToUni(self, user_id: str, Uniname: str, imageUrl: str):
        if self.get_universities(user_id) is None:
            print("User not found")
            return
        self.database["universities"].update_one(
            {"_id": ObjectId(user_id), "universities.name": Uniname},
            {"$set": {"universities.$.imageUrl": imageUrl}},
        )

    def setOldStats(self, user_id: str, stats: dict):
        if self.get_user_by_id(user_id) is None:
            print("User not found")
            return
        self.database["oldStats"].update_one(
            {"_id": ObjectId(user_id)},
            {
                "$set": {
                    "country": stats["country"],
                    "majors": stats["majors"],
                    "sat_score": stats["sat_score"],
                    "ielts_score": stats["ielts_score"],
                    "GPA_scale": stats["GPA_scale"],
                    "CGPA": stats["CGPA"],
                }
            },
            upsert=True,
        )

    def getOldStats(self, user_id: str) -> Optional[dict]:
        stats = self.database["oldStats"].find_one(
            {
                "_id": ObjectId(user_id),
            }
        )
        return stats

    def get_university(self, user_id: str, university_name: str):
        universities = self.database["universities"].find_one(
            {
                "_id": ObjectId(user_id),
            }
        )
        if universities is None:
            return None
        for uni in universities["universities"]:
            if uni["name"] == university_name:
                return uni
        return None
