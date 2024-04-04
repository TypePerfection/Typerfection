# Overview

Our team has created a web application to help people of all ages and skill levels practice, keep track of, and improve their typing skills. Typerfection has 5 different courses with 5 different levels of generated text paragraphs in each course to aid improvement in typing prowess. With each progressive level, the generated text gets increasingly more difficult. The application features a keyboard display that helps the user to keep track of which letter they should type next, and highlights different colors when you type a letter either correctly or incorrectly. It also tracks and stores data from your typing, like how long it takes you to complete and your WPM(words per minute) so you can track your improvement over time. So, go sign up today and start using typerfection to help improve your typing skills!

# Development Environment

NodeJs - Host for Next.js to handle HTML and API requests. Allows for easy development with the help of NPM(package manager) and node modules.
NextJs - Handles HTML and API requests, determines file structure for project, compiles Tailwind CSS and Typescript, allows for server rendering, and middleware allows code to be run before server renders a page.
React - Main typescript library used in the project. Enables re-usable components that split up elements, helps to create more dynamic web applications.
Postgresql - Database that we used to store user data, save session tokens, and implement user authorization/login.
Prisma ORM - Runs thread on Node.js server to interface with our Postgresql database. Automatically generates SQL CRUD(create, read, update, delete) code from object map that we created. Offers better security for potential SQL injection.
Tailwind CSS - Allowed for inline CSS which provided much cleaner and more simplified code, along with premade CSS classes to simplifiy repetitive classes.
NextAuth - Handles user sessions, generates and stores session tokens, stores tokens in database.


We used Typescript almost exclusively for this project! React was the predominant library we used, along with a few others including NextAuth.

# Collaborators
- Ethan Chalupa 
- Rylan Jurgens
- Derek Ludlow
- Dawson Bauman

# Useful Websites
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Next.js - Prisma docs](https://vercel.com/guides/nextjs-prisma-postgres)
- [Stack Overflow](https://stackoverflow.com/)

# Future Work
(Things we would add with continued development)
* Improve visual appeal/graphic design and fluidity of use with more front-end tweaking and development.
* Find API to integrate or another way to randomly generate the text so it could be slightly different each time
* Improve level difficulty progression to make it more uniform throughout each course
