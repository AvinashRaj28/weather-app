import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_TOKEN);

export async function POST(req) {
  try {
    const { city, weather } = await req.json();

    if (!city || !weather) {
      return new Response(JSON.stringify({ error: "City and weather data are required" }), { status: 400 });
    }

    const prompt = `The weather in ${city} is ${weather.weather[0].description} with a temperature of ${weather.main.temp}°C. It feels like ${weather.main.feels_like}°C. The humidity is ${weather.main.humidity}%, and the wind speed is ${weather.wind.speed} m/s. What advice do you have for someone in this weather?`;

    const response = await hf.textGeneration({
      model: "HuggingFaceH4/zephyr-7b-alpha",
      inputs: prompt,
      parameters: { max_new_tokens: 100 },
    });

    // Extract only the generated response
    const aiResponse = response.generated_text.replace(prompt, "").trim();

    return new Response(JSON.stringify({ response: aiResponse }), { status: 200 });

  } catch (error) {
    console.error("❌ AI API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch AI response" }), { status: 500 });
  }
}
