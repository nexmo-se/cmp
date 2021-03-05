pm2 start "npm run devWeb" --name web
pm2 start "npm run devBlast" --name blast
pm2 start "npm run devPicker" --name picker
pm2 start "npm run devReport" --name report