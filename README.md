This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Demo
https://loan-to-value-next-ts-exam.vercel.app/

## First clone
Copy the `.env.example` to `.env.local`.
```
cp -n .env.example .env.local
```
Then, update your node version to 16 or latest using NVM 
```
nvm use
```
Next, install the packages
```
npm install
```
## Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Decision Process

### Component Library

I opted to use a component library for faster development and to ensure consistent styling across all components without spending a lot of time creating my own.

I chose [Mantine](https://mantine.dev/) as my component library due to its ease of use and scalability. Compared to Material UI, I found Mantine less verbose and easier to understand.

In some cases where I needed utility classes such as `pt-` and `mt-`, I also used [Tailwind](https://tailwindcss.com/). Compared to other CSS frameworks, I highly prefer Tailwind because of its treeshaking capabilities, which keep the bundle size minimal.

### Layout

Since not everyone knows what a Loan-to-Value calculator is, I added some information about what it is and what the result means. 

For ease of use, I added a slider for users who want to quickly check the value if they have a percentage in mind, rather than the actual value. On the other hand, I also built an input for users who prefer to manually input a value.

### Framework

I chose [Next.js](https://nextjs.org/) because, even though my output is just the calculator, I wanted to make it easy for someone who clones this project to turn it into a website with more than one page. For example, they could integrate a CMS, add another widget, or a full-blown app.

Initially, I wanted to implement [DatoCMS](https://www.datocms.com/) and turn this into a landing page. However, due to time constraints, I focused more on the functionality of the calculator.
