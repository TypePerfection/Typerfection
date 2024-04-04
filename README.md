# Overview

{Provide a description of your team project.  Describe how to use the software.}

# Development Environment

{Describe the tools that you used to develop the software}

{Describe the programming language that you used and any libraries.}

# Collaborators
- Ethan Chalupa 
- Rylan Jurgens
- Derek Ludlow
- Dawson Bauman

# Useful Websites

{Make a list of websites that you found helpful in this project}
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Next.js - Prisma docs](https://vercel.com/guides/nextjs-prisma-postgres)

# Future Work

* Item 1
* Item 2
* Item 3


## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Troubleshooting

If you have a missing dependency or file run 

```Bash
npm install
```

To sync the database to prisma schema, run

```bash
prisma migrate dev
```

To open the prisma studio run 

```bash
npx prisma studio
```

Prisma client is the prisma interface on the next.js server, it needs to be installed
```bash
npm install @prisma/client
or
npm install
```

and updated every time you update the schema
```bash
npx prisma generate
``` 
