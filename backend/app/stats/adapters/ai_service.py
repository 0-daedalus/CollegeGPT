import os
import openai
import json
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
            + stats["majors"]
            + " major"
            + ". I have a GPA of "
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
            + "Please, provide a list of approximately 5 reach, 5 target and 5 safety universities "
            + "for me in the USA. Do not make up universities. Make sure to provide their actual names, "
            + "types (reach, target or safety), descriptions and tips on applying to them. Do not recommend universities as "
            + "'Reach University 1, Reach University 2, Target University 1' etc. Descriptions should "
            + "consist of pproximately 5 sentences. Tips should consist of approximately 5 sentences. Be strict in your judgements."
            + "You should keep in mind the following:  Understand, that in applicant's country, GPA of 4.50/5.00 is considered slightly above average. "
            + "An applicant is eligible to apply to Ivy league, Harvard, MIT and other top universities only if their GPA is close to the maximum, "
            + "they have an exceptional SAT score of more than 1400 and IELTS score of more than 7.0. If an applicant is weaker than an average applicant to"
            + " some reach university, do not recommend it, just skip it."
        )
        # print(prompt)
        return prompt

    def generate_response(self, prompt: str) -> list[str]:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-16k",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful college assistant. Your job is to provide an INTERNATIONAL applicant with a list of up to 5 reach,"
                    + "5 target and 5 safety universities in the USA. WIth that in mind, give your recommendations.  Style your answer as a JSON array of "
                    + "Objects with the following fields: 'name' which contains the name of the university, 'type' which contains the type of the university "
                    + "(reach target or safety), 'description' which should include  the reason you recommend this university to an applicant,"
                    + " and 'tips' which should include your tips on applying to this university. "
                    + "Example of bad names: 'Reach University 1, Target University 1, Safety University 1' etc. "
                    + " Your answer should ONLY contain JSON.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.9,
        )
        reply = response.choices[0].message.content.strip()
        universityList = json.loads(reply)
        return universityList
