#!/usr/bin/env bash
cd ..
npm i
npm start
cd services/auth
npm i
npm run dev
cd ../events-admin
npm i
npm run dev