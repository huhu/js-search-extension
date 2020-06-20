local manifest = import 'core/manifest.libsonnet';
local icons() = {
  [size]: 'icon.png'
  for size in ['16', '48', '128']
};
local js_files(name, files) = ['%s/%s.js' % [name, file] for file in files];

local json = manifest.new(
  name='Js Search Extension',
  version='0.1',
  keyword='js',
  description='The ultimate search extension for Javascript!',
)
             .addIcons(icons())
             .addBackgroundScripts(js_files('index', ['css','event','html', 'dom', 'index']))
             .addBackgroundScripts(js_files('command', ['css', 'html', 'event', 'index']))
             .addBackgroundScripts(js_files('search', ['dom']))
             .addBackgroundScripts(['main.js',]);

json
