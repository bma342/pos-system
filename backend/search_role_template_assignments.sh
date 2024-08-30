#!/bin/bash

# Navigate to the backend directory
cd ~/pos-system/backend

# Use grep to search for the specific text
grep -r -i "RoleTemplateAssignments" \
    --exclude-dir=node_modules \
    --exclude-dir=.* \
    .

# Also search for any 'as' aliases that might be conflicting
grep -r -i "as: ['\"]\?RoleTemplateAssignments" \
    --exclude-dir=node_modules \
    --exclude-dir=.* \
    .

echo "Search completed."
