#!/bin/bash
./tests/bin/install-wp-tests.sh stampa.phpunit nine3 nine3pass 127.0.0.1:3306 latest

phpunit
