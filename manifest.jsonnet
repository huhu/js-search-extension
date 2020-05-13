local manifest = import 'core/manifest.libsonnet';
local icons() = {
  [size]: 'icon.png'
  for size in ['16', '48', '128']
};

local json = manifest.new(
  name='Js Search Extension',
  version='0.1',
  keyword='js',
  description='The ultimate search extension for Javascript!',
)
             .addIcons(icons())
             .addBackgroundScript([
  'main.js',
]);

json
