import { uploadImageService } from './image';

function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        loader.file.then((file) =>
          uploadImageService(file, 'examify')
            .then((response) => resolve({ default: response.data.url }))
            .catch((error) => reject(error))
        );
      });
    },
  };
}

function uploadPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

export default uploadPlugin;
