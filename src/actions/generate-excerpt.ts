"use server";

export async function generateExcerpt(
  title: string,
  content: string,
): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a blog writing assistant. Write a compelling 1-2 sentence excerpt for a blog post. Be concise and engaging. Return only the excerpt text, nothing else.
                Title: ${title}
                Content: ${content.slice(0, 3000)}`,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      }),
    },
  );

  const data = await res.json();

  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
}
