import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const id = (await params).id;

    const prompts = await Prompt.find({
      creator: id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
