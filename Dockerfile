FROM mcr.microsoft.com/playwright:focal

WORKDIR /tests

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npx", "playwright", "test", "tests/registrationForm.spec.ts"]