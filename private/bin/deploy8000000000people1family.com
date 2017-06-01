#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_REPO_DIR=$(dirname $(dirname $DIR))
SETTINGS_PATH="${ROOT_REPO_DIR}/secrets/settings.8000000000people1family.com.json"
DEPLOY_HOSTNAME="us-east-1.galaxy-deploy.meteor.com"
DEPLOY_TO_URL="http://8000000000people1family.com"
METEOR_DEPLOY_USER="kevinjainit"

read -r -p "Are you sure you want to deploy to production? Type 'YES' to continue. " response
if [ $response == "YES" ]
then
	echo "Proceeding..."
else
	echo "Aborted (Note: You must type YES in all caps to deploy)"
	exit
fi

METEOR_WHO=$(meteor whoami)
if [ "$METEOR_WHO" != "$METEOR_DEPLOY_USER" ]
then
	echo "Please login with user $METEOR_DEPLOY_USER"
	meteor logout
	meteor login
fi

echo "Deploying on $DEPLOY_HOSTNAME to $DEPLOY_TO_URL"
DEPLOY_HOSTNAME=$DEPLOY_HOSTNAME meteor deploy $DEPLOY_TO_URL --settings $SETTINGS_PATH
