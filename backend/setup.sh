#!/bin/sh

# Author: Hui (Henry) Chen

# packages with its version
PYTHON = "python-3.8.8"
MONGODB = "mongodb-org"

YUM_CMD  = $(which yum)
APT_GET_CMD = $(which apt-get)
DNF_CMD = $(which dnf)

# install the packages
if [[ ! -z $YUM_CMD]]; then
    yum install -y $PYTHON $MONGODB
elif [[ ! -z $APT_GET_CMD]]; then
    apt-get install -y $PYTHON $MONGODB
elif [[ ! -z $DNF_CMD]]; then
    dnf instal -y $PYTHON $MONGODB
else
    echo "An error occured while install the packages!";
fi

# enable incoming/ outgoing network connection for localhost mongodb
sudo iptables -A OUTPUT  -p tcp --source-port 27017 -m state --state ESTABLISHED -j ACCEPT


