// Auto-import all images from the events folder
const imageModules = import.meta.glob('./*.png', { eager: true });

// Create a map of image filenames to their imports
const eventImages = {};

Object.keys(imageModules).forEach(path => {
  const filename = path.replace('./', '');
  eventImages[filename] = imageModules[path].default;
});

export default eventImages;
