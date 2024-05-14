import { Hono } from "hono";
import { z } from "zod";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { body, login } from "param332-common";

const Users = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
}>();

const createKey = async (id: number, Password: string) => {
  const payload = {
    id: id,
    role: "user",
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  };

  return await sign(payload, Password);
};

Users.post("users/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: body = await c.req.json();

    const findUser = await prisma.users.findFirst({
      where: {
        username: body.username,
        email: body.email,
      },
    });

    if (findUser != null) {
      c.status(500);
      return c.text("The user already exist please try anothe username");
    }

    const user = await prisma.users.create({
      data: {
        email: body.email,
        password: body.password,
        username: body.username,
        firstname: body.firstname,
        lastname: body.lastname,
      },
    });

    const key = await createKey(user.id, c.env.SECRET_KEY);

    return c.json({
      key: key,
      status: true,
    });
  } catch (e: any) {
    c.status(500);
    return c.json({
      error: e.message || "An unknown error occurred",
    });
  }
});

Users.post("users/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body: login = await c.req.json();

    if (z.string().email().safeParse(body.username).success) {
      const findUser = await prisma.users.findFirst({
        where: {
          email: body.username,
        },
      });
      if (findUser == null) {
        c.status(403);
        return c.text("user do not exist");
      }
      if (findUser != null && body.password == findUser.password) {
        const key = await createKey(findUser.id, c.env.SECRET_KEY);

        c.status(200);
        return c.json({
          success: true,
          key: key,
        });
      } else {
        c.status(400);
        return c.json({
          success: false,
          error: "password did not matched",
        });
      }
    } else {
      const findUser = await prisma.users.findFirst({
        where: {
          username: body.username,
        },
      });
      if (findUser == null) {
        c.status(403);
        return c.text("user do not exist");
      }
      if (findUser != null && body.password == findUser.password) {
        const key = await sign({ id: findUser.id }, c.env.SECRET_KEY);
        c.status(200);
        return c.json({
          success: true,
          key: key,
        });
      } else {
        c.status(400);
        return c.json({
          success: false,
          error: "password did not matched",
        });
      }
    }
  } catch (e: any) {
    return c.json({
      error: e.message,
    });
  }
});
export default Users;
