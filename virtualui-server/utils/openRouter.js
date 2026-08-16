import axios from "axios"

export const askAI = async (messages) => {
    try {
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Messages array is empty.");
        }

        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "deepseek/deepseek-chat", // <- free DeepSeek V3
            messages: messages,
            temperature: 0.7,
            max_tokens: 6000, // escaped JSON + full component code needs a lot more headroom than 2000
            response_format: { type: "json_object" } // <- enforce JSON output
        }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'X-OpenRouter-Title': 'VirtualUI',
                'Content-Type': 'application/json',
            }
        });

        const choice = response?.data?.choices?.[0];
        const content = choice?.message?.content;

        if (!content || !content.trim()) {
            throw new Error("AI returned empty response.");
        }

        // If the model ran out of tokens mid-generation, the JSON will be
        // truncated (e.g. cut off mid-string with no closing braces).
        // Catch this explicitly instead of letting it surface as a
        // confusing "invalid JSON" parse error downstream.
        if (choice?.finish_reason === "length") {
            throw new Error(
                "AI response was cut off (hit max_tokens limit) before finishing the component. Try a simpler prompt or increase max_tokens further."
            );
        }

        return content

    } catch (error) {
        console.error("OpenRouter Error:", error.response?.data || error.message);
        throw new Error(error.message?.startsWith("AI response was cut off")
            ? error.message
            : "OpenRouter API Error");
    }
}