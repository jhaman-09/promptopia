import { connectDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const id = (await params).id;

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return new Response("User details not found.", {
        status: 404,
      });
    }
    return new Response(JSON.stringify(userDetails), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to find the user details..", {
      status: 500,
    });
  }
};
