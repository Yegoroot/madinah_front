npm run build-react
mv build ../front_image/build || move build ../front_image/build
cd ../front_image
git add *
git commit -m "build"
git push
# ssh amir@161.35.29.200
# cd madinah_compose
# docker-compose down
# docker-compose up -d