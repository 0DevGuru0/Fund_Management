#!/bin/sh

cd apc && \
npm run camunda:seed && \
cd ../devops && \
npm run start:dev:containers -- -d && \
cd ../apc && \
npx wait-on tcp:5438 && npm run db:migrate && \
cd ../devops && \
npm run stop:dev:containers
