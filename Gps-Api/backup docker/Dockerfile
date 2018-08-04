FROM node:8.10.0

LABEL version="1.0"
LABEL description="Registro de rutas GPS - Proyecto 1 Topicos Telematica EAFIT"
LABEL maintainer="Luis Yepes - lyepesa@eafit.edu.co"

ARG PORT=3000
ENV PORT $PORT

WORKDIR /nodeApp
COPY . ./

RUN npm install --test

EXPOSE 3000
CMD npm start
