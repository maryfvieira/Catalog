const fs = require('fs');
const path = require('path');

// restante do código igual
const distPath = path.resolve(__dirname, '..', '..', 'dist');

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

const config = {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 3000,
  createdAt: new Date().toISOString(),
};

const configFilePath = path.join(distPath, 'config.json');
fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf-8');

console.log(`✅ config.json gerado em: ${configFilePath}`);
