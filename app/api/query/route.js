// app/api/chat/route.js
import { queryControler } from "../../lib/query.js";

export async function POST(req) {
    try {
        const { chats } = await req.json();
        console.log(chats)
        const aiResponse = await queryControler(
            chats,
            chats[chats.length - 1].content
        );

        return Response.json(aiResponse, { status: 200 });
        // return Response.json("aiResponse", { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}
