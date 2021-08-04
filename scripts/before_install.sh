#!/bin/bash

#download node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

#create our working directory if it doesnt exits
DIR="/home/ec2-user/express-app"
if [ -d "$DIR" ]; then
    echo "${DIR} exits"
else
    echo "Creating ${DIR} directory"
    mkdir ${DIR}
fi