---
title: "Building Scalable REST APIs with Node.js"
date: "2026-01-12"
excerpt: "How I've learnt to build, and harden REST APIs"
tags: ["Node.js", "API", "Backend"]
---

# Building Scalable REST APIs with Node.js

## Introduction

Every project typically starts small, with simple APIs and a few endpoints. But as the project grows, so does the complexity of the API, this complexity is fueled by the need to handle more users, more traffic, which in turn leads to more bugs to deal with along the line.

At first, when starting a new project, I used to dive in head-first without proper planning and structure, which usually turns back to bite me in the end, leading to endless debugging, refactoring, and a whole lot of stress. This isn't usually because of poor code quality but a result of poor system design. If the goal is to have a system be used by multiple users, it's important to plan for that from the start to ensure the system can handle the load and scale without bleeding of fainting/crashing 😅.

So, in this post, I'll be sharing some patterns that I've adopted which saves me from a lot of future headaches and stress.

## Why Node.js for APIs?

JavaScript is currently the most used language and has grown from just a browser based language to a full-stack language, with the help of Node.js. This makes it easy for a lot of front-end developers to get into backend development.

Some of the benefits of using JavaScript and Node.js for APIs include:

- Easy to learn and use
- Large community and resources
- It's able to handle tons of requests without throwing a tantrum
- Easy to handle concurrency
- Frontend and backend in the same language keeps my brain from context-switching itself into a coma.
- NPM means I rarely have to reinvent boring wheels.
- V8 is fast enough that performance usually isn’t the bottleneck.
- And when something breaks, there’s almost always someone else who already fought that battle on GitHub.

However, this doesn't mean Node.js is without it's pitfalls, but it's good enough for most use cases.

::: callout 📚 Prerequisites
You should already be comfortable with JavaScript, basic HTTP, and have Node installed. If not, this will feel like jumping into traffic.
:::

## Project initiation

Before I touch any code, I make sure I have a clear picture of what I’m trying to build. That early clarity makes it easier to plan the project and think through a system design that won’t collapse under its own weight.

I usually start by writing down rough notes about the idea, then bouncing the ideas off ChatGPT, identify blind spots, and think about how data should move through the system. That process helps me create an initial design before anything gets built.

My typical flow looks like this:

-> create project notes

-> bounce ideas off ChatGPT

-> outline the system design

-> create a system flow chart

-> build an MVP

-> expose it to reality

-> observe failures and friction

-> extract real system rules

-> design the real architecture

-> build v2 with intention

This approach lets me begin with clarity, test quickly, and scale with purpose instead of guesswork.

## Project setup

With the project initiation done, it's time to set up the project.

It's as simple as:

```bash
mkdir scalable-api
cd scalable-api
npm init -y
npm install express cors helmet morgan dotenv
npm install --save-dev nodemon typescript @types/node @types/express
```

Typical folder structure:

```
scalable-api/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── app.ts
├── tests/
├── .env
└── package.json
```

This is just enough to get things started and ensure that making changes to the project in the future isn't a nightmare.

## The core app

`app.ts` is where everything starts:

```ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

export default app;
```

The `/health` route looks boring, but it saves you when you’re trying to figure out whether your server is dead or just sulking.

## Environment config

I've seen cases where secrets were stored in the codebase, which is a bad idea.
My workaround to prevent this is to use environment variables and before making any commits, I make sure to add the `.env` file to the `.gitignore` file.
This way, my .env file is never committed to the repository and my secrets are safe.

`.env`:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://localhost:5432/mydb
JWT_SECRET=your-secret-key-here
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

::: callout ⚠️ Security
Never commit secrets. Ever. `.env` belongs in `.gitignore`.
:::

## Error handling

Centralized errors make debugging 10× less annoying:

```ts
class AppError extends Error {
  statusCode: number;
  isOperational = true;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Example
throw new AppError("User not found", 404);
```

Without this, you'll be left with abstract logs which can be sometimes hard to trace and debug.

## Input validation

One thing I had to learn the hard way it trusting user input.
Trust no one, not every user intend to use your API for good, so its best to always treat user input as malicious and validate to ensure that it matches your expectations.

```ts
const validateUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ error: "Password too short" });
  }

  next();
};
```

Simple checks already block most nonsense.

## Typical endpoint layout

| Method | Endpoint             | What it does | Auth |
| -----: | -------------------- | ------------ | :--: |
|    GET | `/api/users`         | Get users    |  ❌  |
|    GET | `/api/users/:id`     | Get one user |  ❌  |
|   POST | `/api/users`         | Create user  |  ✅  |
|    PUT | `/api/users/:id`     | Update user  |  ✅  |
| DELETE | `/api/users/:id`     | Delete user  |  ✅  |
|   POST | `/api/auth/login`    | Login        |  ❌  |
|   POST | `/api/auth/register` | Register     |  ❌  |

## Performance stuff that actually matters

### Caching

Redis is your best friend:

```ts
import Redis from "ioredis";
const redis = new Redis();

async function getCachedData(key) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const data = await fetchFromDatabase();
  await redis.setex(key, 3600, JSON.stringify(data));
  return data;
}
```

The beauty of Redis is it's speed and it's ability to handle a lot of requests with proper caching so your db isn't constantly under load.

This keeps your system running fast and gives a better user experience.

### Database sanity

- Index the columns you actually query.
- Paginate anything that can grow.
- Avoid N+1 queries like they owe you money.

### Rate limiting

This is a must for any API that intends to work in the real-world. It's basically traffic control for your app and prevents overloading your server.
With proper rate limiting, you can prevent your API from being used as a DoS vector and also prevent abuse from bots and malicious users.

```ts
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP",
});

app.use("/api/", limiter);
```

## Testing

Don't just trust that everything is going to work out fine. Test it.

Testing ensures that your app works as intended and helps you find bugs before they become a problem in production.

True, you can't always catch every bug, but it's better to catch them early than later.

```ts
import request from "supertest";
import app from "../src/app";

describe("User API", () => {
  test("GET /api/users returns user list", async () => {
    const response = await request(app).get("/api/users").expect(200);
    expect(Array.isArray(response.body.users)).toBe(true);
  });
});
```

## Before you deploy

- HTTPS, headers, rate limits.
- Compression and caching.
- Logging and error tracking.
- Health checks.
- A process manager like PM2.

Not doing these is how “it worked locally” becomes a lifestyle.

> “Premature optimization is the root of all evil.” — Donald Knuth

Build it simple. Measure it. Then make it faster.

## Final thoughts

Scalable APIs aren’t about clever tricks. They’re about boring, disciplined decisions done consistently.

That’s the part most people skip.
