#!/bin/bash

sh ./vendor/bin/doctrine-module orm:schema-tool:drop --force

sh ./vendor/bin/doctrine-module orm:schema-tool:create

sh ./vendor/bin/doctrine-module orm:generate-proxies