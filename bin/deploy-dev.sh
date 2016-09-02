#!/bin/bash

# WEB_PATH='/var/www/dev.lovelucy.info'
# WEB_USER='lovelucydev'
# WEB_USERGROUP='lovelucydev'
#
# echo "Start deployment"
# cd $WEB_PATH
LOG_FILE="/var/log/nodejs/aiyo/blog_deploy.log"
date >> "$LOG_FILE"
echo "Start deployment" >>"$LOG_FILE"
cd ~/app/aiyodaxue
echo "pulling source code..." >> "$LOG_FILE"
git pull
echo "Finished." >>"$LOG_FILE"
