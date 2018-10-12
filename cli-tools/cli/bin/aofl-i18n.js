#!/usr/bin/env node
const I18NModule = require('../commands/i18n-module');
const program = require('commander');

program
.parse(process.argv);

let i18NModule = new I18NModule();
i18NModule.init();
