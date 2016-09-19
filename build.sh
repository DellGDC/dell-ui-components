#!/bin/bash

# Step 0, make sure you have the correct environment setup
DEV_DIRECTORY=C:/git/_duc
DEV_DIRECTORY_DIST=C:/git/_duc/dist
PAK_DIRECTORY=C:/git/_duc-package

# Main directory
if [ ! -d "$DEV_DIRECTORY" ]; then
  mkdir "$DEV_DIRECTORY
  git clone http://dmvmsherpa.oldev.preol.dell.com:7990/scm/duc/dell-ui-components.git "$DEV_DIRECTORY"
  git checkout -t origin/development -b development
fi

# Package Directory
if [ ! -d "$PAK_DIRECTORY" ]; then
  mkdir "$PAK_DIRECTORY
  git clone http://dmvmsherpa.oldev.preol.dell.com:7990/scm/duc/dell-ui-components.git "$PAK_DIRECTORY"
  git checkout -t origin/package -b package
fi

# make sure we're starting in the right spot :-)
cd $DEV_DIRECTORY

# Step 1

echo ""
echo    "***************************************************"
read -p "*** What version would you like to build today:" VERSION
echo    "***************************************************"
echo ""
# NOTE: $VERSION can be used from now on later in the code

echo ""
echo "***************************************************************"
echo "*** Lets make sure we have the latest development branch... ***"
echo "***************************************************************"
echo ""

# Step 2

# move to the development branch and get the latest
git checkout development
git pull origin development

echo ""
echo "****************************************************************"
echo "*** Let's check out the latest changes. Launching browser... ***"
echo "****************************************************************"
echo ""

#spawn off a new bash script to run grunt serve so we don't lock this one down
start bash grunt_serve.sh

#start the webserver looking on http://localhost:9002
start "" http://localhost:9002

#get the users input and wait for a "Good" or a "Bad" response
echo ""
echo    "**************************************************"
read -p "*** Does the site look alright to you? (y/n):" RESP
echo    "**************************************************"
echo ""

if [ "$RESP" = "y" ]; then
  echo ""
else
  echo ""
  echo "************************"
  echo "*** Stopping Program ***"
  echo "************************"
  echo ""
  exit
fi

# Step 3

echo ""
echo "**************************************************************************"
echo "*** Lets go over to staging and and merge development and check again. ***"
echo "**************************************************************************"
echo ""

git checkout staging
git pull origin staging
git merge development
#start bash grunt_serve.sh, the server should still be up and running from step 2, no need to spawn it again, it'll just die anyway
start "" http://localhost:9002

echo ""
echo    "**************************************************"
read -p "*** Does the site look alright to you? (y/n):" RESP
echo    "**************************************************"
echo ""

if [ "$RESP" = "y" ]; then
  echo ""
else
  echo ""
  echo "************************"
  echo "*** Stopping Program ***"
  echo "************************"
  echo ""
  exit
fi

# Step 4

echo ""
echo "******************************************************************************************************************"
echo "*** Please update: package.json, README.md, and bower.json with version numbers and release notes accordingly. ***"
echo "******************************************************************************************************************"
echo ""

# Starting up the Shield Generators
start wordpad package.json
start wordpad README.md
start wordpad bower.json

echo    ""
echo    "**********************************************************"
read -p "*** Close wordpad on each file. Continue? (y/n):" RESP
echo    "**********************************************************"
echo    ""

if [ "$RESP" = "y" ]; then
   echo ""
else
   echo ""
   echo "************************"
   echo "*** Stopping program ***"
   echo "************************"
   echo ""
   exit
fi

echo ""
echo "***************************************************"
echo "*** Great. Saving changes to the staging branch ***"
echo "***************************************************"
echo ""

git add -A && git commit -m "Added release notes for version $VERSION"
git push origin staging

echo ""
echo "**************************************"
echo "*** Running the build. Stand by... ***"
echo "**************************************"
echo ""

# Step 5

grunt build

echo ""
echo "********************************"
echo "*** Launching the browser... ***"
echo "********************************"
echo ""

# Step 6

#start bash grunt_serve.sh, the server should still be up and running from step 2, no need to spawn it again, it'll just die anyway
start "" http://localhost:9002

echo ""
echo "****************************************************************************************************************"
echo "*** Another Bash window is opening! Please authenticate there to start the SFTP process to ui.shearpaux.com. ***"
echo "****************************************************************************************************************"
echo ""

# Step 7

start bash sftp_build.sh

echo    ""
echo    "******************************************"
read -p "*** Is that process finished?  (y/n):" RESP
echo    "******************************************"
echo    ""

if [ "$RESP" = "y" ]; then
   echo ""
else
   echo ""
   echo "************************"
   echo "*** Stopping program ***"
   echo "************************"
   echo ""
   exit
fi

# Step 8

echo ""
echo "**************************************************"
echo "*** Great. Let's make a save point on staging. ***"
echo "**************************************************"
echo ""

git add -A && git commit -m "Added release notes for version $VERSION"
git push origin staging

# Step 9

echo ""
echo "*******************************************************************"
echo "*** Merge the final build with development and do a final check ***"
echo "*******************************************************************"
echo ""

git checkout development
git pull development
git merge staging
start "" http://localhost:9002

echo    ""
echo    "**********************************************************************************************************"
read -p "*** Final preview before things get interesting. Does the site look ok still with your changes? (y/n):" RESP
echo    "**********************************************************************************************************"
echo    ""

if [ "$RESP" = "y" ]; then
   echo ""
else
   echo ""
   echo "************************"
   echo "*** Stopping program ***"
   echo "************************"
   echo ""
   exit
fi

# Step 10

echo ""
echo "****************************"
echo "*** Merging to master... ***"
echo "****************************"
echo ""
exit
git checkout master
git pull origin master
git merge -X theirs staging
git push origin master

# Step 11

echo ""
echo "*****************************"
echo "*** Update Package Branch ***"
echo "*****************************"
echo ""

mv $DEV_DIRECTORY_DIST $PAK_DIRECTORY

# Step 12

echo ""
echo "******************************************"
echo "*** Save changes to the package branch ***"
echo "******************************************"
echo ""

cd $PAK_DIRECTORY
git pull origin package
git add -A && git commit -m "Package version $VERSION"
git push origin package
git tag $VERION
git push origin $VERSION

# Step 13 You may need to be off of the Dell Corporate Firewall at this point to continue or have a proxy installed on your .npmrc file wherever you have npm installed

echo ""
echo "****************************************************************************************************************************"
echo "*!! You either need to be off of the Dell Firewall, on VPN, or have the proxy added in your .npmrc file. URL in comments !!*"
echo "****************************************************************************************************************************"
echo ""

# Step 14

echo    ""
echo    "***************************************"
read -p "*** Ready to push to Github? (y/n):" RESP
echo    "***************************************"
echo    ""

if [ "$RESP" = "y" ]; then
   echo ""
else
   echo ""
   echo "************************"
   echo "*** Stopping program ***"
   echo "************************"
   echo ""
   exit
fi

git push github $VERSION

# Step 15

echo ""
echo "**********************************************************"
echo "*** According to bower you are now dispensing version: ***"
echo "**********************************************************"
echo ""

bower info dell-ui-components

# Step 16

echo ""
echo "***********************************************"
echo "*!! You may return to the Dell Firewall now !!*"
echo "***********************************************"
echo ""

# Step 17

echo    ""
echo    "*****************************"
read -p "*** Ready to close (y/n):" RESP
echo    "*****************************"
echo    ""

if [ "$RESP" = "y" ]; then
   start "" https://github.com/DellGDC/dell-ui-components/tree/$VERSION
else
   echo ""
   echo "************************"
   echo "*** Stopping program ***"
   echo "************************"
   echo ""
fi

exit
