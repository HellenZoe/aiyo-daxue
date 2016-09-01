#!/bin/sh

export LOG=/var/log/nodejs
export APP_PATH=/root/app/aiyo-daxue/
export APP=$APP_PATH/bin/www

forever -p $APP_PATH -l $LOG/access.log -e $LOG/error.log -o $LOG/out.log --watchDerictory $APP_PATH -aw start #APP
