#!/bin/bash
# Script Name:  setup.sh
# Beschreibung: Sets up initial configuration

set -e;

echo "Start setup.sh"

# Setting up git config
git config --global user.name "Philipp Sporrer"
git config --global user.email "59526058+sporrphi@users.noreply.github.com"


echo "Setup finished."

exit 0