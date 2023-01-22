import { Prisma, PrismaClient } from "@prisma/client";
import fastify from "fastify";
import cors from "@fastify/cors";

const prisma = new PrismaClient();
const app = fastify({ logger: true });
app.register(require("@fastify/cors"), (instance) => {
  return (
    req: { headers: { origin: string } },
    callback: (
      arg0: null,
      arg1: {
        // This is NOT recommended for production as it enables reflection exploits
        origin: boolean;
      }
    ) => void
  ) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true,
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false;
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions);
  };
});
app.post<{
  Body: ISignupBody;
}>(`/signup`, async (req, res) => {
  const { name, email, posts } = req.body;

  const postData = posts?.map((post: Prisma.PostCreateInput) => {
    return { title: post?.title, content: post?.content };
  });

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  });
  return result;
});

app.post<{
  Body: string;
}>(`/post`, async (req, res) => {
  const { title, content, authorEmail } = JSON.parse(req.body);
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  });
  return result;
});

app.put<{
  Params: IPostByIdParam;
  Body: string;
}>("/post/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = JSON.parse(req.body);

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
      },
    });

    return post;
  } catch (error) {
    return { error: `Post with ID ${id} does not exist in the database` };
  }
});

app.put<{
  Params: IPostByIdParam;
}>("/post/:id/views", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return post;
  } catch (error) {
    return { error: `Post with ID ${id} does not exist in the database` };
  }
});

app.delete<{
  Params: IPostByIdParam;
}>(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
  return post;
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  return users;
});

app.get<{
  Params: IPostByIdParam;
}>(`/post/:id`, async (req, res) => {
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  return post;
});

app.get<{
  Querystring: IFeedQueryString;
}>("/feed", async (req, res) => {
  const { searchString, skip, take, orderBy } = req?.query;

  const or: Prisma.PostWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString as string } },
          { content: { contains: searchString as string } },
        ],
      }
    : {};

  const posts = await prisma.post.findMany({
    where: {
      ...or,
    },
    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy as Prisma.SortOrder,
    },
  });

  return posts;
});
interface IFeedQueryString {
  searchString: string | null;
  skip: number | null;
  take: number | null;
  orderBy: Prisma.SortOrder | null;
}

interface IPostByIdParam {
  id: number;
}

interface ICreatePostBody {
  title: string;
  content: string | null;
  authorEmail: string;
}

interface ISignupBody {
  name: string | null;
  email: string;
  posts: Prisma.PostCreateInput[];
}

app.listen({ port: 3002 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`
  🚀 Server ready at: http://localhost:3002
  ⭐️ See sample requests: http://pris.ly/e/ts/rest-fastify#3-using-the-rest-api`);
});
