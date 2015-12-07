#!/bin/bash

set -e # exit with nonzero exit code if anything fails

# clean and build our app
gulp clean
gulp configure --type=localhost
gulp dist
