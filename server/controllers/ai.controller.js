import dotenv from 'dotenv';
dotenv.config();

import Groq from 'groq-sdk';

// Initialize Groq SDK with API Key from .env
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateContent = async (platform, msg) => {
    const prompts = {
        instagram: `Generate an engaging Instagram post caption for: "${msg}". Keep it catchy, fun, and social-media friendly.`,
        facebook: `Create a compelling Facebook post for: "${msg}".`,
        youtube: `Write a YouTube video title and description for: "${msg}".`,
        twitter: `Write a short, viral tweet for: "${msg}".`,
        linkedin: `Write a professional LinkedIn post for: "${msg}".`
    };

    const settings = {
        instagram: { temperature: 0.9, max_tokens: 200 },
        facebook: { temperature: 0.8, max_tokens: 300 },
        youtube: { temperature: 0.7, max_tokens: 400 },
        twitter: { temperature: 1.0, max_tokens: 150 },
        linkedin: { temperature: 0.6, max_tokens: 500 }
    };

    if (!prompts[platform]) return null;

    const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompts[platform] }],
        model: "llama3-8b-8192",
        ...settings[platform]
    });

    return completion.choices?.[0]?.message?.content || "No response generated.";
};

const generateSocialMediaContent = async (req, res) => {
    try {
        const { msg, platforms } = req.body;
        if (!msg || !Array.isArray(platforms) || platforms.length === 0) {
            return res.status(400).json({ success: false, message: "Message and at least one platform are required." });
        }

        const results = {};
        for (const platform of platforms) {
            results[platform] = await generateContent(platform, msg);
        }

        return res.status(200).json({ success: true, responses: results });
    } catch (error) {
        console.error('Error generating social media content:', error);
        return res.status(500).json({ success: false, message: "AI content generation failed." });
    }
};

export { generateSocialMediaContent };
