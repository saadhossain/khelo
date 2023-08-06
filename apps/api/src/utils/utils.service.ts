import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { glob } from 'glob';
import { OrmService } from '../orm/orm.service';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs-extra';
import { getStorage } from 'firebase-admin/storage';
@Injectable()
export class UtilsService {
  constructor(private ormService: OrmService) {}

  async uploadGameToFirestore(gameName: string): Promise<any> {
    try {
      const sources = await glob([`public/${gameName}/**/*.*`]);
      let game_url: string;
      let count = 1;
      const sourcesLength = sources.length;
      const fileUrls = {};
      const templateId = `${gameName}-${uuidv4()}`;
      console.log(`Total files: ${sourcesLength}`);
      for (const source of sources) {
        const path = join(process.cwd(), source);
        const dest = source
          .replace(`public\\${gameName}\\`, `${templateId}/`)
          .split('\\')
          .join('/');
        const { bucket, name } = await this.ormService.uploadPublicFile(
          path,
          dest,
        );
        const url = `${process.env.STORAGE}/${bucket}/${name}`;
        if (url.endsWith('index.html')) {
          game_url = url;
        }
        this.ormService.genarateFileUrl(name, url, fileUrls);
        console.log(`Upload pending: ${sourcesLength - count}`);
        count = count + 1;
      }
      await this.ormService.insertDocumentByCustomId(
        'gameAssets',
        gameName,
        fileUrls,
      );
      return { templateId, game_url };
    } catch (error) {
      console.log(error);
    }
  }
  async createGameFromExisting(gameName: string) {
    const id = `${gameName}-${uuidv4()}`;
    const source = join(__dirname, '../../', 'public', gameName);
    const dest = join(__dirname, '../../', 'public', 'template', id);
    await fs.copy(source, dest);
    return { id, game_url: `template/${id}` };
  }

  public async uploadBufferPhotosForGenerateGame(file: any) {
    try {
      const bucket = getStorage().bucket();
      const expiresTime = new Date();
      expiresTime.setHours(expiresTime.getHours() + 1);
      const gcsFilePath = `images/${Date.now()}-${file.originalname}`;
      const blob = bucket.file(gcsFilePath);
      await blob.save(file.buffer);
      const [url] = await blob.getSignedUrl({
        action: 'read',
        expires: expiresTime.toISOString(),
      });
      return url;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadBundlingGameToFirestore(
    localStoreDestinations: string,
    firestoreDestinationId: string,
    assetsId: string,
  ): Promise<any> {
    try {
      const sources = await glob([`public/${localStoreDestinations}/**/*.*`]);
      console.log(sources);
      let game_url: string;
      let count = 1;
      const sourcesLength = sources.length;
      console.log(`Total files: ${sourcesLength}`);
      for (const source of sources) {
        const path = join(process.cwd(), source);
        const dest = source
          .replace(
            `public\\${localStoreDestinations}\\`,
            `cloneGames/${firestoreDestinationId}/`,
          )
          .split('\\')
          .join('/');
        const { bucket, name } = await this.ormService.uploadPublicFile(
          path,
          dest,
        );
        const url = `${process.env.STORAGE}/${bucket}/${name}`;
        if (url.endsWith('index.html')) {
          game_url = url;
        }
        console.log(`Upload pending: ${sourcesLength - count}`);
        count = count + 1;
      }
      const bucket = getStorage().bucket();

      const script = `window.fetchData = async () => {
        console.log(window.location.ancestorOrigins[0]);
        let api;
        api = window.location.ancestorOrigins[0] + "/api/game/assets/";
        const res = await fetch(api + "${assetsId}");
        const data = await res.json();
        return data;
      };`;

      const file = bucket.file(`cloneGames/${firestoreDestinationId}/fetch.js`);
      await bucket.setCorsConfiguration([]);
      await file.save(script, {
        contentType: 'text/js',
        public: true,
      });
      return { firestoreDestinationId, game_url };
    } catch (error) {
      console.log(error);
    }
  }
}
