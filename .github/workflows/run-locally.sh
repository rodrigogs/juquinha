#!/bin/bash

if ! command -v act &> /dev/null
then
    echo "You must install act first: https://github.com/nektos/act"
    exit 1
fi

act --secret-file .env.test
