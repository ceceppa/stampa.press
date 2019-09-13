#!/bin/bash
./tests/bin/install-wp-tests.sh stampa.phpunit mysql password 127.0.0.1:3306 latest

phpunit
