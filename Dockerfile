FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV PUBLIC_API_ENDPOINT=http://26.204.37.36:3000
ENV NODE_ENV=development
ENV PUBLIC_SECRET_GUEST_KEY=guest
ENV JWT_SECRET="d26922dd-cd03-5d81-a660-1ec2e885f1e0"
ENV PORT 2222
RUN npm run build
EXPOSE 2222
CMD ["node","build"]