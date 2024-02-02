from fastapi import APIRouter, HTTPException
import logging
import asyncio
import re
from ..config import assistant_id, client
from app.schemas import CareerInfo

# Initalize the router
router = APIRouter()

# Basic configuration for logging
logging.basicConfig(level=logging.INFO)

async def wait_for_run_completion(client, thread_id, run_id):
    while True:
        try:
            run = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run_id)
            if run.completed_at:
                messages = client.beta.threads.messages.list(thread_id=thread_id)
                last_message = messages.data[0]
                return last_message.content[0].text.value
        except Exception as e:
            logging.error(f"An error occured while retrieving the response", {e})
            return None
        await asyncio.sleep(1)

@router.post("/generate-roadmap/")
async def generate_roadmap(career_info: CareerInfo):
    try:
        skills = ', '.join(career_info.skills)
        message = (
            f"I want to be a {career_info.career}, "
            f"I have {career_info.experience} years of experience. "
            f"I can dedicate {career_info.hours_dedicated_to_learning} hours per week to learn. "
            f"My total budget for the courses is {career_info.budget} dollars a week. "
            f"The skills I want to gain are: {skills}. "
            f"My preferred learning style is {career_info.preferred_learning_style}. "
            f"My expected timeframe is {career_info.timeframe}. "
            f"I am a {career_info.current_knowledge} in this field."
        )

        ### Thread ###
        thread = client.beta.threads.create(
            messages=[
                {
                    "role": "user",
                    "content": message,
                }
            ]
        )

        ### Run the assistant ###
        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant_id,
            instructions=(
                "Start the response with a summary that highlights the key learning outcomes, total time commitment, and skill development progression. Mention the overarching goals and how this roadmap prepares the learner for their career. After the summary, use the following strict template for each month section of the career roadmap: " +
                "\n- Begin each section with the month and course title." +
                "\n- Follow with details: Course Name, Link, Skill level, Price, and Description, each on a new line, in this order." +
                "\n- Avoid markdown formatting." +
                "\nExample format:" +
                "\nSummary: This roadmap covers the essential skills and knowledge for a career in Java development, requiring a total of 6 months with an average weekly study time of 10 hours. It aims to equip learners with foundational to advanced Java skills, preparing them for job-ready competencies." +
                "\n\nMonth 1: Basic Java Programming" +
                "\nCourse Name: Java Programming Basics" +
                "\nLink: https://www.udacity.com/course/java-programming-basics--ud282" +
                "\nSkill level: Beginner" +
                "\nPrice: $12.99" +
                "\nDescription: Introduction to Java programming basics, including variables, loops, and lists." +
                "\n\nContinue with this format for each month, ensuring the courses align with the learner's timeframe and weekly study hours."
            )
        )

        response = await wait_for_run_completion(client, thread.id, run.id)

        if response:
            # Regex patterns
            patterns = {
                "month": r"^(Month \d+(?:-\d+)?):",
                "title": r"^(Month \d+(?:-\d+)?): (.+)$",
                "course_name": r"Course Name: (.+)",
                "link": r"Link: (.+)",
                "skill_level": r"Skill level: (.+)",
                "price": r"Price: (.+)",
                "description": r"Description: (.+)"
            }

            # Extract the summary using regex
            summary_pattern = r"^Summary: (.*?)\n\nMonth 1:"
            summary_match = re.search(summary_pattern, response, re.DOTALL)
            summary = summary_match.group(1).strip() if summary_match else ""

            # Split the text by "Month" followed by a number and a colon
            months = re.split(r'(?=(Month \d+(?:-\d+)?):)', response)
            months = [month for month in months if month.strip()]

            roadmap = []
            for section in months:
                month_data = {}
                # Extract month and title
                month_match = re.search(patterns["month"], section, re.MULTILINE)
                title_match = re.search(patterns["title"], section, re.MULTILINE)
                if month_match and title_match:
                    month_data["month"] = month_match.group(1).strip()
                    month_data["title"] = title_match.group(2).strip()
                # Extract course info
                course_info = {}
                for key, pattern in patterns.items():
                    if key not in ["month", "title"]:  # Skip month and title
                        match = re.search(pattern, section, re.MULTILINE)
                        if match:
                            course_info_key = key.replace("_", "")  # Remove underscore for JSON key
                            course_info[course_info_key] = match.group(1).strip()
                if course_info:
                    month_data["courseInfo"] = course_info
                if month_data:
                    roadmap.append(month_data)

            logging.info(response)
            return {
                "summary": summary,
                "roadmap": roadmap
                }
        else:
            raise HTTPException(status_code=500, detail="Failed to get response from the assistant")
    except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))