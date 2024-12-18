import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET prompt
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const getId = (await params).id;

    const prompt = await Prompt.findById(getId);
    if (!prompt) return new Response("Prompt not found", { statue: 400 });

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};

// PATCH (update prompt)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  const Id = (await params).id;

  try {
    await connectDB();

    const existingPrompt = await Prompt.findById(Id);

    if (!existingPrompt)
      return new Response("Prompt not found", { statue: 400 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update prompt", {
      status: 500,
    });
  }
};

// DELETE prompt
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const id = (await params).id;

    await Prompt.findByIdAndDelete(id);

    return new Response("Prompt deleted successfully!", {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to deleted prompt.", {
      status: 500,
    });
  }
};
