#!/bin/zsh
# Keep the target org here, to avoid accidentally deploying to a different org.
mkdir -p ./etLogs
sf project deploy start --target-org prSlackDemoBlog --ignore-conflicts --verbose --json > "./etLogs/build.json"
failures=$(jq '.result.details.componentFailures | length' ./etLogs/build.json)
if [ "$failures" -gt 0 ]; then
    jq '.result.details.componentFailures[]' ./etLogs/build.json
    print "\u001b[43m\u001b[1;31m*** *** FAILED *** ***\u001b[0m"
else
    print "\u001b[42m\u001b[1;30m*** *** SUCCESS *** ***\u001b[0m"
fi
date