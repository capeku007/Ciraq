// import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.email || !body.username || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Missing required fields",
    });
  }


  const user = await User.create({ ...body, password: body.password });

  return { ...user.toObject(), password: undefined };
});