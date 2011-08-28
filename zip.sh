#!/bin/bash

#1 = directory
#2 = url
#3 = zipfile

mkdir ${1}
wget --force-html --convert-links --no-directories --page-requisites --base=$2 --directory-prefix=$1 $2;
cd ${1}
mv ./*.html ./index.html
zip ${3} ./*

