FROM mcr.microsoft.com/playwright:focal

WORKDIR /tests

COPY package*.json ./
RUN npm install

COPY . .

RUN npx playwright install --with-deps

CMD ["npx", "playwright", "test", "tests/registrationForm.spec.ts"]