#!/bin/sh

if [ -n "$REACT_APP_API_URL" ]; then
    echo "Setting API URL to: $REACT_APP_API_URL"
    find /usr/share/nginx/html -name "*.js" -exec sed -i "s|REACT_APP_API_URL_PLACEHOLDER|$REACT_APP_API_URL|g" {} \;
fi

# Start nginx
exec nginx -g 'daemon off;'