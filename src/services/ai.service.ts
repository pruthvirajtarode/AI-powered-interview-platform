import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AIService {
  static async analyzeResume(resumeText: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert HR recruiter and AI career coach. Analyze the following resume text and extract key information in JSON format: skills (array), experience_years (number), top_3_strengths (array), resume_summary (string).",
        },
        {
          role: "user",
          content: resumeText,
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  }

  static async matchJob(resumeData: any, jobDescription: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "Calculate a match score (0-100) between the candidate's profile and the job description. Provide the score and a brief explanation of the reasoning and missing skills in JSON format: match_score (number), explanation (string), missing_skills (array).",
        },
        {
          role: "user",
          content: `Resume Data: ${JSON.stringify(resumeData)}\n\nJob Description: ${jobDescription}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  }

  static async generateInterviewQuestions(jobTitle: string, studentProfile: any) {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "Generate 5 tailored interview questions for the candidate based on the job role and their profile. Include technical and behavioral questions in JSON format: questions (array of objects with 'question' and 'objective' strings).",
        },
        {
          role: "user",
          content: `Job Title: ${jobTitle}\n\nStudent Profile: ${JSON.stringify(studentProfile)}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  }
}
