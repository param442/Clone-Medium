PrismaClient;
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

import { decode, verify, jwt } from "hono/jwt";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

Blog.use("/*", async (c, next) => {
  const key = c.req.header("Authorization") || "";
  try {
    const user = await verify(key, c.env.SECRET_KEY);

    if (user) {
      c.set("userId", user.id);

      await next();
    } else {
      return c.json({
        user: "Not found",
      });
    }
  } catch (error) {
    c.status(403);
    return c.json({
      error: error,
    });
  }
});

Blog.post("blog", async (c) => {
  const date = new Date();
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const { Content, Title } = await c.req.json();
    const user = await prisma.users.findFirst({
      where: {
        id: parseInt(userId),
      },
    });
    const Blog = await prisma.blog.create({
      data: {
        userId: parseInt(userId),
        Title: Title,
        content: Content,
        date: `${
          monthNames[date.getMonth() + 1]
        } ${date.getDate()},${date.getFullYear()}`,
        username: user?.username,
      },
    });
    return c.json({
      id: Blog.id,
    });
  } catch (error: any) {
    return c.json({
      error: error.message,
    });
  }
});

Blog.put("blog", async (c) => {
  const userId = c.get("userId");
  const date = new Date();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const { id, Content, Title, summary } = await c.req.json();
    const Blog = await prisma.blog.update({
      where: {
        id: parseInt(id),
      },
      data: {
        userId: parseInt(userId),
        Title: Title,
        content: Content,
        date: `${
          monthNames[date.getMonth() + 1]
        } ${date.getDate()},${date.getFullYear()}`,
      },
    });
    return c.json({
      id: Blog.id,
    });
  } catch (error: any) {
    return c.json({
      error: error.message,
    });
  }
});

Blog.get("blog/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const Id = c.req.param;
  try {
    const id = parseInt(c.req.param("id"));
    const Blog: any = await prisma.blog.findFirst({
      where: {
        id: id, // Specify the id here
      },
      select: {
        Title: true,
        content: true,
      },
    });
    return c.json({
      Title: Blog.Title,
      content: Blog.content,
    });
  } catch (error: any) {
    return c.json({
      error: error.message,
    });
  }
});

Blog.get("blog/personal", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  try {
    const Blog = await prisma.blog.findMany({
      where: {
        userId: parseInt(userId),
      },
      select: {
        content: true,
        date: true,
        username: true,
        Title: true,
      },
    });
    return c.json({
      Blog,
    });
  } catch (error: any) {
    return c.json({
      error: error.message,
    });
  }
});
Blog.get("blogs/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        id: true,
        Title: true,
        content: true,
        username: true,
        date: true,
      },
    });

    return c.json({
      blogs,
    });
  } catch (error: any) {
    return c.json({
      error: error.message, // Include the error message in the response
    });
  }
});

export default Blog;
