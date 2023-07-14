import os
import openai
from dotenv import load_dotenv


def split_string(string: str, chunk_size: int):
    return [string[i : i + chunk_size] for i in range(0, len(string), chunk_size)]


class AIService:
    def __init__(self):
        load_dotenv()
        OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
        openai.api_key = OPENAI_API_KEY

    def generate_prompt(self, stats: dict):
        # fin_aid = (
        #     "interested in financial aid"
        #     if stats["fin_aid"]
        #     else "not interested in financial aid"
        # )
        prompt = (
            "I am a student who wants to study in the US. I am from "
            + stats["country"]
            + ". I am interested in "
            + stats["majors"][0]
            + " major"
            + ". I have a GPA of"
            + str(stats["CGPA"])
            + " out of "
            + str(stats["GPA_scale"])
            + ". I have a SAT score of "
            + str(stats["sat_score"])
            + ". I have an IELTS score of "
            + str(stats["ielts_score"])
            # + ". I am "
            # + fin_aid
            # + ". I have studied at "
            # + stats["school"]
            # + ". My hobbies are: "
            # + stats["interests"]
            # + ". I have participated in "
            # + stats["olympiads"]
            # + ". I have worked on "
            # + stats["projects"]
            # + ". I have volunteered at "
            # + stats["volunteering"]
            + "."
            + "Please, provide a list of 5 reach, 5 target and 5 safety universities for me in the USA."
        )
        return prompt

    def generate_response(self, prompt: str) -> list[str]:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful college assistant. Your job is to recommend universities in the USA based on applicant's stats. You try to provide all of the relevant information and justify your recommendations, as well as to inform applicants about any pitfalls."
                    + " You should keep in mind that the applicant is an international student and try to base your recommendations on this fact.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.9,
        )
        reply = response.choices[0].message.content.strip()
        chunks = split_string(reply, 4000)
        return chunks
