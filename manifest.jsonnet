local manifest = import 'core/manifest.libsonnet';
local utils = import 'core/utils.libsonnet';

local icons() = {
  [size]: 'logo.png'
  for size in ['16', '48', '128']
};

local json = manifest.new(
  name='Js Search Extension',
  version='0.1',
  keyword='js',
  description='The ultimate search extension for Javascript!',
)
             .addIcons(icons())
             .addBackgroundScripts(utils.js_files('index', ['css', 'event', 'html', 'std']))
             .addBackgroundScripts(utils.js_files('command', ['css', 'html', 'event', 'help']))
             .addBackgroundScripts(utils.js_files('search', ['std']))
             .addBackgroundScripts(['main.js']);

json
