import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // keep in .env.local
});

export async function POST(req) {
    try {
        const { query } = await req.json();

        if (!query) {
            return new Response(
                JSON.stringify({ error: "Query is required" }),
                { status: 400 }
            );
        }


        const response = await client.chat.completions.create({
            model: "gpt-4o-mini", // enhancement step
            messages: [
                {
                    role: "system",
                    content:
                        `You are a helpful assistant that rewrites messy student questions into clear, structured search queries for retrieval from course.
                        there is two cousre available one is nodejs and other is python so make sure the question is related to these two course only.`,
                },
                { role: "user", content: query },
            ],
            temperature: 0.3, // stable output
        });

        const enhancedQuery = response.choices[0].message.content;

        return new Response(
            JSON.stringify({ enhancedQuery }),
            { status: 200 }
        );
        // return new Response(
        //     JSON.stringify({ query }),
        //     { status: 200 }
        // );
    } catch (err) {
        console.error("Enhance API error:", err);
        return new Response(
            JSON.stringify({ error: "Failed to enhance query" }),
            { status: 500 }
        );
    }
}
