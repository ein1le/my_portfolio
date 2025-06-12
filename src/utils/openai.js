export async function getChatbotResponse(messages, prefix = "") {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) throw new Error("OpenAI API key not set in VITE_OPENAI_API_KEY");

  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const systemPrompt = "You are wunbot, a friendly, helpful chatbot. Always give concise, short answers. Do not use search or tools";
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }))
      ],
      max_tokens: 80,
      temperature: 0.2
    })
  });
  if (!res.ok) throw new Error("OpenAI API error");
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || "";
  return prefix + content;
} 