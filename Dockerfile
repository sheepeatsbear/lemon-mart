FROM duluca/minimal-node-web-server
WORKDIR /usr/src/app
COPY dist/lemon-mart public
ENTRYPOINT [ "npm", "start" ]
