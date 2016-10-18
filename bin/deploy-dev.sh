#!/bin/bash

LOG_FILE="/var/log/nodejs/aiyo/blog_deploy.log"
date >> "$LOG_FILE"
echo "Start deployment" >> "$LOG_FILE"
echo "pulling source code..." >> "$LOG_FILE"
git pull 
echo "Finished." >> "$LOG_FILE"
echo "restart service..."
# pm2 reload all
echo "restart service done"
