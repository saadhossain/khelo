import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  FieldValue,
  getFirestore
} from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { glob } from 'glob';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { GameAssets } from '../model/generate.dto';


const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const { createCanvas, loadImage } = require('canvas');
const { Storage } = require('@google-cloud/storage');

@Injectable()
export class OrmService {
  constructor(private httpService: HttpService) { }
  public async insertDocument<T>(collectionName: string, doc: T): Promise<T> {
    const createdAt = FieldValue.serverTimestamp();
    try {
      const snapshot = await getFirestore()
        .collection(collectionName)
        .add({ ...doc, createdAt });
      return { id: snapshot.id, ...doc } as T;
    } catch (error) {
      throw new Error(`Failed to insert document: ${error.message}`);
    }
  }
  public async insertDocumentByCustomId<T>(
    collectionName: string,
    id: string,
    doc: T,
  ): Promise<T> {
    try {
      const snapshot = await getFirestore()
        .collection(collectionName)
        .doc(id)
        .set({ ...doc, createdAt: FieldValue.serverTimestamp() });
      return { id, ...doc } as T;
    } catch (error) {
      throw new Error(`Failed to insert document: ${error.message}`);
    }
  }

  public async updateDocumentById<T>(
    collection: string,
    docId: string,
    data: {},
  ): Promise<T> {
    try {
      const docRef = await getFirestore().collection(collection).doc(docId);
      await docRef.update(data);
      const snapshot = await docRef.get();
      const updatedData = snapshot.data();
      if (updatedData.createdAt) {
        updatedData.createdAt = updatedData.createdAt.toDate();
      }
      return updatedData as T;
    } catch (error) {
      throw new Error(`Failed to insert document: ${error.message}`);
    }
  }

  public async uploadPhotos(filename: string) {
    try {
      const metadata = {
        metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
        },
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',
      };
      const bucket = getStorage().bucket();
      const link = await bucket.upload(filename, {
        gzip: true,
        metadata: metadata,
      });
      console.log(`${filename} uploaded.`);
    } catch (error) {
      console.log(error);
    }
  }
  public async findOne<T>(
    collectionName: string,
    fieldName: string,
    fieldValue: string,
  ): Promise<T> {
    try {
      let document = null;
      const snapshot = await getFirestore()
        .collection(collectionName)
        .where(fieldName, '==', fieldValue)
        .get();
      if (!snapshot.empty) {
        snapshot.forEach((doc) => (document = { id: doc.id, ...doc.data() }));
      }
      return document as T;
    } catch (error) {
      throw new Error(`Failed to insert document: ${error.message}`);
    }
  }
  public async findDocumentsByFieldName<T>(
    collectionName: string,
    fieldName: string,
    fieldValue: any,
  ): Promise<T[]> {
    try {
      let documents = [];
      const snapshot = await getFirestore()
        .collection(collectionName)
        .where(fieldName, '==', fieldValue)
        .get();
      if (!snapshot.empty) {
        snapshot.forEach((doc: any) => {
          const data = doc.data();
          if (data.createdAt) {
            data.createdAt = data.createdAt.toDate();
          }
          documents.push({ id: doc.id, ...data });
        });
      }
      return documents;
    } catch (error) {
      throw new Error(`Failed to insert document: ${error.message}`);
    }
  }

  public async uploadPublicFile(
    source: string,
    destination: string,
  ): Promise<any> {
    try {
      const bucket = admin.storage().bucket();
      const [file] = await bucket.upload(source, {
        destination,
        public: true,
      });
      const [metadata] = await file.getMetadata();
      return metadata;
    } catch (error) {
      console.log(error);
    }
  }

  public async findDocumentById<T>(
    collectionName: string,
    id: string,
  ): Promise<T> {
    try {
      const snapshot = await getFirestore()
        .collection(collectionName)
        .doc(id)
        .get();

      if (!snapshot.exists) {
        throw new Error('doc not found');
      }
      const data = snapshot.data();
      if (data.createdAt) {
        data.createdAt = data.createdAt.toDate();
      }

      return { id: snapshot.id, ...data } as T;
    } catch (error) {
      throw new Error(`error: ${error.message}`);
    }
  }
  public async findExistDocumentById(collectionName: string, id: string) {
    try {
      const docRef = getFirestore().collection(collectionName).doc(id);
      const snapshot = await docRef.get();
      return snapshot.exists;
    } catch (error) {
      throw new Error(`error: ${error.message}`);
    }
  }

  async forkGameFromFirestore(
    game_original_name: string,
    game_id: string
  ): Promise<{ gameUrl: string }> {
    try {
      const bucket = getStorage().bucket();
      const fileList = await bucket.getFiles({ prefix: game_original_name });
      const files = fileList[0];
      if (files.length <= 0) {
        throw new Error('Game not exist');
      }
      // const game_id = uuidv4();
      let gameUrl: string;
      for (const file of files) {
        const destination = file.name.replace(`${game_original_name}`, game_id);
        const destinationPath = bucket.file(destination);
        const context = await file.copy(destinationPath);
        const publicUrl = await destinationPath.makePublic();
        console.log(context[0].name);
        if (publicUrl[0].object.endsWith('index.html')) {
          gameUrl = `${process.env.STORAGE}/${bucket.name}/${publicUrl[0].object}`;
          console.log(gameUrl);
        }
      }
      console.log('fork completed on Firestore');
      return { gameUrl };
    } catch (error) {
      throw new Error(error.massage);
    }
  }

  async getGameAssetsFromApi(image_url: string): Promise<GameAssets> {
    try {
      const { data } = await this.httpService
        .post(`${process.env.IMG_PROCESS_API}`, { image_url })
        .toPromise();
      console.log('response API', data);
      return data.game_data_assets;
    } catch (error) {
      console.log(error.massage);
      throw new Error(error.massage);
    }
  }

  createDocumentRef(ref: string) {
    const docRef = getFirestore().doc(ref);
    return docRef;
  }
  async countCollectionDocuments(ref: string) {
    const snapshot = await getFirestore().collection(ref).count().get();
    return snapshot.data().count;
  }

  async deleteDocumentsByFieldName(
    collection: string,
    fieldName: string,
    fieldValue: any,
  ) {
    const likesSnapshot = await getFirestore()
      .collection(collection)
      .where(fieldName, '==', fieldValue)
      .get();

    const docs = [];

    for (const doc of likesSnapshot.docs) {
      docs.push(doc.data());
      await doc.ref.delete();
    }
    return docs;
  }
  async getDocumentsFromSubCollection<T>(
    collection: string,
    queryField: string,
    ref: any,
    startAt?: string,
    limit?: number,
  ): Promise<T> {
    const page = startAt ? startAt : '0';
    const size = limit ? limit : 10;

    const likesRef = await getFirestore()
      .collectionGroup(collection)
      .orderBy('createdAt', 'desc')
      .where(queryField, '==', ref)
      .startAt(page)
      .limit(size)
      .get();

    const documents = [];

    likesRef.forEach((doc) => {
      const data = doc.data();

      if (data.createdAt) {
        data.createdAt = data.createdAt.toDate();
      }
      documents.push({ id: doc.id, ...data });
    });
    return documents as T;
  }

  async isDocumentsExist(collection: string, field: string, value: any) {
    const snapshot = await getFirestore()
      .collection(collection)
      .where(field, '==', value)
      .get();
    const docs = [];
    snapshot.forEach((doc) => {
      docs.push(doc.data());
    });
    const isExist = docs.length > 0;
    return isExist;
  }

  async getDocuments(docRef: any, startAt?: string, limit?: number) {
    const size = limit || 20;
    const fromStart = startAt || '0';
    const snapshot = await getFirestore()
      .collection(docRef)
      .orderBy('createdAt', 'desc')
      .startAt(fromStart)
      .limit(size)
      .get();
    const docs = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.createdAt) {
        data.createdAt = data.createdAt.toDate();
      }
      docs.push(data);
    });
    return docs;
  }

  public async getDocumentsByFieldNameWithDesc<T>(
    ref: string,
    field: string,
    value: string,
    startAt?: string,
    limit?: number,
  ): Promise<T[]> {
    try {
      const size = limit || 20;
      const fromStart = startAt || '0';
      let documents = [];
      const snapshot = await getFirestore()
        .collection(ref)
        .where(field, '==', value)
        .orderBy('createdAt', 'desc')
        .startAt(fromStart)
        .limit(size)
        .get();
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.createdAt) {
          data.createdAt = data.createdAt.toDate();
        }
        documents.push({ id: doc.id, ...data });
      });
      return documents;
    } catch (error) {
      throw new Error(`Failed to insert document: ${error.message}`);
    }
  }
  //Genarate Urls for uploaded files
  async genarateFileUrl(
    name: string,
    url: string,
    fileUrls: { [key: string]: string },
  ) {
    const fileName = name.substring(name.lastIndexOf('/') + 1);
    const fileKey = fileName.split(/[-.]/g).join('_');
    fileUrls[fileKey] = url;
  }
  //Upload AI genarated images to firestore
  async uploadGenaratedImgToFirestore(folderName: string, game_id: string): Promise<any> {
    try {
      const sources = await glob([`public/${folderName}/**/*.*`]);
      const fileUrls = {};
      for (const source of sources) {
        const path = join(process.cwd(), source);
        const dest = source.replace(`public\\${folderName}\\`, `genaratedImg/${game_id}/`)
        const { bucket, name } = await this.uploadPublicFile(path, dest);
        const url = `${process.env.STORAGE}/${bucket}/${name}`;
        this.genarateFileUrl(name, url, fileUrls);
      }
      await this.insertDocumentByCustomId(
        'gameAssets',
        game_id,
        fileUrls,
      );
      return fileUrls;
    } catch (error) {
      console.log(error);
    }
  }

  async generate_image(image_url: string, game_title: string, game_id: string): Promise<GameAssets> {
    try {
      const filename = 'baseImage.PNG';

      // this code fetches an image from the provided URL and stores the response as an ArrayBuffer in the response variable.
      const response = await axios.get(image_url, {
        responseType: 'arraybuffer',
      });

      // this code saves the binary data obtained from the Axios response into a file with the specified 'filename' 
      fs.writeFileSync(filename, Buffer.from(response.data, 'binary'));

      // This code Creates a new canvas of size 512x512 pixels.
      const canvas = createCanvas(512, 512);
      // This code gets the 2D rendering context of the canvas. The '2d' context is used for drawing 2D graphics.
      const context = canvas.getContext('2d');
      // This code loads an image file from the specified filename
      const image = await loadImage(filename);
      // This code draws the loaded image onto the canvas. The drawImage method is used to render images on the canvas, and in this case, it draws the image starting from the coordinates (0, 0) with a width and height of 512 pixels each.
      context.drawImage(image, 0, 0, 512, 512);

      // this code takes the canvas with the drawn image, creates a writable stream to save the data to a PNG file, 
      // and then pipes the PNG stream to the file stream, resulting in the image being saved to the file specified by filename as a PNG image.
      const outfile = filename;
      const outstream = fs.createWriteStream(outfile);
      const stream = canvas.createPNGStream();
      stream.pipe(outstream);


      // This code is returning a Promise that wraps the process of writing the image to a file. The Promise will resolve to a GameAssets object upon successful completion of the writing process, 
      // or reject with an error if any issues occur during the process.
      return new Promise<GameAssets>((resolve, reject) => {
        outstream.on('finish', async () => {
          try {
            const engine_id = process.env.ENGINE_ID;
            const api_host = process.env.API_HOST || 'https://api.stability.ai';
            const api_key = process.env.API_KEY;

            if (!api_key) {
              throw new Error('Missing Stability API key.');
            }

            const generateImage = async (textPrompt, outputFilename) => {
              const formData = new FormData();
              formData.append('init_image', fs.createReadStream(outfile));
              formData.append('image_strength', '0.30');
              formData.append('init_image_mode', 'IMAGE_STRENGTH');
              formData.append('text_prompts[0][text]', textPrompt);
              formData.append('cfg_scale', '7');
              formData.append('clip_guidance_preset', 'FAST_BLUE');
              formData.append('samples', '1');
              formData.append('steps', '30');

              const response = await axios.post(`${api_host}/v1/generation/${engine_id}/image-to-image`, formData, {
                headers: {
                  'Authorization': `Bearer ${api_key}`,
                  'Accept': 'image/png',
                  ...formData.getHeaders(),
                },
                responseType: 'arraybuffer',
              });

              if (response.status !== 200) {
                throw new Error(`Non-200 response: ${response.data}`);
              }

              // this code takes the binary data obtained from the Axios response and writes it to a PNG file on the local filesystem
              const responseData = response.data;
              // let pngBuffer = null;
              if (responseData && responseData.length) {
                fs.writeFileSync(`./public/genaratedImg/${outputFilename}.png`, Buffer.from(responseData, 'binary'));
                // pngBuffer = Buffer.from(responseData, 'binary');
              } else {
                console.error('Invalid response data or image data is missing');
                console.log(responseData); // Log the response data for debugging
                throw new Error('Invalid response data or image data is missing');
              }
            };

            await generateImage('A fantasy wallyball, trending bedroom', 'ball');
            await generateImage('A fantasy brick, trending on mountain', 'brick');
            await generateImage('A fantasy concrete, trending on hot desert', 'concrete');
            console.log('Images Genarated...')
            //upload files to the firestore
            const data = await this.uploadGenaratedImgToFirestore('genaratedImg', game_id)
            //Delete genarated Images after successfully uploaded to the firestore
            const folderPath = './public/genaratedImg/';
            fs.readdir(folderPath, (err, files) => {
              if (err) {
                console.error('Error reading folder:', err);
                return;
              }
              files.forEach((file) => {
                const filePath = folderPath + file;

                fs.unlink(filePath, (err) => {
                  if (err) {
                    console.error('Error deleting file:', err);
                  }
                });
              });
            });

            const gameDataAssets = {
              game_name: 'astray',
              game_assets: [
                {
                  image_name: 'ball.png',
                  image_file: data.ball_png,
                },
                {
                  image_name: 'concrete.png',
                  image_file: data.concrete_png,
                },
                {
                  image_name: 'brick.png',
                  image_file: data.brick_png,
                },
              ],
            };
            resolve(gameDataAssets); // Resolve the Promise with the result
          }
          catch (error) {
            console.error(error);
            reject(error); // Reject the Promise if there's an error
          }
        });

        outstream.on('error', (error) => {
          console.error('Error writing to output steam', error);
          reject(error); // Reject the Promise if there's an error
        });
      });
    }
    catch (error) {
      console.error(error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }
}