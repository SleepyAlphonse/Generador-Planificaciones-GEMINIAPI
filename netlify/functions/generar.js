export default async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { prompt } = await request.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ error: data.error?.message || "Error de API" }), {
        status: res.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Adapt Anthropic response to the format App.jsx expects
    const txt = data.content?.[0]?.text || "";
    const adapted = {
      candidates: [{ content: { parts: [{ text: txt }] } }]
    };

    return new Response(JSON.stringify(adapted), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config = { path: "/api/generar" };
