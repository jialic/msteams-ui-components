cd msteams-ui-icons/core
npm run build:watch &
cd ../react
npm run build:watch &
cd ../../msteams-ui-styles-core
npm run build:watch &
cd ../msteams-ui-components-react
npm run build:watch &
cd ../gh-pages
npm run dev