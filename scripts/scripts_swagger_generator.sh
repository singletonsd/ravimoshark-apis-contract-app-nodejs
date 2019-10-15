#!/usr/bin/env bash

# Web Page of BASH best practices https://kvz.io/blog/2013/11/21/bash-best-practices/
#Exit when a command fails.
set -o errexit
#Exit when script tries to use undeclared variables.
set -o nounset
#The exit status of the last command that threw a non-zero exit code is returned.
set -o pipefail

#Trace what gets executed. Useful for debugging.
#set -o xtrace

# Set magic variables for current file & dir
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"
__root="$(cd "$(dirname "${__dir}")" && pwd)"

if ! type "java" &> /dev/null; then
  echo "java is not installed. Install it and then re launch"
  exit 1
fi

if ! type "curl" &> /dev/null; then
  echo "curl is not installed. Install it and then re launch"
  exit 1
fi

API_SPEC_WEB="https://ravimosharksas.gitlab.io/apis/contract/documentation/openapi.json"
API_SPEC_LOCAL="../documentation/dist/openapi.yaml"
VERSION="1.0.0"
function usage(){
    echo "1 - anything to work with local spec located at ${API_SPEC_LOCAL}"
}

if [ $# -ge 1 ]; then
  API_SPEC=${API_SPEC_LOCAL}
else
  API_SPEC_WEB=${API_SPEC_WEB}
fi

FOLDER=binaries
if [ ! -d ${FOLDER} ]; then
    mkdir -p ${FOLDER}
fi

SWAGGER_NAME=swagger-codegen-cli.jar
SWAGGER_JAR=${FOLDER}/${SWAGGER_NAME}
SWAGGER_VERSION=3.0.11 # 2.3.1 or 2.4.0
if [ ! -f ${SWAGGER_JAR} ]; then
    FINAL_URL="http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/${SWAGGER_VERSION}/swagger-codegen-cli-${SWAGGER_VERSION}.jar"
    echo "Downloading binary from ${FINAL_URL}"
    curl -L "${FINAL_URL}" -o "${SWAGGER_JAR}"
fi

SWAGGER_COMMAND="java -jar ${SWAGGER_JAR} generate -l nodejs-server"

${SWAGGER_COMMAND} \
    -i ${API_SPEC} \
    -c assets/swaggerconfig.json \
    --model-package=models --artifact-version=${VERSION} \
    --git-repo-id=ravimoshark/api/contract \
    -o src

# TO KNOW ABOUT AVAILABLE CONFIGURATION PROPERTIES
# java -jar ${SWAGGER_JAR} config-help -l nodejs-server
# TO KNOW ABOUT AVAILABLE LANGUAGES
java -jar ${SWAGGER_JAR}